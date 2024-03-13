import React, { useEffect, useState } from "react";
import { BACKEND_LINK } from "../Importants";
// import { NavLink, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import Section from '../Components/Section';
// import classesData from "../../../demo_classes_data";
// import { useGlobalData } from "../Reducers/dashboardReducer";


// var delay_in_menu_open = '800';
//var delay_in_menu_open_in_time = delay_in_menu_open + 'ms';

// const BACKEND_LINK = 'http://localhost:8000';

const footer = () => {
    return (
        <footer style={{ justifyItems: 'flex-end', textAlign: 'center', padding: '0.3rem' }}>
            Copyright &copy; All rights reserved | General ERP 2024
        </footer>
    );
};

export default footer;
