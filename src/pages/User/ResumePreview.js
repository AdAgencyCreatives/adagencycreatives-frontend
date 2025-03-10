import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfjs } from 'react-pdf';
import { IoAdd, IoRemove, IoChevronBack, IoChevronForward } from "react-icons/io5";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ResumePreview() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [file, setFile] = useState('');

  useEffect(() => {
    // Get hash value (remove the # symbol)
    const params = new URLSearchParams(window.location.hash.substring(1));
    const file = params.get("url");
    setFile(file);
  }, []);

  const nextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));
  const prevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const zoomIn = () => setScale(prev => prev + 0.2);
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  return (
    <div className="d-flex flex-column align-items-center p-4" style={{ background: '#282828' }}>
      {/* Navigation & Zoom Controls */}
      <div className="d-flex justify-content-between align-items-center w-100 max-w-lg my-4 p-3 bg-white shadow rounded">
        {/* Navigation Buttons */}
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

        {/* Zoom Controls */}
        <div className="btn-group">
          <button onClick={zoomOut} className="btn btn-secondary"><IoRemove /></button>
          <button onClick={zoomIn} className="btn btn-secondary"><IoAdd /></button>
        </div>
      </div>

      {/* PDF Viewer Centered */}
      <div className="bg-white shadow p-3 rounded">
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>
    </div>
  );
};
