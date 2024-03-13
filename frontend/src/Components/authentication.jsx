import { BACKEND_LINK } from "../Importants";
// const navigate = useNavigate();
// export const authenticate_user = async () => {
//     try {
//         const result = await fetch(`${BACKEND_LINK}/getlogin`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include'
//         });

//         const user = await result.json();

//         if (user.message == "User Not Authenticated") {
//             // navigate('/');
//             alert("User Not Authorized or user Not Login");
//         }
//         if (user.message == "User Authentication Successful") {
//             return;
//         }
//     } catch (error) {
//         console.log(error);
//         // navigate('/');
//     }
// };

export const authenticate_user = async () => {
    try {
        const result = await fetch(`${BACKEND_LINK}/getlogin`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });

        const user = await result.json();

        if (user.message == "User Not Authenticated" || user.message == "Unauthorized! OR No Token Generated") {
            return user;
            // navigate('/');
            // alert("User Not Authorized or user Not Login");
        }
        if (user.message == "User Authentication Successful") {
            return user;
        }
    } catch (error) {
        console.log(error);
        return { error: error };
    }
};