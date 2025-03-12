import React, { useState, useContext } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfjs } from 'react-pdf';
import { IoDownloadOutline } from "react-icons/io5";
import { saveAs } from 'file-saver';
import { Context as AlertContext } from "../../context/AlertContext";
import moment from "moment";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ResumePreview({ creative }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isDownloading, setDownloading] = useState(false);

  const { showAlert } = useContext(AlertContext);

  if (!creative) {
    return <></>;
  }

  const nextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));
  const prevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const zoomIn = () => setScale(prev => prev + 0.2);
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  const downloadResume = () => {
    setDownloading(true);
    const extension = creative.resume.lastIndexOf(".") > 0 ? creative.resume.substring(creative.resume.lastIndexOf(".")) : '';
    const fileName = getDownloadFilename() + extension;
    fetch(creative.resume)
      .then(res => res.blob())
      .then(blob => {
        setDownloading(false);
        saveAs(blob, fileName);
      })
      .catch((error) => {
        setDownloading(false);
        console.log(error);
        showAlert(error?.message || "Sorry, an error occurred");
      });
  }

  const getDownloadFilename = () => {
    return (creative.name).replace(" ", "_") + "_AdAgencyCreatives_" + getClientDateTime();
  }

  const getClientDateTime = () => {
    return moment(new Date()).format("YYYY-MM-DD");
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4" style={{ background: '#282828' }}>
      <div className="d-flex justify-content-end p-2 bg-black w-100 px-4">
        <button className="btn btn-silver hover-black d-flex align-items-center gap-1" onClick={downloadResume}>
          <IoDownloadOutline /> Donwload
        </button>
      </div>
      {/* Navigation & Zoom Controls */}
      {/* <div className="d-flex justify-content-between align-items-center w-100 max-w-lg my-4 p-3 bg-white shadow rounded">
        <div className="btn-group">
          <button 
            onClick={prevPage} 
            disabled={pageNumber === 1} 
            className="btn btn-dark d-flex align-items-center gap-1"
          >
            <IoChevronBack /> Prev
          </button>
          <span className="px-3 align-self-center">
            Page {pageNumber} of {numPages || "?"}
          </span>
          <button 
            onClick={nextPage} 
            disabled={pageNumber === numPages} 
            className="btn btn-dark d-flex align-items-center gap-1"
          >
            Next <IoChevronForward />
          </button>
        </div>

        <div className="btn-group">
          <button onClick={zoomOut} className="btn btn-secondary"><IoRemove /></button>
          <button onClick={zoomIn} className="btn btn-secondary"><IoAdd /></button>
        </div>
      </div> */}

      {/* PDF Viewer Centered */}
      <div className="text-white py-4">
        <Document
          file={creative.resume}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scale} className="bg-white shadow p-3 my-3" />
          ))}
        </Document>
      </div>
    </div>
  );
};
