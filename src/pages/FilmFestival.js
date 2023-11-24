import "../styles/Community.css";
import { useContext, useEffect, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
import { Button, CircularProgress } from "@mui/material";

const FilmFestival = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const {
        state: { token, role },
    } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            setIsLoading(false);
        }
    }, [token]);

    return (
        <>
            <div className="dark-container page-film-festival mb-0 mt-0">
                <Button className="btn btn-silver btn-home" onClick={(e)=> {
                    if(props.setIsFilmFestivalVisible) {
                        props.setIsFilmFestivalVisible(false);
                    }
                }}>
                    Skip to Home
                </Button>
                <div className="h1 text-center">Film Festival</div>
                <div className="container-fluid mt-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="h2 text-center">What does an Ad Agency Creative Actually Do</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilmFestival;
