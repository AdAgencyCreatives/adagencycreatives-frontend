import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useOutletContext } from "react-router-dom";
import { useEffect } from 'react';
import usePermissions from '../../hooks/usePermissions';
import { Context as CreativesContext } from "../../context/CreativesContext";

import CreativeProfilePdf from "../../components/user/CreativeProfilePdf"
import RestrictedAccess from "../../components/RestrictedAccess";
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

import { useLocation, useParams } from "react-router-dom";
import { useContext } from 'react';
import moment from "moment";

export default function ViewProfilePdf() {

    const [filename, setFilename] = useState("");

    const getClientDateTime = () => {
        return moment(new Date()).format("YYYY-MM-DD");
    };

    const { username } = useParams();

    const {
        state: { single_creative, creative_education, creative_experience },
        getCreative,
    } = useContext(CreativesContext);

    const [timedLoading, setTimedLoading] = useState(true);

    const [setSkipHeaderFooter] = useOutletContext();

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

    const skipHeaderFooter = () => {
        setSkipHeaderFooter(true);
        var body = document.querySelector("body");
        body.classList.add("no-overflow");
    };

    useEffect(() => {
        if (allowed) {
            getCreative(username, (error) => {
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
    }, 10000);

    return (
        <>
            {single_creative && Object.keys(single_creative)?.length > 0 ? (
                <>
                    {skipHeaderFooter()}
                    <PDFViewer style={{ width: '100vw', height: '100vh' }}>
                        <CreativeProfilePdf data={single_creative} filename={filename} creative_education={creative_education} creative_experience={creative_experience} portfolio_items={single_creative.portfolio_items_base64} />
                    </PDFViewer>
                </>
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