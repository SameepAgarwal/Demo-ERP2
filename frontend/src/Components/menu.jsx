import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Section from '../Components/Section';
import { useGlobalData } from "../Reducers/dashboardReducer";
import { BACKEND_LINK, DEFAULT_LOGO_IMG_LINK } from "../Importants";
import { useUserData } from "../Reducers/userProvider";


var delay_in_menu_open = '800';
var delay_in_menu_open_in_time = delay_in_menu_open + 'ms';

// const BACKEND_LINK = 'http://localhost:8000';

const DIV = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 2rem ;
    width: 100vw;
    z-index: 9;
    /* border: 1px solid antiquewhite; */
    img{
        justify-items: end;
        border-radius: 50%;
    }
`;


const MENU = styled.div`
    /* display: flex;
    flex-direction: row; */
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    /* width: 100vw; */
    width: min(50% , 250px);
    background-color: #fff;
    color: #000;
    border-right: 2px solid black;
    transform: translateX(min(-50%, -300px));
    opacity: 0;
    transition: transform ${delay_in_menu_open_in_time} linear, opacity ${delay_in_menu_open_in_time} linear;
    z-index: 10;
`;



const LISTITEM = styled.li`
    color: #fff;
    background-color: #000;
    width: 100%;
    padding: 0.4rem 0rem;
    text-align: center;
    margin: 0.4rem 0rem ;
`;

const IMAGE_DIV = styled.div`
    height: 100%;
    position: relative;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;

    .logo_more_options_div{
        display: none;
        position: absolute;
        right: 0;
        top: 100%;
        background-color: #242424;
        border: 1px solid white;
        width: 10.27rem;

        ul{
            list-style: none;
            width: 100%;
            /* position: relative;
            right: 20px; */
            padding: 0;
            list-style-position: inside;
            li{
                font-size: 1rem;
                padding: 2px 10px;
                cursor: pointer;
                &:hover{
                    background-color: #2e2e2e;
                }
            }
        }
    }
`;


const menu = () => {

    // const { state, dispatch } = useGlobalData();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreOptionOpen, setIsMoreOptionOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // const universityName = "Madan Mohan Malaviya University of Technology";
    // const universityLogo = "http://mmmut.ac.in/images/largelogo.jpg";
    const { user_state, user_dispatch } = useUserData();
    // const [isSectionShowing, setIsSectionShowing] = useState(false);

    const openMenu = (event) => {
        var element = event.target;
        console.log("openMenu runns");
        element.style.visibility = 'hidden';

        var menu = document.querySelector('.whole_menu');
        // menu.style.visibility = 'visible';
        menu.style.transform = 'translateX(0)';
        menu.style.opacity = 1;
        setIsMenuOpen(true);
        // var background_effect = document.querySelector('.openmenu_background_blur');
        // background_effect.style["z-index"] = 2;
    };

    const closeMenu = (event) => {
        var element = document.querySelector('.menu_bar');
        console.log("closeMenu runns");
        setTimeout(() => {
            element.style.visibility = 'visible';
        }, delay_in_menu_open / 2);

        var menu = document.querySelector('.whole_menu');
        // menu.style.visibility = 'visible';
        menu.style.transform = 'translateX(min(-50% , -300px))';
        menu.style.opacity = 0;
        setIsMenuOpen(false);
        // var background_effect = document.querySelector('.openmenu_background_blur');
        // background_effect.style["z-index"] = -1;
    };

    const openMoreOptions = () => {
        var options_div = document.querySelector('.logo_more_options_div');
        options_div.style.display = 'none';
        setIsMoreOptionOpen(false);
    };

    const closeMoreOptions = () => {
        var options_div = document.querySelector('.logo_more_options_div');
        options_div.style.display = 'block';
        setIsMoreOptionOpen(true);
    };

    const logoutUser = async () => {
        const result = await fetch(`${BACKEND_LINK}/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const user_logout = await result.json();

        if (user_logout.message == "logout successful") {
            navigate('/');
            alert("Logout Successfully");
        }
        else {
            alert("Logout Unsuccessful");
        }
    };
    return (
        <DIV>
            <i className="fa-solid fa-bars menu_bar" style={{ cursor: 'pointer' }} onClick={(event) => openMenu(event)}></i>
            <MENU className="whole_menu">

                <i className="fa-solid fa-bars" style={{ margin: '1.6rem 1.8rem', color: '#000', cursor: 'pointer' }} onClick={(event) => { closeMenu(event); }}></i>

                <ul style={{ listStyle: 'none', padding: '0px' }}>
                    {
                        location.pathname != '/admin' ?
                            <LISTITEM><NavLink to='/admin' style={{ color: 'white' }} onClick={() => {
                                closeMenu();
                            }}>Dashboard</NavLink></LISTITEM>
                            : null
                    }

                    {
                        location.pathname != '/addclass' ?
                            <LISTITEM><NavLink to='/addclass' style={{ color: 'white' }} onClick={() => {
                                closeMenu();
                            }}>Add a Class</NavLink></LISTITEM>
                            : null
                    }


                </ul>

            </MENU>
            {
                user_state.isAuthenticated && user_state.user.school_name ?
                    <h3 onClick={() => {
                        console.log({ Cookies: document.cookie });
                    }}>{user_state.user.school_name}</h3> : null
            }
            {
                user_state.isAuthenticated && user_state.user.school_logo_url ?
                    <IMAGE_DIV onClick={() => {
                        if (isMoreOptionOpen) {
                            openMoreOptions();
                        }
                        else {
                            closeMoreOptions();
                        }
                    }}>
                        <img src={user_state.user.school_logo_url} alt="university logo" height={"40px"} width={"40px"} />
                        <div className="logo_more_options_div">
                            <ul>
                                <li>Profile</li>
                                <li>Change Password</li>
                                <li onClick={logoutUser}>Logout</li>
                            </ul>
                        </div>
                    </IMAGE_DIV>
                    :
                    <img src={DEFAULT_LOGO_IMG_LINK} alt="logo" height={"40px"} width={"40px"} />
            }
            {
                isMenuOpen ?
                    <div style={{ position: "absolute", top: "68px", left: "0", backgroundColor: "rgb(57 57 56 / 20%)", height: "100vh-68px", width: "100vw" }}>
                    </div>
                    : null
            }
        </DIV>

    );
};


export default menu;

// const FLEXCONTAINER = styled.section`
//     display: flex;
//     flex-direction: column;
//     height: 100vh;
// `;
// const DASHBOARD = styled.div`
//     background-color: #fff;
//     height: 100%;
//     color: #000;
// `;

// const CLASSSHOW = styled.div`
//     /* background-color: #2c2c2c;
//     color: #fff;
//     padding: .1px 0rem .1px 2rem;
//     margin: 0.4rem 0.5rem; */
//     .section_div{
//         visibility: hidden;
//         height: 0;
//     }
// `;

// const CLASSHEADING = styled.h4`
//     background-color: #2c2c2c;
//     color: #fff;
//     padding: 8px 0rem 8px 2rem;
//     margin: 0.4rem 0.5rem;
// `;

// const SECTIONHEADING = styled.h5`
//     background-color: #2c2c2c;
//     color: #fff;
//     padding: 4px 0rem 4px 2rem;
//     margin: 0.4rem 0.5rem 0.4rem 1.5rem;
// `;

// const ShowSections = (index) => {
//     console.log('SHOW SECTION ');

//     var element = document.querySelector('.classes_container').children[index];
//     var selectedClass = element.querySelector('.section_div');

//     //check if section is already showing or not
//     // console.log(`${selectedClass.style.visibility}`);
//     // selectedClass.style.transition = 'height 2s linear, visibility 2s linear';
//     selectedClass.style.visibility = 'visible';
//     selectedClass.style.height = 'unset';
//     setIsSectionShowing(true);
//     // console.log(selectedClass);
// };
// const HideSections = (index) => {
//     console.log('HIDE SECTION');

//     var element = document.querySelector('.classes_container').children[index];
//     var selectedClass = element.querySelector('.section_div');

//     //check if section is already showing or not
//     console.log(selectedClass.style.visibility);
//     // if (selectedClass.style.height == 0) { return; }
//     // selectedClass.style.transition = 'unset';
//     selectedClass.style.visibility = 'hidden';
//     selectedClass.style.height = 0;
//     setIsSectionShowing(false);
//     // console.log(selectedClass.style.visibility);
//     // console.log(`${selectedClass.style.height}`);
//     // console.log(selectedClass);
// };

// useEffect(() => {
//     async function getData() {
//         const result = await fetch(`${BACKEND_LINK}/allclasses`, () => {
//             method = 'GET';
//         });
//         const data = await result.json();
//         console.log(data);
//         dispatch({ type: 'CLASSESDATA', payload: data });
//         setClassesArray(data);
//     };
//     getData();
// }, []);