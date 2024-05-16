import React from 'react';
import { NextApiRequest, NextApiResponse, NextError } from 'next';

interface ErrorProps {
  statusCode?: number;
  hasError: boolean;
  error?: NextError | string; // Type assertion for flexibility
}

const ErrorPage: React.FC<ErrorProps> = ({ statusCode, hasError, error }) => {
  if (!hasError) {
    return null; // No error, render nothing
  }

  let errorMessage = 'An unexpected error occurred on our end.';

  // Access specific error details if available (assuming ApiError interface)
  if (error instanceof Error && error.message) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>{statusCode || 500} Error</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;

