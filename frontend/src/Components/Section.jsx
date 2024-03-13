import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useClassData } from "../Reducers/classProvider";
import { useUserData } from "../Reducers/userProvider";
import { BACKEND_LINK } from "../Importants";

// const BACKEND_LINK = 'http://localhost:8000';

const Section = () => {

    const { state, dispatch } = useClassData();
    const { class_id, section_id } = useParams();
    const [dataFetched, setDataFetched] = useState(false);
    const [editClicked, setEditClicked] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { user_state, user_dispatch } = useUserData();

    // console.log(`Section id in Section Page is: ${section_id}`);
    // console.log(`Class id in Section Page is: ${class_id}`);
    const defaultNewStudent = {
        student_name: "",
        student_gender: "",
        student_rollno: "",
        student_dob: "",
        student_address: "",
        student_marks: []
    };
    const [newStudent, setNewStudent] = useState(defaultNewStudent);
    var index = 1;

    const [requiredClass, setRequiredClass] = useState({});
    const [requiredSection, setRequiredSection] = useState({});

    if (Object.keys(requiredClass).length > 0) {
        var { class_name, section_wise_division, sections, class_strength, class_teacher, subjects, students } = requiredClass;
    }

    if (Object.keys(requiredSection).length > 0) {
        var { section_name, section_teacher, section_strength, students, section_subjects } = requiredSection;
    }


    // const classFetch = async (class_id) => {
    //     const response = await fetch(`${BACKEND_LINK}/getclass/${class_id}`);
    //     const ourClass = await response.json();
    //     console.log({ "Data Got: ": ourClass[0] }); 
    //     console.log(Object.keys(ourClass[0]).length);
    //     dispatch({ type: 'SELECTEDCLASSDATA', payload: ourClass[0] });
    //     setRequiredClass(ourClass[0]);
    //     setDataFetched(true);
    // };

    const sectionFetch = async (class_id, section_id) => {
        const response = await fetch(`${BACKEND_LINK}/getclass/${class_id}`);
        const ourClass = await response.json();
        // console.log({ "Data Got: ": ourClass[0] });
        setRequiredClass(ourClass[0]);
        setRequiredSection(() => {
            return (ourClass[0].sections.find(s => s._id == section_id));
        });
        setDataFetched(true);
    };

    const newStudentInputChange = (event) => {
        const { name, value } = event.target;

        setNewStudent((oldDetails) => {
            return ({ ...oldDetails, [name]: value });
        });
    };
    const newStudentMarksInputChange = (event, index) => {
        const { name, value } = event.target;
        setNewStudent((oldDetails) => {
            const student_marks_object = oldDetails.student_marks;
            student_marks_object[index][name] = value;
            return { ...oldDetails, student_marks: student_marks_object };
        });
    };
    const addStudent = async (e) => {
        if (section_id == undefined) {
            try {
                const response = await fetch(`${BACKEND_LINK}/addstudent/${class_id}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newStudent)
                });
                const student_details = await response.json();
                console.log(student_details);
                setRequiredClass((oldClass) => {
                    oldClass.students.push(student_details);
                    oldClass.class_strength = oldClass.students.length;
                    return oldClass;
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await fetch(`${BACKEND_LINK}/addstudent/${class_id}/${section_id}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newStudent)
                });
                const student_details = await response.json();
                console.log(student_details);
                setRequiredSection((oldSection) => {
                    oldSection.students.push(student_details);
                    oldSection.section_strength = oldSection.students.length;
                    return oldSection;
                });
            } catch (error) {
                console.log(error);
            }
        }
        const element = document.querySelector('.popup_box');
        element.style.opacity = 0;
        element.style['z-index'] = -1;
        setNewStudent(defaultNewStudent);
    };

    const editDetails = async () => {
        try {
            const response = await fetch(`${BACKEND_LINK}/editstudent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    section_wise_division,
                    class_id,
                    section_id,
                    student_id: newStudent._id,
                    student_details: newStudent
                })
            });
            const student_details_update = await response.json();
            console.log(student_details_update);

            if (section_wise_division) {
                setRequiredSection((oldDetails) => {
                    var index = 0;
                    var temp = 0;
                    oldDetails.students.find((student) => {
                        if (student._id != newStudent._id) {
                            temp++;
                        }
                        else {
                            index = temp;
                        }
                    });
                    oldDetails.students[index] = newStudent;
                    console.log({ index: index });
                    console.log({ oldDetails: oldDetails });
                    return oldDetails;
                });
            }
            else {
                setRequiredClass((oldDetails) => {
                    var class_index = 0;
                    var class_temp = 0;
                    oldDetails.students.find((student) => {
                        if (student._id != newStudent._id) {
                            class_temp++;
                        }
                        else class_index = class_temp;
                    });
                    oldDetails.students[class_index] = newStudent;
                    console.log({ class_index: class_index });
                    console.log({ oldDetails: oldDetails });
                    return oldDetails;
                });
            }
        } catch (error) {
            console.log(error);
        }
        setEditClicked(false);
        const element = document.querySelector('.popup_box');
        element.style.opacity = 0;
        element.style['z-index'] = -1;
        setNewStudent(defaultNewStudent);
    };

    useEffect(() => {
        if (!user_state.isAuthenticated) {
            console.log({ location: location.pathname, state: user_state });
            navigate('/login');
        }
        if (section_id == undefined) {
            //means ye class dekh rahe hai/
            dispatch({ type: "CLASSFETCH", payload: { class_id, setRequiredClass, setDataFetched } });
            console.log({ stateis: state });
            // classFetch(class_id);
        }
        else {
            // hum class k kisi section ko dekh rahe hai/
            dispatch({ type: "SECTIONFETCH", payload: { class_id, section_id } });
            sectionFetch(class_id, section_id);
        }
    }, [user_state.isAuthenticated, user_state.user]);

    return (
        <div style={{ height: "100%", backgroundColor: "white", color: "black" }}>
            {Object.keys(requiredClass).length > 0 ?
                <div>
                    {section_wise_division ?
                        <div>
                            <label>Class Name:</label>
                            <p>{class_name} </p>

                            <label>Section Name:</label>
                            <p>{section_name} </p>

                            <label>Section Teacher:</label>
                            <p>{section_teacher} </p>

                            <label>Section Strength:</label>
                            <p>{requiredSection.section_strength} </p>
                        </div> :
                        <div>
                            <label>Class Name:</label>
                            <p>{class_name} </p>

                            <label>Class Teacher:</label>
                            <p>{class_teacher} </p>

                            <label>Class Strength:</label>
                            <p>{class_strength} </p>
                        </div>
                    }
                    <button onClick={() => {
                        const element = document.querySelector('.popup_box');
                        element.style.opacity = 1;
                        element.style['z-index'] = 10;
                    }}>Add a Student</button>
                    <button onClick={() => {
                        window.print();
                    }}>Print All Details</button>

                    <TABLE>
                        {/* Heading Is written by this section */}
                        {
                            students != undefined && students.length > 0 ?
                                <thead>
                                    <th>Student Name</th>
                                    <th>Roll No</th>
                                    <th>Gender</th>
                                    <th>DOB</th>
                                    <th>Address</th>
                                    {
                                        section_wise_division ?
                                            section_subjects.map((subject, index) => {
                                                return <th key={index}>{subject.subject_name} ({subject.subject_code})</th>;
                                            }) :
                                            subjects.map((subject, index) => {
                                                return <th key={index}>{subject.subject_name} ({subject.subject_code})</th>;
                                            })
                                    }
                                    <th style={{ position: "", right: "0" }} className="on_hover_heading_show">
                                        Options
                                    </th>
                                </thead>
                                : null
                        }
                        {/* All Details Are written by this section */}
                        {
                            students != undefined && students.length > 0 && students.map((student, index) => {
                                return <TABLE_ROW key={index} style={{ position: "relative" }} onMouseEnter={
                                    () => {
                                        const element = document.querySelectorAll('.on_hover_show');
                                        element[index].style.display = "block";

                                        const element_heading = document.querySelector('.on_hover_heading_show');
                                        element_heading.style.display = 'block';
                                    }
                                }
                                    onMouseLeave={
                                        () => {
                                            const element = document.querySelectorAll('.on_hover_show');
                                            element[index].style.display = "none";

                                            const element_heading = document.querySelector('.on_hover_heading_show');
                                            element_heading.style.display = 'none';
                                        }
                                    }
                                >
                                    <td>{student.student_name}</td>
                                    <td>{student.student_rollno}</td>
                                    <td>{student.student_gender}</td>
                                    <td>{student.student_dob}</td>
                                    <td>{student.student_address}</td>
                                    {
                                        student.student_marks.map((subject, index) => {
                                            return <td key={index} className="student_marks">
                                                {subject.subject_obtained_mark == null ? "-" : subject.subject_obtained_mark}/{subject.subject_total_mark == null ? "-" : subject.subject_total_mark}
                                            </td>;
                                        })
                                    }
                                    <HOVER_BOX style={{ position: "", right: "0" }} className="on_hover_show">
                                        <button onClick={() => {
                                            const element = document.querySelector('.popup_box');
                                            element.style.opacity = 1;
                                            element.style['z-index'] = 10;
                                            setNewStudent(JSON.parse(JSON.stringify(student)));
                                            setEditClicked(true);
                                        }}>Edit</button>
                                        <button onClick={() => {
                                            navigate('/print', { state: student });
                                        }}>Print</button>
                                    </HOVER_BOX>
                                </TABLE_ROW>;
                            })
                        }

                    </TABLE>
                </div> : <i className="fa-solid fa-loading"></i>
            }
            {
                dataFetched ?
                    <POPUPBOX className="popup_box">
                        <div className="style_div">
                            <div>
                                <label>Name</label>
                                <input type="text" placeholder="Enter Student Name" name="student_name" value={newStudent.student_name} onChange={newStudentInputChange} />

                                <label>Roll Number</label>
                                <input type="Number" placeholder="Enter Student Roll Number" name="student_rollno" value={newStudent.student_rollno} onChange={newStudentInputChange} />

                                <label>Gender</label>
                                <select name="student_gender" onChange={newStudentInputChange} value={newStudent.student_gender}>
                                    <option hidden>Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Others</option>
                                </select>
                                {/* <input type="text" placeholder="Enter Student Gender" name="student_gender" value={newStudent.student_gender} onChange={newStudentInputChange} /> */}

                                <label>Date of Birth</label>
                                <input type="text" placeholder="Enter Student Date of Birth" name="student_dob" value={newStudent.student_dob} onChange={newStudentInputChange} />

                                <label>Address</label>
                                <input type="text" placeholder="Enter Student Address" name="student_address" value={newStudent.student_address} onChange={newStudentInputChange} />

                                {
                                    editClicked ?
                                        <div>
                                            {
                                                (section_subjects != undefined || subjects != undefined || (section_subjects.length > 0 || subjects.length > 0)) ?
                                                    <table>
                                                        Student Marks:
                                                        {
                                                            section_wise_division ?
                                                                section_subjects.map((subject, index) => {
                                                                    return (<tr key={index}>
                                                                        <td>
                                                                            {subject.subject_name}
                                                                        </td>
                                                                        <td>
                                                                            ({subject.subject_code})
                                                                        </td>
                                                                        <td>
                                                                            <input type="text" name="subject_obtained_mark" value={`${newStudent.student_marks.at(index).subject_obtained_mark}`} onChange={(event) => {
                                                                                newStudentMarksInputChange(event, index);
                                                                            }} />
                                                                        </td>
                                                                        <td>
                                                                            /
                                                                        </td>
                                                                        <td>
                                                                            <input type="text" name="subject_total_mark" value={`${newStudent.student_marks.at(index).subject_total_mark}`} onChange={(event) => {
                                                                                newStudentMarksInputChange(event, index);
                                                                            }} />
                                                                        </td>
                                                                    </tr>);
                                                                }) :
                                                                subjects.map((subject, index) => {
                                                                    return (<tr key={index}>
                                                                        <td>
                                                                            {subject.subject_name}
                                                                        </td>
                                                                        <td>
                                                                            ({subject.subject_code})
                                                                        </td>
                                                                        <td>
                                                                            <input type="text" name="subject_obtained_mark" value={`${newStudent.student_marks.at(index).subject_obtained_mark}`} onChange={(event) => {
                                                                                newStudentMarksInputChange(event, index);
                                                                            }} />
                                                                        </td>
                                                                        <td>
                                                                            /
                                                                        </td>
                                                                        <td>
                                                                            <input type="text" name="subject_total_mark" value={`${newStudent.student_marks.at(index).subject_total_mark}`} onChange={(event) => {
                                                                                newStudentMarksInputChange(event, index);
                                                                            }} />
                                                                        </td>
                                                                    </tr>);
                                                                })
                                                        }
                                                    </table> : null
                                            }
                                        </div>
                                        : null
                                }

                                <button onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.querySelector('.popup_box');
                                    element.style.opacity = 0;
                                    element.style['z-index'] = -1;
                                    setNewStudent(defaultNewStudent);
                                    setEditClicked(false);
                                }}>Cancel</button>
                                <button onClick={() => {
                                    if (!editClicked) {
                                        // We have to add a student..
                                        addStudent();
                                        setEditClicked(false);
                                        setNewStudent(defaultNewStudent);
                                    }
                                    else {
                                        // then we have to override the details..
                                        editDetails();

                                    }
                                }
                                }>Save</button>
                            </div>
                        </div>
                    </POPUPBOX>
                    : null
            }
        </div>
    );
};

const POPUPBOX = styled.div`
    height: 100vh;
    width: 100vw;
    position: absolute;
    background-color: rgb(41 40 40 / 75%);
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;

    .style_div{
        border: 2px solid black;
        border-radius: 10px;
        padding: 2rem;
        background-color: #989898;
    }
`;

const HOVER_BOX = styled.div`
    display: none;
`;

const TABLE = styled.table`
    border: 2px solid black;
    border-collapse: collapse;
    /* -webkit-margin-collapse: collapse; */
    td{
        padding: 0.4rem;
        color: white;
    }
    th{
        padding: 0.4rem;
        background-color: #523434;
        color: white;
    }
    .student_marks{
        text-align: center;
    }
    .on_hover_heading_show{
        display: none;
    }
`;

const TABLE_ROW = styled.tr`
    background-color: #000;
    padding: 1rem;

    &:hover{
        background-color: #717070;
    }
`;
export default Section;

