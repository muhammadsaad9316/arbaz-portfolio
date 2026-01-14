'use client';

import { useEffect } from 'react';

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center">
            <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
            <p className="text-white/60">{error.message || 'An unexpected error occurred.'}</p>
            <button
                onClick={() => reset()}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
