import React from 'react';
import { pdf, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

import moment from "moment";

/* Create styles */
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: '12.7mm'
    },
    section: {
        margin: 0,
        padding: 0,
    },
    sectionHeader: {
        margin: 0,
        padding: '30px',
        backgroundColor: '#f6f6f6'
    }
});

/* Create Document Component */
export default function CreativeProfilePdf({ data = null }) {

    const getClientDateTime = () => {
        return moment(new Date()).format("YYYY-MM-DD");
    };

    const getDownloadFilename = () => {
        if (data?.name?.length > 0)
            return (data.name).replace(" ", "_") + "_AdAgencyCreatives_" + getClientDateTime();
        return "";
    }

    const Header = () => {
        return (
            <>
                <View style={styles.sectionHeader}>
                    <Text>{data.name || ""}</Text>
                </View>
            </>
        );
    };

    const Content = () => {
        return (
            <>

            </>
        );
    };

    const ContentLeft = () => {
        return (
            <>

            </>
        );
    };

    const About = () => {
        return (
            <>

            </>
        );
    };

    const ProfileThumbnails = () => {
        return (
            <>

            </>
        );
    };

    const PortfolioSite = () => {
        return (
            <>

            </>
        );
    };

    const Education = () => {
        return (
            <>

            </>
        );
    };

    const WorkExperience = () => {
        return (
            <>

            </>
        );
    };

    const CreativeReviews = () => {
        return (
            <>

            </>
        );
    };

    const ContentRight = () => {
        return (
            <>

            </>
        );
    };

    const CreativeDetail = () => {
        return (
            <>

            </>
        );
    };

    const Video = () => {
        return (
            <>

            </>
        );
    };

    const Resume = () => {
        return (
            <>

            </>
        );
    };

    const Footer = () => {
        return (
            <>

            </>
        );
    };

    return (
        <>
            <Document
                title={getDownloadFilename()}
                author={"Ad Agency Creatives"}
                subject={(data.name || "") + " - Creative Profile PDF - Ad Agency Creatives"}
            >
                <Page size="A4" style={styles.page}>
                    <Header />
                    <View style={styles.section}>
                        <Text>Section #2</Text>
                    </View>
                </Page>
            </Document>
        </>
    );

}