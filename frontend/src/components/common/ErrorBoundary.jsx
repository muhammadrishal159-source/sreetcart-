import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[StreetCart Error Boundary caught]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6 text-slate-900 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-slate-900">Something went wrong</h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering error occurred. Please reload the page.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-md cursor-pointer transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload StreetCart</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
