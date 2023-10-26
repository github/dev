import React, { useEffect, useState } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      setHasError(true);
      setError(error);
      setErrorInfo(errorInfo);
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    hasError ? (
      <div>
        <h2>Something went wrong!</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {error && error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      </div>
    ) : (
      children
    )
  );
}

export default ErrorBoundary;


// use case use it as a wrapper on the application whene there is some error

function App() {
    return (
      <div>
        <h1>Your App</h1>
        <ErrorBoundary>
          {/* Your main application content */}
          {/* Any component that might throw an error */}
          {/* ... */}
        </ErrorBoundary>
      </div>
    );
  }
  
