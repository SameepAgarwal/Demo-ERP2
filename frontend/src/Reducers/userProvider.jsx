import React, { useReducer, useContext } from "react";
const initialState = {
    isAuthenticated: false,
    user: null,
};



const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            {
                console.log('COME');
                return {
                    ...state,
                    isAuthenticated: true,
                    user: action.payload
                };
            }
    }
};

const UserContext = React.createContext();

// export const authenticate_user = async () => {
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
//             return "User Not Authenticated";
//             // navigate('/');
//             // alert("User Not Authorized or user Not Login");
//         }
//         if (user.message == "User Authentication Successful") {
//             dispatch({ type: 'LOGIN', payload: user.user });
//             return;
//         }
//     } catch (error) {
//         console.log(error);
//         return { error: error };
//     }
// };


export const UserProvider = ({ children }) => {
    const [user_state, user_dispatch] = useReducer(userReducer, initialState);
    console.log({ state: user_state });

    return (<UserContext.Provider value={{ user_state, user_dispatch }}>
        {children}
    </UserContext.Provider>
    );
};

export const useUserData = () => {
    return useContext(UserContext);
};