import { Navbar } from './components/Navbar';
import { Send } from './components/Send';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Profile } from './components/Profile';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Footer } from './components/Footer';
import { AuthContext } from './middlewares/auth';
import { useState } from 'react';
import { NotFound } from './components/NotFound';
import { Message } from './components/Message';

// window.addEventListener('beforeunload', (event) => {
//     event.returnValue = `When reloading the page you will be logged out.`;
// });

export function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    return (
        <BrowserRouter>
                <AuthContext.Provider value={[token, setToken, authenticated, setAuthenticated, username, setUsername, userId, setUserId, errorMsg, setErrorMsg, successMsg, setSuccessMsg]}>
                    <Navbar />
                        <Message />
                        <Routes>
                            <Route path="*" element={<NotFound />} />
                            <Route path="/" element={authenticated? <Send /> : <Navigate replace to="/login" />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={authenticated? <Profile /> : <Navigate replace to="/login" />} />
                        </Routes>
                    <Footer />
                </AuthContext.Provider>
            </BrowserRouter>
    )
}
