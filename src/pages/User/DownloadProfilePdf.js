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
            {single_creative && Object.keys(single_creative)?.length > 0 ? (
                <>
                    <RestrictedAccess
                        title={
                            <>
                                <span className='desktop-view'>View/</span>
                                <span>Download Profile PDF</span>
                            </>
                        }
                        message={
                            <>
                                <Link className="btn btn-dark fs-5" to={"/creative/" + username} style={{ marginRight: '10px' }}>
                                    Visit Profile
                                </Link>
                                <Link className="btn btn-dark fs-5 desktop-view" to={"/creative-profile/" + username} style={{ marginRight: '10px' }} target='_blank'>
                                    View Profile PDF
                                </Link>
                                <PDFDownloadLink className="" document={<CreativeProfilePdf data={single_creative} filename={getDownloadFilename()} creative_education={creative_education} creative_experience={creative_experience} allowPhone={isAdmin || single_creative?.logged_in_user?.is_creative_applicant} />} fileName={getDownloadFilename() + ".pdf"}>
                                    <button className={"btn btn-dark fs-5"}>
                                        Download Profile PDF
                                    </button>
                                </PDFDownloadLink>
                            </>
                        }
                    />
                </>
            ) : (
                <>
                    {(!token || !user) ? (
                        <RestrictedAccess
                            title={'Restricted Access'}
                            message={'Login to view this page'}
                        />
                    ) : (
                        <RestrictedAccess
                            title={timedLoading ? (
                                <>
                                    <span className='desktop-view'>View/</span>
                                    <span>Download Profile PDF</span>
                                </>
                            ) : 'Restricted Access'}
                            message={<CircularProgress size={30} />}
                        />
                    )}
                </>
            )}
        </>
    );
}