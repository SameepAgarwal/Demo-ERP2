import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserData } from "../Reducers/userProvider";
import { BACKEND_LINK } from "../Importants";

// const BACKEND_LINK = 'http://localhost:8000';

const AddClass = () => {

    const navigate = useNavigate();
    const { user_state, user_dispatch } = useUserData();
    const defaultTempSubject = {
        subject_name: "",
        subject_code: ""
    };
    const defaultCreatingSection = {
        section_name: "",
        section_teacher: "",
        section_subjects: []
    };
    const defaultClassDetails = {
        class_name: "",
        class_teacher: "",
        section_wise_division: false,
        sections: [],
        subjects: [],
    };


    const [sectionWiseDivisionOn, setSectionWiseDivisionOn] = useState(false);

    const [temp_subjects, setTempSubjects] = useState([]);
    const [temp_subject, setTempSubject] = useState(defaultTempSubject);


    const [showAddSection, setShowAddSection] = useState(false);
    const [showAddSubject, setShowAddSubject] = useState(false);

    const [creatingSection, setCreatingSection] = useState(defaultCreatingSection);
    const [classDetails, setClassDetails] = useState(defaultClassDetails);


    const inputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setClassDetails((oldDetails) => {
            return ({ ...oldDetails, [name]: value });
        });
    };

    const sectionSubjectInputChange = (event) => {
        const { name, value } = event.target;
        setTempSubject((oldTempSubject) => {
            return ({ ...oldTempSubject, [name]: value });
        });
    };

    const creatingSectionInputChange = (event) => {
        const { name, value } = event.target;

        setCreatingSection((oldCreatingSection) => {
            return ({ ...oldCreatingSection, [name]: value });
        });
    };

    const sectionWiseDivisionDecision = (event) => {
        var decisionIs = event.target.checked;
        if (decisionIs) {
            setSectionWiseDivisionOn(true);
            setClassDetails((oldDetails) => {
                return ({ ...oldDetails, class_teacher: "", section_wise_division: true });
            });
            console.log("Section Wise Division On");
        }
        else {
            setSectionWiseDivisionOn(false);
            setClassDetails((oldDetails) => {
                return ({ ...oldDetails, section_wise_division: false });
            });
            console.log("Section Wise Division Off");
        }
        setTempSubject(defaultTempSubject);
        setTempSubjects([]);
    };

    const addThisSection = () => {

        const { section_name, section_teacher, section_subjects } = creatingSection;
        setCreatingSection((oldDetails) => {
            // const { section_subjects } = oldDetails;
            oldDetails.section_subjects.push(...temp_subjects);
            return ({ ...oldDetails });
        });
        if (section_name == '' || section_teacher == '' || section_subjects.length == 0) {
            alert("Please Fill Mandatory Details");
            return;
        }

        setClassDetails((oldClassDetails) => {
            oldClassDetails.sections.push(creatingSection);
            return ({ ...oldClassDetails });
        });

        setCreatingSection(defaultCreatingSection);

        setShowAddSection(false);
        console.log(classDetails);
        setTempSubjects([]);
    };

    const addThisSectionSubject = () => {

        if (temp_subject.subject_name == "" || temp_subject.subject_code == "") {
            alert("Please Fill Subject Details Carefully");
            return;
        }
        setTempSubjects((oldTempSubjects) => {
            return ([...oldTempSubjects, temp_subject]);
        });

        setTempSubject(defaultTempSubject);

        setShowAddSubject(false);
    };


    const createThisClass = async () => {
        const { class_name, class_teacher, sections, subjects } = classDetails;
        if (class_name == "") {
            alert("Please Fill Class Name");
            return;
        }
        if (sectionWiseDivisionOn) {
            if (sections.length == 0) {
                alert("Please Fill Details Carefully");
                return;
            }
        }
        else {
            if (class_teacher == "") {
                alert("Please Fill Teacher's Name");
                return;
            }

            if (temp_subjects.length == 0) {
                alert("Please Fill Subject Details Carefully");
                return;
            }
            //we also have to add subjects in this case
            setClassDetails((oldClassDetails) => {
                oldClassDetails.subjects.push(...temp_subjects);
                return oldClassDetails;
            });
        }
        console.log(classDetails);
        try {
            const response = await fetch(`${BACKEND_LINK}/createclass`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...classDetails, user: user_state.user._id })
            });
            const addToDB = await response.json();
            console.log(addToDB);
        } catch (error) {
            console.log(error);
            alert("An Error Occured");
            return;
        }
        setClassDetails(defaultClassDetails);
        setTempSubjects([]);
        navigate('/admin');
    };

    useEffect(() => {
        if (!user_state.isAuthenticated) {
            console.log({ location: location.pathname, state: user_state });
            navigate('/login');
        }
    }, [user_state.isAuthenticated, user_state.user]);

    return (
        <div style={{ border: '2px solid white', width: '100vw', height: "100%" }}>
            <label>Class Name</label>
            <input type="text" name='class_name' required placeholder="Class 1" value={classDetails.class_name} onChange={inputChange} />

            <label>Section Wise Division</label>
            <input type="checkbox" name="sectionWiseDivision" id="sectionWiseDivision" onChange={sectionWiseDivisionDecision} />

            {
                sectionWiseDivisionOn ?
                    <div>
                        <button onClick={() => {
                            setShowAddSection(true);
                        }}> Add a Section </button>

                        {
                            showAddSection ?
                                <div>
                                    <label>Section Name</label>
                                    <input type="text" name="section_name" id="section_name" placeholder="Section A" value={creatingSection.section_name} onChange={creatingSectionInputChange} />

                                    {/* <label>Section Strength</label>
                                    <input type="number" name="section_stregth" id="section_stregth" placeholder="40 Students" /> */}

                                    <label>Section Teacher</label>
                                    <input type="text" name="section_teacher" id="section_teacher" placeholder="Sir/Madam" value={creatingSection.section_teacher} onChange={creatingSectionInputChange} />

                                    <button onClick={() => {
                                        setShowAddSubject(true);
                                    }}>Add Subject</button>

                                    {
                                        showAddSubject ?
                                            <div>
                                                <label>Subject Code</label>
                                                <input type="text" name="subject_code" id="subject_code" placeholder="ABC-01" value={temp_subject.subject_code} onChange={sectionSubjectInputChange} />

                                                <label>Subject Name</label>
                                                <input type="text" name="subject_name" id="subject_name" placeholder="Subject Name" value={temp_subject.subject_name} onChange={sectionSubjectInputChange} />

                                                <button onClick={() => {
                                                    setTempSubject(defaultTempSubject);
                                                    setShowAddSubject(false);
                                                }}>cancel</button>
                                                <input type="submit" name="adding_subject" id="adding_subject" onClick={addThisSectionSubject} />
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        temp_subjects.length > 0 ?
                                            <div>
                                                <h5>Subjects Added: </h5>
                                                {
                                                    temp_subjects.map((currentSubject, index) => {
                                                        return <div>{currentSubject.subject_name} ({currentSubject.subject_code})</div>;
                                                    })
                                                }
                                            </div>
                                            : null
                                    }
                                    <button onClick={() => {
                                        setCreatingSection(defaultCreatingSection);
                                        setShowAddSection(false);
                                        setTempSubjects([]);
                                    }}>Cancel</button>
                                    <button type="submit" name="adding_section" id="adding_section" onClick={addThisSection} >
                                        Add Section
                                    </button>

                                </div>
                                :
                                null
                        }
                        {
                            classDetails.sections.length > 0 ? classDetails.sections.map((currentSection, index) => {
                                return (<div key={index} style={{ display: 'flex', gap: '2rem' }}>
                                    <h5>{currentSection.section_name}</h5>
                                    <p>{currentSection.section_teacher}</p>
                                    <div>
                                        {
                                            currentSection.section_subjects.map((subject, index) => {
                                                return (<p key={index}>{subject.subject_name} ({subject.subject_code})</p>);
                                            })
                                        }
                                    </div>
                                </div>);
                            }) : null
                        }

                    </div>
                    :
                    <div>
                        {/* <label>Class Strength</label>
                        <input type="number" name="class_stregth" id="class_stregth" placeholder="40 Students" /> */}

                        <label>Class Teacher</label>
                        <input type="text" name="class_teacher" id="class_teacher" placeholder="Sir/Madam" value={classDetails.class_teacher} onChange={inputChange} />

                        <button onClick={() => {
                            setShowAddSubject(true);
                        }}>Add Subject</button>

                        {
                            showAddSubject ?
                                <div>
                                    <label>Subject Code</label>
                                    <input type="text" name="subject_code" id="subject_code" placeholder="ABC-01" value={temp_subject.subject_code} onChange={sectionSubjectInputChange} />

                                    <label>Subject Name</label>
                                    <input type="text" name="subject_name" id="subject_name" placeholder="Subject Name" value={temp_subject.subject_name} onChange={sectionSubjectInputChange} />

                                    <button onClick={() => {
                                        setTempSubject(defaultTempSubject);
                                        setShowAddSubject(false);
                                    }}>cancel</button>
                                    <input type="submit" name="adding_subject" id="adding_subject" onClick={addThisSectionSubject} />
                                </div>
                                :
                                null
                        }
                        {
                            temp_subjects.length > 0 ?
                                <div>
                                    <h5>Subjects Added: </h5>
                                    {
                                        temp_subjects.map((currentSubject, index) => {
                                            return <div>{currentSubject.subject_name} ({currentSubject.subject_code})</div>;
                                        })
                                    }
                                </div>
                                : null
                        }
                    </div>
            }
            <input type="submit" name="submit_class_details" value="submit_class_details" onClick={createThisClass} />
        </div>
    );
};

export default AddClass;
