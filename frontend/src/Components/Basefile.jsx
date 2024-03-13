import React from "react";
import styled from "styled-components";
import Menu from "./menu.jsx";
import Footer from "./footer.jsx";

const FLEXCONTAINER = styled.section`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Basefile = ({ children }) => {
    return (
        <FLEXCONTAINER>
            <Menu />
            {children}
            <Footer />
        </FLEXCONTAINER>
    );
};

export default Basefile;
