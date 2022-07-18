import { useContext, useEffect, useState } from "react";
import { Axios } from "../lib/axios";
import { AuthContext } from "../middlewares/auth";

export function Send() {
    const [file, setFile] = useState<any>("");
    const [token, setToken, authenticated, setAuthenticated, username, setUsername, userId, setUserId, errorMsg, setErrorMsg, successMsg, setSuccessMsg] = useContext(AuthContext);

    async function handleSubmit(e: any) {
        e.preventDefault()
        const url = `http://localhost:8080/image/create/${userId}`;
        const formData = new FormData();
        formData.append('img', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        await Axios.post(url, formData, config).then((response) => {
            setSuccessMsg(response.data.data);
        }).catch(err => {
            const error = err.response.data.error
            setErrorMsg(error);
        });
    }

    return (
        <div className="h-screen">
            <form onSubmit={handleSubmit}>
                <div className="border-4 rounded-xl bg-emerald-900 hover:bg-emerald-800 flex justify-center w-1/2 h-1/2 p-12 mx-auto mt-40">
                    <input
                        type="file"
                        name="img"
                        id="img"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files![0])}
                    />
                    <label htmlFor="img" className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#c4c4c4" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z" fill="none" stroke="#c4c4c4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><polyline points="152 32 152 88 208 88" fill="none" stroke="#c4c4c4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline><line x1="104" y1="152" x2="152" y2="152" fill="none" stroke="#c4c4c4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="128" y1="128" x2="128" y2="176" fill="none" stroke="#c4c4c4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
                        <span className="text-slate-400 text-2xl"> {file ? file.name : 'Add image'} </span>
                    </label>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 border my-4 p-2 rounded-lg text-slate-200 font-bold">Save image</button>
                </div>
            </form>
        </div>
    )
}