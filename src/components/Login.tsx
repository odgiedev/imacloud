import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../lib/axios";
import { AuthContext } from "../middlewares/auth";

export function Login() {
    const [email, setEmail] = useState<null|string>(null);
    const [password, setPassword] = useState<null|string>(null);
    
    const [token, setToken, authenticated, setAuthenticated, username, setUsername, userId, setUserId, errorMsg, setErrorMsg, successMsg, setSuccessMsg] = useContext(AuthContext);
    
    const navigate = useNavigate();
    
    async function handleSubmit(e: any) {
        e.preventDefault();

        await Axios.post('/user/login', {
            email,
            password,
        }).then(r => {
            navigate("/profile");
            const token = r.data.data.token;
            
            localStorage.setItem("token",token);
            localStorage.setItem("authenticated","true");
            localStorage.setItem("username",r.data.data.username);
            localStorage.setItem("userId",r.data.data.user_id);
            
            setToken(() => localStorage.getItem("token"));
            setAuthenticated(() => localStorage.getItem("authenticated"));
            setUsername(() => localStorage.getItem("username"));
            setUserId(() => localStorage.getItem("userId"));
            
            Axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
            
            setSuccessMsg(() => `Welcome ${localStorage.getItem("username")} !`);

        }).catch(err => setErrorMsg(err.response.data.error));
    }

    return (
        <div className="h-screen flex items-center">
            <form onSubmit={handleSubmit} className="my-4 p-3 mx-auto rounded-xl border bg-emerald-500 w-1/3">
                <h1 className="my-3 text-slate-100 font-bold text-3xl">Login</h1>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" className="p-2 rounded-md my-1 w-full"/> <br />
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" className="p-2 rounded-md my-1 w-full"/> <br />
                <div className="flex justify-end">
                    <Link to="/register" className="text-emerald-100 hover:text-white">Sign up</Link>
                </div>
                <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-600 border my-2 p-2 rounded-lg text-slate-100 font-bold">Login</button>
            </form>
        </div>
    )
}
