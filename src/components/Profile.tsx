import { useEffect, useState, useContext } from "react"
import { Axios } from "../lib/axios";
import { AuthContext } from "../middlewares/auth";

// import Lightbox from "react-image-lightbox";
// import "react-image-lightbox/style.css";

export function Profile() {
    const [token, setToken, authenticated, setAuthenticated, username, setUsername, userId, setUserId, errorMsg, setErrorMsg, successMsg, setSuccessMsg] = useContext(AuthContext);
    const [images, setImages] = useState<any>([])

    useEffect(() => {
        Axios.get(`/images/${userId}`).then(res => {
            res.data.map((i: any) => {
                setImages((old: any) => [i, ...old]);
            });
        }).catch(err => console.log(err));
    }, []);

    function handleLogout() {
        setErrorMsg("Logged out.");

        Axios.defaults.headers.common["Authorization"] = false;
        localStorage.clear();
        setToken(null);
        setAuthenticated(false);
        setUsername(null);
        setUserId(null);
    }

    return (
        <>
            <div className="flex justify-between items-center p-2 bg-emerald-600 w-10/12 mx-auto">
                <span className="text-slate-200">Logged: {username}</span>
                <span className="text-slate-200">{images.length} images.</span>
                <button onClick={handleLogout} className="p-1 text-emerald-100 rounded bg-red-700 border" type="submit">Log out</button>
            </div>
            <div className="w-10/12 min-h-screen h-fit bg-emerald-500 mx-auto mb-10 p-2 flex flex-wrap">
                {
                    images != 0
                    ?
                    images.map((i: any) => {
                        return (
                            <div key={i._id} className="min-w-48 w-48 h-fit m-2 border-4">
                                <img src={`http://localhost:8080/images/${i.name}`} alt="Corrupted image :/" />
                            </div>
                        )
                    })
                    :
                    <h1 className="w-full text-center text-xl">No pictures found.</h1>
                }
            </div>
        </>
    )
}
