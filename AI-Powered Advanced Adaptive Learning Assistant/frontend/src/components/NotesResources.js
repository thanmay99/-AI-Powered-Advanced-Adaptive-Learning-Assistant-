import { useState } from "react";
import "./common.css";

function NotesResources() {
  const [showDocs, setShowDocs] = useState(false);

  const pdfDocuments = [
    { name: "AI Report (Stanford)", url: "https://ai100.stanford.edu/sites/default/files/2021-09/AI100_2021_Report_Final_0916fnl.pdf" },
    { name: "Machine Learning Book (CMU)", url: "https://www.cs.cmu.edu/~tom/mlbook/Nilsson_ML_ebook.pdf" },
    { name: "Data Science Handbook", url: "https://jakevdp.github.io/PythonDataScienceHandbook/PythonDataScienceHandbook.pdf" },
    { name: "Cybersecurity Framework (NIST)", url: "https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.04162018.pdf" },
    { name: "Feynman’s Lectures on Physics", url: "https://www.feynmanlectures.caltech.edu/pdf/The_Feynman_Lectures_on_Physics_Volume_1.pdf" }
  ];

  

  return (
    <div className="notes-container">
      <button onClick={() => setShowDocs(!showDocs)} className="toggle-button">
        {showDocs ? "Hide Resources" : "Show Resources"}
      </button>

      {showDocs && (
        <div className="documents-list">
          <h2>Available Documents</h2>
          <ul>
            {pdfDocuments.map((doc, index) => (
              <li key={index}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="document-link"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotesResources;