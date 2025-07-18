// src/components/errors/ErrorBoundary.jsx
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-3xl font-bold text-[#d5b56e]">Something went wrong.</h1>
          <p className="text-lg mt-2">Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
