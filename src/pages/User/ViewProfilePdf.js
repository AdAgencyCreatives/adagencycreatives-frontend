import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useOutletContext } from "react-router-dom";
import { useEffect } from 'react';
import usePermissions from '../../hooks/usePermissions';

import CreativeProfilePdf from "../../components/user/CreativeProfilePdf"
import RestrictedAccess from "../../components/RestrictedAccess";
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

import { useLocation, useParams } from "react-router-dom";
import { Context as CreativesContext } from "../../context/CreativesContext";
import { useContext } from 'react';

export default function ViewProfilePdf() {

    const { username } = useParams();

    const {
        state: { single_creative, creative_education, creative_experience },
        getCreative,
    } = useContext(CreativesContext);

    const [timedLoading, setTimedLoading] = useState(true);

    const [setSkipHeaderFooter] = useOutletContext();
    useEffect(() => {
        setSkipHeaderFooter(true);
        var body = document.querySelector("body");
        body.classList.add("no-overflow");
    }, []);

    const {
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

    const allowed = (isAdmin || ((isAgency || isAdvisor || isRecruiter) && hasSubscription));

    useEffect(() => {
        setSkipHeaderFooter(allowed);
        var body = document.querySelector("body");
        if (allowed) {
            body.classList.add("no-overflow");
            getCreative(username, (error) => {
                if (error) {
                    console.log(error);
                }
            });
        } else {
            body.classList.remove("no-overflow");
        }
    }, [allowed]);

    window.setTimeout(() => {
        setTimedLoading(false);
    }, 3000);

    return (
        <>
            {allowed ? (
                <PDFViewer style={{ width: '100vw', height: '100vh' }}>
                    <CreativeProfilePdf data={single_creative} />
                </PDFViewer>
            ) : (
                <RestrictedAccess
                    title={timedLoading ? 'View/Download Profile PDF' : 'Restricted Access'}
                    message={timedLoading ? <>
                        <CircularProgress size={30} /><br />Loading...
                    </> : 'Active subscription required. Post a Job to View/Download Profile PDF'}
                />
            )}
        </>
    );
}