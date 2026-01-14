import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#121212] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <nav className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-white/60 hover:text-white transition-colors">
                            ← Back to Site
                        </Link>
                        <span className="text-white/20">|</span>
                        <Link href="/admin" className="font-bold text-xl hover:text-purple-400 transition-colors">
                            Admin Dashboard
                        </Link>
                    </div>
                </nav>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
