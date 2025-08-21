// components/PdfViewer.tsx
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerProps {
  fileUrl: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function PdfViewer({ 
  fileUrl, 
  width = 800, 
  height = 600,
  className = ''
}: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError('');
  };

  const onDocumentLoadError = (error: Error) => {
    setError(`Failed to load PDF: ${error.message}`);
    setLoading(false);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  return (
    <div className={`pdf-viewer-container ${className}`}>
      {/* Toolbar */}
      <div className="toolbar">
        <div className="navigation-controls">
          <button 
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="nav-btn"
          >
            ← Previous
          </button>
          
          <span className="page-info">
            Page {pageNumber} of {numPages}
          </span>
          
          <button 
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="nav-btn"
          >
            Next →
          </button>
        </div>

        <div className="zoom-controls">
          <button onClick={zoomOut} className="zoom-btn">-</button>
          <span className="zoom-info">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="zoom-btn">+</button>
          <button onClick={resetZoom} className="reset-btn">Reset</button>
        </div>
      </div>

      {/* PDF Display */}
      <div className="pdf-display" style={{ height: `${height}px` }}>
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading PDF...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading=""
          error=""
        >
          <Page 
            pageNumber={pageNumber}
            scale={scale}
            width={width}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>

      <style jsx>{`
        .pdf-viewer-container {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          background: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .toolbar {
          background: #f7fafc;
          padding: 12px 20px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .navigation-controls, .zoom-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-btn, .zoom-btn, .reset-btn {
          padding: 8px 12px;
          background: #4299e1;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }

        .nav-btn:hover:not(:disabled), .zoom-btn:hover, .reset-btn:hover {
          background: #3182ce;
        }

        .nav-btn:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }

        .page-info, .zoom-info {
          font-weight: 600;
          color: #2d3748;
          padding: 0 8px;
        }

        .pdf-display {
          overflow: auto;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;
          background: #f7fafc;
        }

        .loading, .error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #4a5568;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #4299e1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 10px;
        }

        .error {
          color: #e53e3e;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .toolbar {
            flex-direction: column;
            gap: 15px;
          }
          
          .navigation-controls, .zoom-controls {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}