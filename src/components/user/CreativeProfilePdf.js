import React from 'react';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

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
        display: 'flex',
        flexDirection: 'row',
        gap: '30px',
        margin: 0,
        padding: '30px',
        backgroundColor: '#f6f6f6'
    },
    sectionHeaderImage: {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        border: '1px solid #000'
    }
});

/* Create Document Component */
export default function CreativeProfilePdf({ data = null, filename = "", creative_education = null, creative_experience = null }) {

    const Header = () => {
        return (
            <>
                <View style={styles.sectionHeader}>
                    <Image source={data?.user_thumbnail || data.profile_image} style={styles.sectionHeaderImage} />
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
                title={filename}
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