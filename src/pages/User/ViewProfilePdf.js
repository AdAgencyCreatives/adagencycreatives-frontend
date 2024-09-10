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
            {single_creative && Object.keys(single_creative)?.length > 0 ? (
                <>
                    {skipHeaderFooter()}
                    <PDFViewer style={{ width: '100vw', height: '100vh' }}>
                        <CreativeProfilePdf data={single_creative} filename={filename} creative_education={creative_education} creative_experience={creative_experience} portfolio_items={single_creative.portfolio_items_base64} allowPhone={isAdmin || single_creative?.logged_in_user?.is_creative_applicant} />
                    </PDFViewer>
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
                            title={timedLoading ? 'View/Download Profile PDF' : 'Restricted Access'}
                            message={<CircularProgress size={30} />}
                        />
                    )}
                </>
            )}
        </>
    );
}