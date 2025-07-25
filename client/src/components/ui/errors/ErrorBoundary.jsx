import { Component } from "react";
import { Link } from "react-router-dom";

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
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="bg-black/80 backdrop-blur-md border border-[#d5b56e]/30 rounded-xl p-8 sm:p-10 text-center max-w-md w-full">
            <div className="text-6xl text-[#d5b56e] mb-4">⚠️</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#d5b56e] mb-4">
              Something Went Wrong
            </h1>
            <p className="text-white/80 mb-6">
              We've encountered an unexpected error. Please try again later.
            </p>
            <div className="h-1 w-20 bg-[#d5b56e] mx-auto mb-6"></div>
            <Link
              to="/"
              className="inline-block bg-[#d5b56e] hover:bg-[#c19a3d] text-black font-bold py-2 px-6 rounded transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}