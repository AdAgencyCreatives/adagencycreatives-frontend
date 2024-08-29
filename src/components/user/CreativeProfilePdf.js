import React from 'react';
import { Circle, Document, Font, Image, Page, Path, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';

import jost from "../../assets/fonts/Jost/static/Jost-Regular.ttf";
import jostLight from "../../assets/fonts/Jost/static/Jost-Light.ttf";
import jostMedium from "../../assets/fonts/Jost/static/Jost-Medium.ttf";
import jostBold from "../../assets/fonts/Jost/static/Jost-Bold.ttf";
import alta from "../../assets/fonts/Alta_Typeface/Alta_regular.otf";

Font.register({
    family: "JOST",
    format: "truetype",
    fonts: [
        { src: jost },
        { src: jostLight, fontWeight: 'light' },
        { src: jostMedium, fontWeight: 'medium' },
        { src: jostBold, fontWeight: 'bold' },
    ]
});

Font.register({
    family: "ALTA",
    format: "opentype",
    src: alta
});

/* Create styles */
const styles = StyleSheet.create({
    page: {
        fontFamily: 'JOST',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: '12.7mm'
    },
    section: {
        margin: 0,
        padding: 0,
    },
    flexRows: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexCols: {
        display: 'flex',
        flexDirection: 'column'
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
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50px'
    },
    sectionHeaderDetail: {
        margin: 0,
        padding: '10px 0px 0px 0px',
    },
    heading1: {
        fontSize: '24px',
        fontWeight: 'medium',
        margin: '20px 0px 10px 0px'
    }
});

/* Create Document Component */
export default function CreativeProfilePdf({ data = null, filename = "", creative_education = null, creative_experience = null }) {

    const IoLocationOutlineSvg = ({ size = 16, color = "currentColor" }) => {
        return (
            <Svg
                stroke={color}
                fill={color}
                strokeWidth="0"
                viewBox="0 0 512 512"
                height={size + "px"}
                width={size + "px"}
                xmlns="http://www.w3.org/2000/svg">
                <Path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"></Path>
                <Circle cx="256" cy="192" r="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></Circle>
            </Svg>
        );
    };

    const Header = () => {
        return (
            <>
                <View style={styles.sectionHeader}>
                    <Image source={data?.user_thumbnail_base64} style={styles.sectionHeaderImage} />
                    <View style={[styles.flexCols, styles.sectionHeaderDetail]}>
                        <Text style={{ fontSize: '26px', fontWeight: 'normal', lineHeight: '1.5em' }}>{data.name || ""}</Text>
                        <Text style={{ fontSize: '16px', fontWeight: 'normal', lineHeight: '1.5em' }}>{data.category || ""}</Text>
                        <View style={[styles.flexRows]}>
                            <View style={{ marginTop: '2px', marginRight: '4px' }}>
                                <IoLocationOutlineSvg size={14} />
                            </View>
                            <Text style={{ fontSize: '14px', fontWeight: 'light', lineHeight: '1.5em' }}>{data.location.state || ""}, {data.location.city || ""}</Text>
                        </View>
                    </View>
                </View>
            </>
        );
    };

    const Content = () => {

        const ContentLeft = () => {

            const Portfolio = () => {
                return (
                    <>
                        <View style={[styles.flexCols]}>
                            <Text style={styles.heading1}>Portfolio</Text>
                        </View>
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

            return (
                <>
                    <Portfolio />
                    <About />
                    <ProfileThumbnails />
                    <PortfolioSite />
                    <Education />
                    <WorkExperience />
                    <CreativeReviews />
                </>
            );
        };

        const ContentRight = () => {

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

            return (
                <>
                    <CreativeDetail />
                    <Video />
                    <Resume />
                </>
            );
        };

        return (
            <>
                <ContentLeft />
                <ContentRight />
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
                    <Content />
                    <Footer />
                </Page>
            </Document>
        </>
    );

}