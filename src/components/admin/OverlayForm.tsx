'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateOverlayContent } from '@/actions/overlay';
import type { OverlayContent } from '@/types';

export default function OverlayForm({ initialContent }: { initialContent: OverlayContent }) {
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState<OverlayContent>(initialContent);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const result = await updateOverlayContent(formData);
            if (result.success) {
                alert('Overlay content updated successfully!');
                router.push('/admin');
                router.refresh();
            } else {
                alert(result.error || 'Error updating overlay content');
            }
        } catch (error: any) {
            alert(error.message || 'Error updating overlay content');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Intro Section */}
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h2 className="text-2xl font-bold mb-4">Intro</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Title Line 1</label>
                        <input
                            type="text"
                            required
                            value={formData.introTitle1}
                            onChange={(e) => setFormData({ ...formData, introTitle1: e.target.value })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Title Line 2</label>
                        <input
                            type="text"
                            required
                            value={formData.introTitle2}
                            onChange={(e) => setFormData({ ...formData, introTitle2: e.target.value })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <input
                            type="text"
                            required
                            value={formData.introRole}
                            onChange={(e) => setFormData({ ...formData, introRole: e.target.value })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div>
            </div>

            {/* Craft Section */}
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h2 className="text-2xl font-bold mb-4">Craft Tagline</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Prefix</label>
                        <input
                            type="text"
                            value={formData.craftPrefix}
                            onChange={(e) => setFormData({ ...formData, craftPrefix: e.target.value })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Highlight</label>
                        <input
                            type="text"
                            value={formData.craftHighlight}
                            onChange={(e) => setFormData({ ...formData, craftHighlight: e.target.value })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Suffix</label>
                        <input
                            type="text"
                            value={formData.craftSuffix}
                            onChange={(e) => setFormData({ ...formData, craftSuffix: e.target.value })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div>
            </div>

            {/* Vision Section */}
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h2 className="text-2xl font-bold mb-4">Vision Tagline</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Prefix</label>
                        <input
                            type="text"
                            value={formData.visionPrefix}
                            onChange={(e) => setFormData({ ...formData, visionPrefix: e.target.value })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Highlight</label>
                        <input
                            type="text"
                            value={formData.visionHighlight}
                            onChange={(e) => setFormData({ ...formData, visionHighlight: e.target.value })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Suffix</label>
                        <input
                            type="text"
                            value={formData.visionSuffix}
                            onChange={(e) => setFormData({ ...formData, visionSuffix: e.target.value })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-green-500 px-6 py-3 rounded hover:bg-green-600 disabled:opacity-50 font-medium transition-colors"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <Link href="/admin">
                    <button type="button" className="bg-gray-500 px-6 py-3 rounded hover:bg-gray-600 font-medium transition-colors">
                        Cancel
                    </button>
                </Link>
            </div>
        </form>
    );
}
