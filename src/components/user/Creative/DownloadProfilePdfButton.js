import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress, Tooltip } from "@mui/material";
import { PDFDownloadLink } from '@react-pdf/renderer';
import CreativeProfilePdf from "../CreativeProfilePdf"
import { Context as CreativesContext } from "../../../context/CreativesContext";

const DownloadProfilePdfButton = React.memo(({ data, filename, allowPhone }) => {

    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {data && Object.keys(data)?.length > 0 && (
                <PDFDownloadLink className="" document={<CreativeProfilePdf data={data} filename={filename} allowPhone={allowPhone} />} fileName={filename + ".pdf"}>
                    {({ blob, url, loading, error }) => {
                        if (isLoading && loading) {
                            setIsLoading(false);
                        }
                        return (
                            <button className={"btn btn-" + (isLoading || loading ? "silver" : "dark") + " fs-5"} style={{ cursor: isLoading || loading ? 'wait' : 'pointer' }}>
                                Download Profile
                            </button>
                        );
                    }}
                </PDFDownloadLink>
            )}
        </>
    );
});

export default DownloadProfilePdfButton;
