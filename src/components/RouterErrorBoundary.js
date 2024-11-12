import React, { useEffect } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import WeWillBeRightBack from "../assets/images/we-will-be-right-back.jpg"

const RouterErrorBoundary = () => {
    const error = useRouteError();

    useEffect(() => {
        console.log(error);
    }, [error]);
    return (
        <div className='we-will-be-right-back'>
            <Link className="site-logo" to={"/"}>
                Ad Agency Creatives
            </Link>
            <div className='message' role="alert">
                <h3 style={{ textAlign: 'center' }}>It seems something is not right.</h3>
                <h4 style={{ textAlign: 'center' }}>We are working on it.</h4>
                {/* <div style={{ textAlign: 'center' }}>
                    We are working on it, but if you keep getting this screen for long,
                    you may want to reach us: <a href='mailto:membersupport@adagencycreatives.com'>membersupport@adagencycreatives.com</a>.
                </div> */}
                <div style={{ display: 'none' }}>{error.statusText || error.message}</div>
            </div>
            <img src={WeWillBeRightBack} />
            <div className='buttons'>
                <Link className='btn btn-dark hover-gold' to={"/"}>Home</Link>
                <button className="btn btn-dark hover-gold" onClick={(e) => window.location.reload()}>Reload</button>
                <Link className='btn btn-dark hover-gold' to={"/contact"}>Contact Us</Link>
            </div>
        </div>
    );
};

export default RouterErrorBoundary;