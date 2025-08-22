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
    <div className={`relative h-screen flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex justify-between items-center flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-700 text-sm">
            Page {pageNumber} of {numPages}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={zoomOut} 
            className="px-3 py-2 bg-blue-500 text-white border-none rounded-md cursor-pointer font-medium transition-colors hover:bg-blue-600 text-sm"
          >
            -
          </button>
          <span className="font-semibold text-gray-700 px-2 text-sm">
            {Math.round(scale * 100)}%
          </span>
          <button 
            onClick={zoomIn} 
            className="px-3 py-2 bg-blue-500 text-white border-none rounded-md cursor-pointer font-medium transition-colors hover:bg-blue-600 text-sm"
          >
            +
          </button>
          <button 
            onClick={resetZoom} 
            className="px-3 py-2 bg-blue-500 text-white border-none rounded-md cursor-pointer font-medium transition-colors hover:bg-blue-600 text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      {/* PDF Display */}
      <div className="flex-1 overflow-auto flex justify-center items-start bg-gray-50 relative">
        {loading && (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-3"></div>
            <p>Loading PDF...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-full text-red-600">
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
            height={height}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>

        {/* Navigation Controls - Bottom Center */}
        {numPages > 0 && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white  shadow-lg border border-gray-200">
            <button 
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="px-4 py-2 bg-blue-500 text-gray border-none rounded-md cursor-pointer font-medium transition-colors hover:bg-gray-600 hover:text-white disabled:bg-white disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span>←</span>
              
            </button>
            
            <span className="font-semibold text-gray-700">
              {pageNumber} / {numPages}
            </span>
            
            <button 
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="px-4 py-2 bg-blue-500 text-gray border-none rounded-md cursor-pointer font-medium transition-colors hover:bg-gray-600 hover:text-white disabled:bg-white disabled:cursor-not-allowed flex items-center gap-2"
            >
              
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}