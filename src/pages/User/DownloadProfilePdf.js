import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect } from 'react';
import usePermissions from '../../hooks/usePermissions';
import { Context as CreativesContext } from "../../context/CreativesContext";

import CreativeProfilePdf from "../../components/user/CreativeProfilePdf"
import RestrictedAccess from "../../components/RestrictedAccess";
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

import { Link, useParams } from "react-router-dom";
import { useContext } from 'react';
import moment from "moment";

export default function ViewProfilePdf() {

    const getClientDateTime = () => {
        return moment(new Date()).format("YYYY-MM-DD");
    };

    const { username } = useParams();

    const {
        token,
        user,
        isAdmin,
        isAdvisor,
        isAgency,
        isCreative,
        isRecruiter,
        hasSubscription,
        build_search_string,
        which_search,
        proceed_search,
    } = usePermissions();

    const {
        state: { single_creative, creative_education, creative_experience },
        getCreativeForPdf,
    } = useContext(CreativesContext);

    const [timedLoading, setTimedLoading] = useState(true);

    const allowed = (isAdmin || ((isAgency || isAdvisor || isRecruiter) && hasSubscription));

    useEffect(() => {
        if (allowed) {
            getCreativeForPdf(username, (error) => {
                if (error) {
                    console.log(error);
                    setTimedLoading(false);
                }
            });
        }
    }, [allowed]);

    useEffect(() => {
        if (single_creative && Object.keys(single_creative)?.length > 0) {
            setTimedLoading(false);
        }
    }, [single_creative]);

    window.setTimeout(() => {
        setTimedLoading(false);
    }, 90000);

    const getDownloadFilename = () => {
        return (single_creative.name).replace(" ", "_") + "_AdAgencyCreatives_" + getClientDateTime();
    }

    return (
        <>
            <>
                {(!token || !user) ? (
                    <RestrictedAccess
                        title={'Restricted Access'}
                        message={'Login to view this page'}
                    />
                ) : (
                    <>
                        <div className="dark-container page-community mb-0 mt-4">
                            <h1 className="community-title"><span className='desktop-view'>View/</span>
                                <span>Download AAC Profile</span></h1>
                            <div className="container-fluid mt-4">
                                <div className="row">
                                    <div className="col-md-12 mb-4 mb-md-0">
                                        <div className="restricted-creatives-only">
                                            <div className="restricted-message">
                                                <div style={{ display: 'inline-block' }}>
                                                    <Link className="btn btn-dark fs-5" to={"/creative/" + username} style={{ marginRight: '10px' }}>
                                                        Visit Profile
                                                    </Link>
                                                    <Link className="btn btn-dark fs-5 desktop-view" to={"/creative-profile/" + username} style={{ marginRight: '10px' }} reloadDocument>
                                                        View Profile PDF
                                                    </Link>
                                                    {single_creative && Object.keys(single_creative)?.length > 0 ? (
                                                        <PDFDownloadLink className="" document={<CreativeProfilePdf data={single_creative} filename={getDownloadFilename()} allowPhone={isAdmin || single_creative?.logged_in_user?.is_creative_applicant} />} fileName={getDownloadFilename() + ".pdf"}>
                                                            {({ blob, url, loading, error }) =>
                                                                loading ? (
                                                                    <div style={{ display: 'inline-block' }}>
                                                                        <CircularProgress size={30} /> Preparing PDF...
                                                                    </div>
                                                                ) : (
                                                                    <button className={"btn btn-dark fs-5"}>
                                                                        Download Profile PDF
                                                                    </button>
                                                                )
                                                            }
                                                        </PDFDownloadLink>
                                                    ) : (
                                                        <>
                                                            <CircularProgress size={30} /> Generating PDF...
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>
        </>
    );
}