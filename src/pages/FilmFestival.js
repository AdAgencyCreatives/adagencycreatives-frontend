import "../styles/Community.css";
import "../styles/AgencyDashboard/Profile.scss";
import { useContext, useEffect, useRef, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
import { saveFestival } from "../context/FestivalsDataContext";
import { Button, CircularProgress } from "@mui/material";
import FilmFestivalEnter from "../assets/images/film-festival-enter.png";
import Favicon from "../assets/images/favicon.png";
import { FiFile, FiPaperclip, FiTrash2 } from "react-icons/fi";
import Select from "../components/Select";
import { Context as AlertContext } from "../context/AlertContext";
import SlidingMessage from "../components/SlidingMessage";

const FilmFestival = (props) => {

    const [step, setStep] = useState(1);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [titleOfFilm, setTitleOfFilm] = useState("");
    const [category, setCategory] = useState("");
    const categoryOptions = [
        { label: "Humor", value: "Humor", key: "humor" },
        { label: "Storytelling", value: "Storytelling", key: "storytelling" },
        { label: "Design", value: "Design", key: "design" }
    ];
    const [agreeRules, setAgreeRules] = useState("");

    const [isFileLoading, setIsFileLoading] = useState(false);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const { state: { message }, showAlert } = useContext(AlertContext);

    const {
        state: { token, role },
    } = useContext(AuthContext);

    useEffect(() => {
        setIsLoading(false);
        setIsFileLoading(false);
        setIsFormSubmitting(false);
    }, []);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file 
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setUploadedFile(fileUploaded);
        setIsFileLoading(true);
    };

    useEffect(() => {
        if (uploadedFile) {
            setIsFileLoading(false);
        }
    }, [uploadedFile]);

    const validateInputs = () => {
        if (!firstName) {
            showAlert("Please provide First Name");
            return false;
        }
        if (!lastName) {
            showAlert("Please provide Last Name");
            return false;
        }
        if (!emailAddress) {
            showAlert("Please provide Email Address");
            return false;
        }
        if (!titleOfFilm) {
            showAlert("Please provide Title of Film");
            return false;
        }
        if (!category) {
            showAlert("Please select Category");
            return false;
        }
        if (!uploadedFile) {
            showAlert("Please select your Film to upload");
            return false;
        }
        if (!agreeRules) {
            showAlert("Please agree to abide by the rules");
            return false;
        }

        return true;
    };

    const saveFestivalAsync = async (file) => {

        if (!validateInputs()) {
            return;
        }
        setIsFormSubmitting(true);

        let formData = new FormData();

        formData.append("first_name", firstName || "");
        formData.append("last_name", lastName || "");
        formData.append("email", emailAddress || "");
        formData.append("title", titleOfFilm || "");
        formData.append("category", category || "");
        formData.append("file", file);

        let result = await saveFestival(formData);

        if (result) {
            setIsFormSubmitting(false);
            setStep(old => (old % 3) + 1)
        } else {
            showAlert("Oops! not able to upload your film at the moment.");
        }

    };

    return (
        <>
            <SlidingMessage message={message} />
            <div className="dark-container page-film-festival d-fccc mb-0 mt-0">
                {step == 1 ? (<>
                    <div className="film-festival-step step-1 d-fccc">
                        <Button className="btn btn-silver btn-home btn-wide" onClick={(e) => {
                            if (props.setIsFilmFestivalVisible) {
                                props.setIsFilmFestivalVisible(false);
                            }
                        }}>
                            Skip to Home
                        </Button>
                        <div className="h1 text-center">Film Festival</div>
                        <div className="h2 text-center">What does an Ad Agency Creative Actually Do</div>
                        <img className="film-festival-enter" src={FilmFestivalEnter} alt="" onClick={(e) => setStep(old => (old % 3) + 1)} />
                        <div className="h3 text-center mt-3"><strong>Deadline:</strong> December 12TH 4Pm CST</div>
                        <div className="h3 text-center"><strong>Winners Win:</strong> $500 & bragging rights</div>
                        <div className="container-fluid mt-4">
                            <div className="row">
                                <div className="col-5 d-fssc">
                                    <div className="h3"><strong><u>Rules</u></strong></div>
                                    <ul>
                                        <li className="h3">
                                            <strong>Format</strong> mp4 Video 960 x 960 px
                                        </li>
                                        <li className="h3">
                                            <strong>Length</strong> Not to exceed 60 Seconds
                                        </li>
                                        <li className="h3">
                                            Must include credits
                                        </li>
                                        <li className="h3">
                                            Must be an original
                                        </li>
                                        <li className="h3">
                                            Must be registered with AdAgencyCreatives.com
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-5 d-fssc">
                                    <div className="h3"><strong><u>Winner Categories</u></strong></div>
                                    <ul>
                                        <li className="h3">
                                            Humor
                                        </li>
                                        <li className="h3">
                                            Story Telling
                                        </li>
                                        <li className="h3">
                                            Design
                                        </li>
                                    </ul>
                                    <div className="h3"><strong><u>Winners</u></strong></div>
                                    <ul>
                                        <li className="h3">
                                            WILL BE ANNOUNCED Dec. 19, 2023
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-2 d-fscc">
                                    <img src={Favicon} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>) : (<></>)}

                {step == 2 ? (<>
                    <div className="film-festival-step step-2 d-fccc">
                        <h1 className="page-title">Submission Form</h1>
                        <div className="container-fluid profile-edit-form">
                            <div className="row gx-3 gy-5 align-items-end">
                                <div className="col-sm-6 col-12">
                                    <label className="form-label" htmlFor="first-name">First Name <span className="input-required">*</span></label>
                                    <input className="form-control" type="text" id="first-name" placeholder="Enter first name here ..." autoFocus value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="col-sm-6 col-12">
                                    <label className="form-label" htmlFor="last-name">Last Name <span className="input-required">*</span></label>
                                    <input className="form-control" type="text" id="last-name" placeholder="Enter last name here ..." value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div className="col-sm-6 col-12">
                                    <label className="form-label" htmlFor="email-address">Email Address <span className="input-required">*</span></label>
                                    <input className="form-control" type="text" id="email-address" placeholder="Enter email address here ..." value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                                </div>
                                <div className="col-sm-6 col-12">
                                    <label className="form-label" htmlFor="title-of-film">Title of Film <span className="input-required">*</span></label>
                                    <input className="form-control" type="text" id="title-of-film" placeholder="Enter title of film here ..." value={titleOfFilm} onChange={(e) => setTitleOfFilm(e.target.value)} />
                                </div>
                                <div className="col-sm-6 col-12">
                                    <label className="form-label" htmlFor="category">Category <span className="input-required">*</span></label>
                                    <Select
                                        options={categoryOptions.map((option) => ({
                                            ...option,
                                        }))}
                                        isMulti={false}
                                        onChange={(item) => setCategory(item.value)}
                                        placeholder={""}
                                        defaultValue={categoryOptions.filter((item) => item.value == "Humor")}
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                padding: "11px",
                                                backgroundColor: "#F6F6F6",
                                                border: "none",
                                            }),
                                            valueContainer: (baseStyles) => ({
                                                ...baseStyles,
                                                padding: "0px",
                                                fontSize: 20,
                                            }),
                                            singleValue: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "#696969",
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="col-sm-6 col-12">
                                    <div className="row gx-3 gy-5 align-items-end">
                                        <div className="col-sm-6 col-12 d-fccc">
                                            {isFileLoading ? (<>
                                                <CircularProgress />
                                                <div>Loading ...</div>
                                            </>) : (<>
                                                <strong>Film to upload: </strong> {uploadedFile ? uploadedFile.name : "None"}
                                            </>)}
                                            <input
                                                type="file"
                                                onChange={handleChange}
                                                ref={hiddenFileInput}
                                                style={{ display: 'none' }} // Make the file input element invisible
                                                accept="video/*"
                                            />
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <button
                                                className="btn btn-secondary w-100 mb-2 text-uppercase"
                                                onClick={(e) => handleClick(e)}
                                            >
                                                <FiPaperclip /> Select
                                            </button>
                                            <button
                                                className="btn btn-secondary w-100 text-uppercase"
                                                onClick={(e) => {
                                                    hiddenFileInput.current.value = "";
                                                    setUploadedFile(null);
                                                }}
                                            >
                                                <FiTrash2 /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <input className="" type="checkbox" id="accept-rules" checked={agreeRules ? "checked" : ""} onChange={(e) => setAgreeRules(e.target.checked ? true : false)} />&nbsp;
                                    <label className="form-label" htmlFor="accept-rules" style={{ cursor: "pointer" }} >I read and abided by the rules <span className="input-required">*</span></label>
                                </div>
                            </div>
                        </div>
                        <div className="button-group d-fccr">
                            <Button className="btn btn-gold btn-wide" onClick={(e) => setStep(old => (old == 1 ? 1 : old - 1))}>
                                Back
                            </Button>
                            <Button disabled={isFormSubmitting ? "disabled" : ""} className="btn btn-gold btn-wide" onClick={(e) => {
                                saveFestivalAsync(uploadedFile);
                            }}>
                                Next
                            </Button>
                            {isFormSubmitting ? (<>
                                <CircularProgress />
                                <div>Uploading ...</div>
                            </>) : (<></>)}
                        </div>
                    </div>
                </>) : (<></>)}

                {step == 3 ? (<>
                    <div className="film-festival-step step-3 d-fccc">
                        <img src={Favicon} alt="" />
                        <div className="h3 text-center">
                            <strong>Thank You for your submission. </strong>
                        </div>
                        <div className="h3 text-center">
                            We hope you had fun and looking forward to seeing it.
                        </div>
                        <div className="h3 text-center">
                            Good Luck.
                        </div>
                        <Button className="btn btn-gold btn-wide" onClick={(e) => {
                            if (props.setIsFilmFestivalVisible) {
                                props.setIsFilmFestivalVisible(false);
                            }
                        }}>
                            Finish
                        </Button>
                    </div>
                </>) : (<></>)}
            </div>
        </>
    );
};

export default FilmFestival;
