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
}

export default function PdfViewer({
    fileUrl,
}: PdfViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(0.8);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [isHovered, setIsHovered] = useState<boolean>(false);

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

    return (
        <div className="w-full h-full bg-gradient-to-tl from-gray-600 via-blue-500 to-cyan-400 flex flex-col relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {/* PDF Display Container */}
            <div className="flex-1 overflow-auto pt-10 pb-4">

                {loading && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-600">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4 shadow-sm"></div>
                        <p className="text-lg font-medium">Loading PDF...</p>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center h-full text-red-600">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium">{error}</p>
                    </div>
                )}

                {/* PDF Content - centered */}
                <div className="flex justify-center items-start">
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
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-xl rounded-lg overflow-hidden border border-gray-300 bg-white"
                        />
                    </Document>
                </div>
            </div>

            {/* Controls - positioned at bottom like your original */}
            {numPages > 0 && isHovered && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200 rounded-full px-1 py-1 z-50">
                    {/* Navigation Controls */}
                    <button
                        onClick={goToPrevPage}
                        disabled={pageNumber <= 1}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 disabled:text-gray-400 border-none rounded-full cursor-pointer font-medium transition-all duration-200 flex items-center justify-center group"
                        title="Previous page"
                    >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {/* Page Counter */}
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 rounded-full mx-2 min-w-[80px] text-center">
                        {pageNumber} / {numPages}
                    </div>

                    <button
                        onClick={goToNextPage}
                        disabled={pageNumber >= numPages}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 disabled:text-gray-400 border-none rounded-full cursor-pointer font-medium transition-all duration-200 flex items-center justify-center group"
                        title="Next page"
                    >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-300 mx-2"></div>

                    {/* Zoom Controls */}
                    <button
                        onClick={zoomOut}
                        className="w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-700 border-none rounded-full cursor-pointer font-bold transition-all duration-200 flex items-center justify-center group"
                        title="Zoom out"
                    >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {/* Zoom Percentage */}
                    <div className="px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-50 rounded-full mx-1 min-w-[60px] text-center">
                        {Math.round(scale * 100)}%
                    </div>

                    <button
                        onClick={zoomIn}
                        className="w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-700 border-none rounded-full cursor-pointer font-bold transition-all duration-200 flex items-center justify-center group"
                        title="Zoom in"
                    >
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}