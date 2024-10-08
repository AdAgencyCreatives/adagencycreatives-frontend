import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useOutletContext } from "react-router-dom";
import { useEffect } from 'react';
import usePermissions from '../../hooks/usePermissions';
import { Context as CreativesContext } from "../../context/CreativesContext";
import { Context as AgenciesContext } from "../../context/AgenciesContext";

import CreativeProfilePdf from "../../components/user/CreativeProfilePdf"
import RestrictedAccess from "../../components/RestrictedAccess";
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

import { useLocation, useParams } from "react-router-dom";
import { useContext } from 'react';
import moment from "moment";
import zIndex from '@mui/material/styles/zIndex';

export default function ViewProfilePdf() {

    const [filename, setFilename] = useState("");

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
    const [hasCreativeApplied, setHasCreativeApplied] = useState(false);

    const [setSkipHeaderFooter] = useOutletContext();

    const allowed = (isAdmin || ((isAgency || isAdvisor || isRecruiter) && hasSubscription));

    const skipHeaderFooter = () => {
        setSkipHeaderFooter(true);
        var body = document.querySelector("body");
        body.classList.add("no-overflow");
    };

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
            setFilename(single_creative.name.replace(" ", "_") + "_AdAgencyCreatives_" + getClientDateTime());
            setTimedLoading(false);
        }
    }, [single_creative]);

    window.setTimeout(() => {
        setTimedLoading(false);
    }, 90000);

    return (
        <>
            {(!token || !user) ? (
                <RestrictedAccess
                    title={'Restricted Access'}
                    message={'Login to view this page'}
                    delayTitle='Loading AAC Profile'
                />
            ) : (
                <>
                    <div className="dark-container page-community mb-0 mt-4">
                        <h1 className="community-title">
                            {single_creative && Object.keys(single_creative)?.length > 0 ? 'View AAC Profile' : 'Loading AAC Profile'}
                        </h1>
                        <div className="container-fluid mt-4">
                            <div className="row">
                                <div className="col-md-12 mb-4 mb-md-0">
                                    <div className="restricted-creatives-only">
                                        <div className="restricted-message">
                                            {single_creative && Object.keys(single_creative)?.length > 0 ? (
                                                <>
                                                    <h3>Opening PDF...</h3>
                                                    <PDFViewer style={{ zIndex: '999999', position: 'fixed', left: '0px', top: '0px', width: '100vw', height: '100vh' }}>
                                                        <CreativeProfilePdf data={single_creative} filename={filename} allowPhone={isAdmin || single_creative?.logged_in_user?.is_creative_applicant} />
                                                    </PDFViewer>
                                                </>
                                            ) : (
                                                <CircularProgress size={30} />
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}