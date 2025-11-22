// components/ErrorBoundaryClient.tsx
"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = { hasError: boolean; error?: Error };

export default class ErrorBoundaryClient extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    // log to console or an error collector
    console.error("Client ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return <>{this.props.fallback}</>;
      return (
        <div className="p-6 bg-white rounded shadow text-red-600">
          <h3 className="font-semibold">An unexpected error occurred.</h3>
          <pre className="text-xs mt-2">{String(this.state.error?.message)}</pre>
          <div className="mt-3">
            <button className="px-3 py-1 rounded bg-slate-100" onClick={() => location.reload()}>
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
