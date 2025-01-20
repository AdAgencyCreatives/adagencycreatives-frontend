import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress, Tooltip } from "@mui/material";
import { PDFDownloadLink } from '@react-pdf/renderer';
import CreativeProfilePdf from "../CreativeProfilePdf"
import { Context as CreativesContext } from "../../../context/CreativesContext";

const DownloadProfilePdfButton = React.memo(({ data, filename, allowPhone }) => {

    return (
        <>
            {data && Object.keys(data)?.length > 0 && (
                <PDFDownloadLink className="" document={<CreativeProfilePdf data={data} filename={filename} allowPhone={allowPhone} />} fileName={filename + ".pdf"}>
                    {({ blob, url, loading, error }) => (
                        <button className={"btn btn-dark fs-5"} style={{ minWidth: '220px', cursor: loading ? 'wait' : 'pointer' }}>
                            {loading ? (
                                <div style={{ display: 'inline-block' }}>
                                    <CircularProgress size={20} /> Preparing Download...
                                </div>
                            ) : (<>Download Profile</>)}
                        </button>
                    )}
                </PDFDownloadLink>
            )}
        </>
    );
});

export default DownloadProfilePdfButton;
