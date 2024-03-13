import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Section from '../Components/Section';
import { useGlobalData } from "../Reducers/dashboardReducer";
import { authenticate_user } from "./authentication";
import { useUserData } from "../Reducers/userProvider";
import menu from "./menu";
import { BACKEND_LINK } from "../Importants";


var delay_in_menu_open = '800';
var delay_in_menu_open_in_time = delay_in_menu_open + 'ms';

// const BACKEND_LINK = 'http://localhost:8000';


// import Menu from "./menu.jsx";
// import Footer from "./footer.jsx";
// const FLEXCONTAINER = styled.section`
//     display: flex;
//     flex-direction: column;
//     height: 100vh;
// `;

const DASHBOARD = styled.div`
    background-color: #fff;
    height: 100%;
    color: #000;
`;

const CLASSSHOW = styled.div`
    /* background-color: #2c2c2c;
    color: #fff;
    padding: .1px 0rem .1px 2rem;
    margin: 0.4rem 0.5rem; */
    .section_div{
        visibility: hidden;
        height: 0;
    }
`;

const CLASSHEADING = styled.h4`
    background-color: #2c2c2c;
    color: #fff;
    padding: 8px 0rem 8px 2rem;
    margin: 0.4rem 0.5rem;
    cursor: pointer;
`;

const SECTIONHEADING = styled.h5`
    background-color: #2c2c2c;
    color: #fff;
    padding: 4px 0rem 4px 2rem;
    margin: 0.4rem 0.5rem 0.4rem 1.5rem;
    cursor: pointer;
`;

const dashboard = () => {

    const { state, dispatch } = useGlobalData();
    const { user_state, user_dispatch } = useUserData();

    const navigate = useNavigate();
    const location = useLocation();
    const [isSectionShowing, setIsSectionShowing] = useState(false);

    // const universityName = "Madan Mohan Malaviya University of Technology";
    // const universityLogo = "http://mmmut.ac.in/images/largelogo.jpg";


    // console.log("program running... ");
    // const openMenu = (event) => {
    //     var element = event.target;
    //     // console.log("openMenu runns");
    //     element.style.visibility = 'hidden';

    //     var menu = document.querySelector('.whole_menu');
    //     // menu.style.visibility = 'visible';
    //     menu.style.transform = 'translateX(0)';
    //     menu.style.opacity = 1;
    // };

    const closeMenu = (event) => {
        var element = document.querySelector('.menu_bar');
        // console.log("closeMenu runns");
        setTimeout(() => {
            element.style.visibility = 'visible';
        }, delay_in_menu_open / 2);

        var menu = document.querySelector('.whole_menu');
        // menu.style.visibility = 'visible';
        menu.style.transform = 'translateX(min(-50% , -300px))';
        menu.style.opacity = 0;
    };

    const ShowSections = (index) => {
        var element = document.querySelector('.classes_container').children[index];
        var selectedClass = element.querySelector('.section_div');

        //check if section is already showing or not
        // selectedClass.style.transition = 'height 2s linear, visibility 2s linear';
        selectedClass.style.visibility = 'visible';
        selectedClass.style.height = 'unset';
        setIsSectionShowing(true);
    };
    const HideSections = (index) => {
        var element = document.querySelector('.classes_container').children[index];
        var selectedClass = element.querySelector('.section_div');

        //check if section is already showing or not
        // if (selectedClass.style.height == 0) { return; }
        // selectedClass.style.transition = 'unset';
        selectedClass.style.visibility = 'hidden';
        selectedClass.style.height = 0;
        setIsSectionShowing(false);
    };
    // const authenticate_user = async () => {
    //     try {
    //         const result = await fetch(`${BACKEND_LINK}/getlogin`, {
    //             method: 'GET',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: "include",
    //         });

    //         const user = await result.json();

    //         if (user.message == "User Not Authenticated" || user.message == "Unauthorized! OR No Token Generated") {
    //             navigate('/');
    //             alert("User Not Authorized or user Not Login");
    //         }
    //         if (user.message == "User Authentication Successful") {
    //             return 1;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         navigate('/');
    //     }
    // };

    useEffect(() => {
        async function getData() {
            const result = await fetch(`${BACKEND_LINK}/allclasses/${user_state.user._id}`);
            const data = await result.json();
            console.log(data);
            dispatch({ type: 'CLASSESDATA', payload: data });
        };
        // const check_user = async () => {
        //     const result = await authenticate_user();
        //     if (result == "User Authentication Successful") {
        //         console.log("Successful");
        //         if (location != "/admin") {
        //             navigate('/admin');
        //         }
        //     }
        //     else if (result == "User Not Authenticated") {
        //         navigate('/');
        //     }
        //     else {
        //         console.log(result);
        //         nagivate('/');
        //     }
        // };
        // check_user();
        if (!user_state.isAuthenticated) {
            console.log(user_state);
            navigate('/login');
        }
        else {
            getData();
        }
    }, [user_state.isAuthenticated, user_state.user]);
    return (
        <DASHBOARD className="main_dashboard classes_container" onDoubleClick={() => {
            closeMenu();
            // menu.closeMenu();
        }}>
            {
                state != undefined && state.length > 0 ? state.map((currentClass, index) => {
                    return (
                        <CLASSSHOW key={index} onClick={(event) => {
                            // showClass(index);
                            if (currentClass.section_wise_division) {
                                // console.log('Section Wise division');
                            }
                            else {
                                console.log('not section wise devision');
                            }
                        }}>
                            <CLASSHEADING onClick={() => {
                                if (currentClass.section_wise_division) {
                                    if (!isSectionShowing) {
                                        ShowSections(index);
                                    } else {
                                        HideSections(index);
                                    }
                                }
                                else {
                                    // console.log(`_id of this Class is: ${currentClass._id}`);
                                    navigate(`/section/${currentClass._id}`);
                                }
                                // var element = document.querySelector('.classes_container').children[index];
                                // var selectedClass = element.querySelector('.section_div');
                            }}>{currentClass.class_name}
                                {
                                    currentClass.section_wise_division ?
                                        <span>
                                            &nbsp; (Including <span style={{ color: '#28809b' }}>{currentClass.sections.length}</span> {currentClass.sections.length > 1 ? "Sections" : "Section"})
                                        </span> : null
                                }
                            </CLASSHEADING>
                            {
                                currentClass.section_wise_division ?
                                    <div className="section_div">
                                        {
                                            currentClass.sections.map((currentSection, index) => {
                                                return <SECTIONHEADING className="current_section" key={index} onClick={() => {
                                                    navigate(`/section/${currentClass._id}/${currentSection._id}`);
                                                    // console.log(`_id of this Section is: ${currentSection._id}`);
                                                }}>{currentSection.section_name}</SECTIONHEADING>;
                                            })
                                        }
                                    </div> : null
                            }
                        </CLASSSHOW>
                    );
                }) : null
            }
        </DASHBOARD>
    );
    //     {/* <Footer /> */}
    // {/* </FLEXCONTAINER> */}
};

export default dashboard;
