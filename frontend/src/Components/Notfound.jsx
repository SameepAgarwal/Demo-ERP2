import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const NOTFOUNDDIV = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
`;

const Notfound = () => {
    const defined_routes = ["/signin", "/login", "/admin", "/addclass", "/print"];
    const location = useLocation();
    const navigate = useNavigate();
    defined_routes.forEach((route) => {
        if (route == location) {
            navigate(route);
        }
    });
    if (location.pathname.includes("/section")) {
        navigate("/admin");
    }
    return <NOTFOUNDDIV>Notfound</NOTFOUNDDIV>;

};

export default Notfound;
