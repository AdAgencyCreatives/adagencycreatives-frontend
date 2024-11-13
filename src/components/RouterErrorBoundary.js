import React, { useEffect } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import WeWillBeRightBack from "../assets/images/we-will-be-right-back.jpg"
import { notifyError } from '../context/ErrorDataContext';

const RouterErrorBoundary = () => {
    const error = useRouteError();

    useEffect(() => {
        console.log(error);
        notifyError({
            url: window.location.href,
            error_message: error.statusText || error.message,
        });
    }, [error]);
    return (
        <div className='we-will-be-right-back'>
            <Link className="site-logo" to={"/"}>
                Ad Agency Creatives
            </Link>
            <div className='message' role="alert">
                <h5 style={{ textAlign: 'center' }}>It seems something is not right.</h5>
                <h5 style={{ textAlign: 'center' }}>We are working on it.</h5>
                <div style={{ display: 'none' }}>{error.statusText || error.message}</div>
            </div>
            <img src={WeWillBeRightBack} />
            <h5 style={{ textAlign: 'center' }}>We will be right back.</h5>
            <div className='buttons'>
                <Link className='btn btn-dark hover-gold' to={"/"}>Home</Link>
                <button className="btn btn-dark hover-gold" onClick={(e) => window.location.reload()}>Reload</button>
                <Link className='btn btn-dark hover-gold' to={"/contact"}>Contact Us</Link>
            </div>
        </div>
    );
};

export default RouterErrorBoundary;