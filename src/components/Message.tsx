import { useContext } from "react";
import { AuthContext } from "../middlewares/auth";

export function Message() {
    const [token, setToken, authenticated, setAuthenticated, username, setUsername, userId, setUserId, errorMsg, setErrorMsg, successMsg, setSuccessMsg] = useContext(AuthContext);
    
    setTimeout(() => {
        setErrorMsg(null);
        setSuccessMsg(null);
    }, 6000);

    return (
        <>
            {
                errorMsg &&
                <div className="bg-red-600 flex justify-center text-white text-lg py-1">
                    <span>{errorMsg}</span>
                </div>
            }

            {
                successMsg &&
                <div className="bg-green-600 flex justify-center text-white text-lg py-1">
                    <span>{successMsg}</span>
                </div>
            }
        </>
    )
}