import React, { useContext, useReducer } from "react";
import { BACKEND_LINK } from "../Importants";


const initialState = undefined;

const classReducer = (state, action) => {

    if (action.type === "SELECTEDCLASSDATA") {
        return action.payload;
    }
    if (action.type === "CLASSFETCH") {
        const { class_id, setRequiredClass, setDataFetched } = action.payload;

        const classFetch = async (class_id) => {
            const response = await fetch(`${BACKEND_LINK}/getclass/${class_id}`);
            const ourClass = await response.json();
            // console.log({ "Data Got: ": ourClass[0] });
            // console.log(Object.keys(ourClass[0]).length);
            // dispatch({ type: 'SELECTEDCLASSDATA', payload: ourClass[0] });
            // setRequiredClass(ourClass[0]);
            // setDataFetched(true);
            console.log("GONE IN CLASS REDUCER");
            setRequiredClass(ourClass[0]);
            setDataFetched(true);
            return ourClass[0];
        };
        return classFetch(class_id);
    }

    return state;
};

const ClassContext = React.createContext();

export const ClassProvider = ({ children }) => {
    const [state, dispatch] = useReducer(classReducer, initialState);
    console.log({ state: state });

    return <ClassContext.Provider value={{ state, dispatch }}>
        {children}
    </ClassContext.Provider>;
};

export const useClassData = () => {
    return useContext(ClassContext);
};