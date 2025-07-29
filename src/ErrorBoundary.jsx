import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Caught by ErrorBoundary:", error, errorInfo);
        this.setState({ errorInfo });
    }

    handleReset = () => {
        this.setState({ hasError: false, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            const fallback = this.props.fallback || (
                <div >
                    <h2>Oops! Something went wrong.</h2>
                    <button onClick={this.handleReset} >
                        Try Again
                    </button>
                </div>
            );

            return typeof fallback === 'function'
                ? fallback({ error: this.state.errorInfo, reset: this.handleReset })
                : fallback;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
