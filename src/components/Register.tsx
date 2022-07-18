import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { Axios } from "../lib/axios"
import { AuthContext } from "../middlewares/auth";

export function Register() {
    const [usernameLocal, setUsernameLocal] = useState<null|string>(null);
    const [emailLocal, setEmailLocal] = useState<null|string>(null);
    const [passwordLocal, setPasswordLocal] = useState<null|string>(null);
    const [passwordCLocal, setPasswordCLocal] = useState<null|string>(null);
    
    const [token, setToken, authenticated, setAuthenticated, username, setUsername, userId, setUserId, errorMsg, setErrorMsg, successMsg, setSuccessMsg] = useContext(AuthContext);
    
    function handleSubmit(e: any) {
        e.preventDefault();

        Axios.post('/user/create', {
            username:usernameLocal,
            email:emailLocal,
            password:passwordLocal,
            confirmPassword: passwordCLocal,
        }).then(r => setSuccessMsg(r.data.data)).catch(err => setErrorMsg(err.response.data.error));
    }

    return (
        <div className="h-screen flex items-center">
            <form onSubmit={handleSubmit} className="my-4 p-3 mx-auto rounded-xl border bg-emerald-500 w-1/3">
                <h1 className="my-3 text-slate-100 font-bold text-3xl">Register</h1>
                <input onChange={(e) => setUsernameLocal(e.target.value)} type="text" placeholder="Username" name="username" className="p-2 rounded-md my-1 w-full"/> <br />
                <input onChange={(e) => setEmailLocal(e.target.value)} type="email" placeholder="Email" name="email" className="p-2 rounded-md my-1 w-full"/> <br />
                <input onChange={(e) => setPasswordLocal(e.target.value)} type="password" placeholder="Password" name="password" className="p-2 rounded-md my-1 w-full"/> <br />
                <input onChange={(e) => setPasswordCLocal(e.target.value)} type="password" placeholder="Repeat password" name="confirmPassword" className="p-2 rounded-md my-1 w-full"/>
                <div className="flex justify-end">
                    <Link to="/login" className="text-emerald-100 hover:text-white">Login</Link>
                </div>
                <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-600 border my-2 p-2 rounded-lg text-slate-200 font-bold">Join</button>
            </form>       
        </div>
    )
}