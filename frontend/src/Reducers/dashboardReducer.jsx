import React, { useReducer, useContext } from "react";
import { BACKEND_LINK } from "../Importants";
import { useUserData } from "./userProvider";

// var data = null;
// const { user_state, usedispatch } = useUserData();
// if (user_state.isAuthenticated) {
//     const result = await fetch(`${BACKEND_LINK}/allclasses`, () => {
//         method = 'GET';
//     });
//     data = await result.json();
// }
const initialState = undefined;

const dashboardReducer = (state, action) => {

    if (action.type === "CLASSESDATA") {
        return action.payload;
    }

    return state;
};

const DasboardContext = React.createContext();

export const DashboardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dashboardReducer, initialState);
    console.log({ state: state });

    return <DasboardContext.Provider value={{ state, dispatch }}>
        {children}
    </DasboardContext.Provider>;
};

export const useGlobalData = () => {
    return useContext(DasboardContext);
};