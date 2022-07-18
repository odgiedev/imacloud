import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../middlewares/auth";

export function Navbar() {
    const [token, setToken, authenticated, setAuthenticated, username, setUsername, userId, setUserId] = useContext(AuthContext);
    
    return (
        <div className="bg-emerald-700 py-3 px-6 flex items-center justify-between">
            <Link to="/">
                <img src="http://localhost:8080/images/logo.png" width={40} alt="logo" />
            </Link>
            <div>
                {
                    authenticated
                    ?
                    <>
                        <div className="flex items-center">
                            <Link to="/" className="text-emerald-100 hover:text-white mr-3">Upload</Link>
                            <Link to="/profile" className="text-emerald-100 hover:text-white mr-3">
                                <div className="flex p-1 border rounded bg-emerald-800">
                                    <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#d3ffe6" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="96" r="64" fill="none" stroke="#d3ffe6" strokeMiterlimit="10" strokeWidth="16"></circle><path d="M31,216a112,112,0,0,1,194,0" fill="none" stroke="#d3ffe6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
                                    {username}
                                </div>
                            </Link>
                        </div>
                    </>
                    :
                    <>
                        <Link to="/login" className="text-emerald-100 hover:text-white mr-3">Login</Link>
                        <Link to="/register" className="text-emerald-100 hover:text-white mr-3">Register</Link>
                    </>
                }
            </div>
        </div>
    )
}