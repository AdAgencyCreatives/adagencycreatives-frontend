import "../styles/Community.css";

import { useContext, useEffect, useState } from "react";
import { Context as AuthContext } from "../context/AuthContext";

import { useParams, useNavigate } from "react-router-dom";

const Login = () => {

    const { redirect } = useParams();

    const {
        state: { token, role },
    } = useContext(AuthContext);

    useEffect(() => {
        if (token && role) {
            if (redirect?.length > 0) {
                window.location.href = decodeURIComponent(redirect);
            }
        }
    }, [token, role]);

    return (
        <>
            <div className="dark-container page-community mb-0 mt-0">
                <h1 className="community-title">Login</h1>
                <h2 className="community-subtitle"></h2>
                <div className="container-fluid mt-4 px-2 px-md-5">
                    <div className="login-button-container">
                        <a className="btn btn-gold" href="#login">Login/Register</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
