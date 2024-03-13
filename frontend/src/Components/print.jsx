import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const DIV = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    margin: 0;
`;
const MAINDIV = styled.div`
    height: 100vh;
    /* height: 1045px; */
    padding: 10px;
    width: 210mm;
    background-color: white;
    /* border: 2px solid red; */
    display: flex;
    color: black;
    /* margin: auto; */
`;

const print = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const student = location.state;


    // useEffect(() => {
    //     window.print();
    //     navigate(-1);
    // });
    return (
        <DIV>
            <MAINDIV>
                <table>
                    <tr>
                        <td>Name:</td>
                        <td>{student.student_name}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Roll Number:</td>
                        <td>{student.student_rollno}</td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td>{student.student_gender}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>{student.student_address}</td>
                    </tr>
                    <tr>
                        <td>Date Of Birth:</td>
                        <td>{student.student_rollno}</td>
                    </tr>
                    <tr>
                        <table>
                            <tr>
                                <th>Subject</th>
                                {/* <th>Code</th> */}
                                <th>Obtained Marks</th>
                                <th>Total Marks</th>
                                <th>Total</th>
                            </tr>
                            {
                                student.student_marks.map((subject, index) => {
                                    return (
                                        <tr>
                                            <td>{subject.subject_name}</td>
                                            {/* <td>{subject.subject_code}</td> */}
                                            <td>{subject.subject_obtained_mark}</td>
                                            <td>{subject.subject_total_mark}</td>
                                        </tr>
                                    );
                                })
                            }
                        </table>
                    </tr>
                </table>
            </MAINDIV>
        </DIV>
    );
};

export default print;
