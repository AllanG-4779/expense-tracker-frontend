'use client';

import React from 'react';

interface ErrorPageProps {
    statusCode?: number;
    message?: string;
    onRetry?: () => void;
    showHomeButton?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
                                                 statusCode = 500,
                                                 message,
                                                 onRetry,
                                                 showHomeButton = true
                                             }) => {


    const getErrorIcon = () => {
        if (statusCode === 404) {
            return (
              <div>Hello</div>
            );
        }
        return (
            <svg className="w-24 h-24 text-red-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
        );
    };

    const getErrorTitle = () => {
        switch (statusCode) {
            case 404:
                return "Page Not Found";
            case 403:
                return "Access Forbidden";
            case 500:
                return "Server Error";
            case 401:
                return "Unauthorized";
            default:
                return "Something Went Wrong";
        }
    };

    const getErrorDescription = () => {
        if (message) return message;

        switch (statusCode) {
            case 404:
                return "The page you're looking for doesn't exist or has been moved.";
            case 403:
                return "You don't have permission to access this resource.";
            case 500:
                return "Our servers are experiencing some technical difficulties.";
            case 401:
                return "Please log in to access this page.";
            default:
                return "An unexpected error has occurred. Please try again later.";
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Main Error Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
                    {/* Error Icon */}
                    <div className="flex justify-center">
                        {getErrorIcon()}
                    </div>

                    {/* Status Code Badge */}
                    {statusCode && (
                        <div
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 mb-4">
                            Error {statusCode}
                        </div>
                    )}

                    {/* Error Title */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">
                        {getErrorTitle()}
                    </h1>

                    {/* Error Description */}
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {getErrorDescription()}
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {onRetry && (
                            <button
                                onClick={onRetry}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                </svg>
                                <span>Try Again</span>
                            </button>
                        )}

                        {showHomeButton && (
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                </svg>
                                <span>Go Home</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Additional Help Text */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Need help? Contact our{' '}
                        <a href="/support" className="text-blue-600 hover:text-blue-700 font-medium">
                            support team
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

// Alternative minimal version
export const MinimalErrorPage: React.FC<ErrorPageProps> = ({
                                                               statusCode,
                                                               message,
                                                               onRetry
                                                           }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                </div>

                <h1 className="text-xl font-semibold text-gray-900 mb-2">
                    {statusCode ? `Error ${statusCode}` : 'Something went wrong'}
                </h1>

                <p className="text-gray-600 mb-6">
                    {message || 'An unexpected error has occurred.'}
                </p>

                <div className="space-y-3">
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="w-full bg-[#dc4b3e] text-white py-2 px-4 rounded-md transition-colors"
                        >
                            Try Again Now
                        </button>
                    )}

                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-md transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;

// Usage examples:
/*
// Basic usage
<ErrorPage statusCode={404} />

// With custom message
<ErrorPage
  statusCode={500}
  message="Database connection failed. Please try again."
/>

// With retry functionality
<ErrorPage
  statusCode={500}
  message="Failed to load data"
  onRetry={() => window.location.reload()}
/>

// Minimal version
<MinimalErrorPage
  statusCode={404}
  message="Page not found"
/>
*/