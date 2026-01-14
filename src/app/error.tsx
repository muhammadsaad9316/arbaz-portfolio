'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Something went wrong!</h2>
            <div className="bg-neutral-900 p-4 rounded-md mb-6 max-w-lg w-full overflow-auto border border-neutral-800">
                <p className="text-sm font-mono text-neutral-300">
                    {error.message || "An unexpected error occurred"}
                </p>
                {error.digest && (
                    <p className="text-xs text-neutral-500 mt-2">Digest: {error.digest}</p>
                )}
            </div>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
