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
            await updateOverlayContent(formData);
            alert('Overlay content updated successfully!');
            router.push('/admin');
            router.refresh();
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
                            value={formData.intro.titleLine1}
                            onChange={(e) => setFormData({
                                ...formData,
                                intro: { ...formData.intro, titleLine1: e.target.value }
                            })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Title Line 2</label>
                        <input
                            type="text"
                            required
                            value={formData.intro.titleLine2}
                            onChange={(e) => setFormData({
                                ...formData,
                                intro: { ...formData.intro, titleLine2: e.target.value }
                            })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <input
                            type="text"
                            required
                            value={formData.intro.role}
                            onChange={(e) => setFormData({
                                ...formData,
                                intro: { ...formData.intro, role: e.target.value }
                            })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500"
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
                            value={formData.craft.textPrefix}
                            onChange={(e) => setFormData({
                                ...formData,
                                craft: { ...formData.craft, textPrefix: e.target.value }
                            })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Highlight</label>
                        <input
                            type="text"
                            value={formData.craft.highlight}
                            onChange={(e) => setFormData({
                                ...formData,
                                craft: { ...formData.craft, highlight: e.target.value }
                            })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Suffix</label>
                        <input
                            type="text"
                            value={formData.craft.textSuffix}
                            onChange={(e) => setFormData({
                                ...formData,
                                craft: { ...formData.craft, textSuffix: e.target.value }
                            })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500"
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
                            value={formData.vision.textPrefix}
                            onChange={(e) => setFormData({
                                ...formData,
                                vision: { ...formData.vision, textPrefix: e.target.value }
                            })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Highlight</label>
                        <input
                            type="text"
                            value={formData.vision.highlight}
                            onChange={(e) => setFormData({
                                ...formData,
                                vision: { ...formData.vision, highlight: e.target.value }
                            })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Suffix</label>
                        <input
                            type="text"
                            value={formData.vision.textSuffix}
                            onChange={(e) => setFormData({
                                ...formData,
                                vision: { ...formData.vision, textSuffix: e.target.value }
                            })}
                            className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500"
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
