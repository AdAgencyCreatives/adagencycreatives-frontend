import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useOutletContext } from "react-router-dom";
import { useEffect } from 'react';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

// Create Document Component
const CreativeProfilePdf = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
        </Page>
    </Document>
);

export default function ViewProfilePdf() {

    const [setSkipHeaderFooter] = useOutletContext();

    useEffect(() => {
        setSkipHeaderFooter(true);
        var body = document.querySelector("body");
        // body.classList.add("no-overflow");
    }, []);

    return (
        <>
            <PDFDownloadLink document={<CreativeProfilePdf />} fileName='creative-profile.pdf'>
                Download
            </PDFDownloadLink>
            &nbsp;
            <BlobProvider document={<CreativeProfilePdf />}>
                {({ url, blob }) => (
                    <a href={url} target="_blank" style={styles.btn}>
                        Print
                    </a>
                )}
            </BlobProvider>
            {/* <PDFViewer style={{ width: '100vw', height: '100vh' }}>
                <CreativeProfilePdf />
            </PDFViewer> */}
        </>
    );
}