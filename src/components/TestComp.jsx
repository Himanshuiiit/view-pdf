import { useRef, useState } from "react";
import samplePDF from "../assets/react_protected.pdf";
import { Document, Page } from "react-pdf";
import "../App.css";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function MyApp() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const scrollRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      className="container"
      onScroll={() => {
        setPageNumber(
          Math.ceil(
            (scrollRef.current.scrollTop + 16*numPages) /
              (scrollRef.current.clientHeight - 60)
          )
        );
      }}
      ref={scrollRef}
    >
      <p className="page">
        Page {pageNumber} of {numPages}
      </p>
      <Document
        file={samplePDF}
        onLoadSuccess={onDocumentLoadSuccess}
        onPassword={(callback) => callback(process.env.REACT_APP_PASSWORD)}
      >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <div style={{ margin: "20px" }} key={page}>
                <Page
                  pageNumber={page}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  scale={1.1}
                />
              </div>
            );
          })}
      </Document>
    </div>
  );
}

export default MyApp;
