'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProjectFormProps {
    initialData?: {
        title: string;
        category: string;
        description: string;
        color: string;
        imageUrl?: string;
    };
    onSubmit: (data: any) => Promise<void>;
    submitLabel: string;
    isSubmitting?: boolean;
}

export default function ProjectForm({
    initialData = { title: '', category: '', description: '', color: 'from-orange-500 to-pink-500', imageUrl: '' },
    onSubmit,
    submitLabel,
    isSubmitting = false
}: ProjectFormProps) {
    const [formData, setFormData] = useState(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                    placeholder="e.g., Neon Horizon"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                    placeholder="e.g., WebGL Experience"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 rounded bg-white/10 border border-white/20 h-32 focus:outline-none focus:border-orange-500"
                    placeholder="Describe your project..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Image URL (Optional)</label>
                <input
                    type="url"
                    value={(formData as any).imageUrl || ''}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value } as any)}
                    className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500"
                    placeholder="https://example.com/image.jpg"
                />
                {(formData as any).imageUrl && (
                    <div className="mt-2">
                        <img
                            src={(formData as any).imageUrl}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Gradient Color</label>
                <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full p-3 rounded bg-white/10 border border-white/20 bg-[#1a1a1a] focus:outline-none focus:border-orange-500"
                >
                    <option value="from-orange-500 to-amber-500">Orange to Amber</option>
                    <option value="from-pink-500 to-rose-500">Pink to Rose</option>
                    <option value="from-indigo-500 to-blue-500">Indigo to Blue</option>
                    <option value="from-orange-500 to-pink-500">Orange to Pink (Hero Gradient)</option>
                    <option value="from-emerald-500 to-teal-500">Emerald to Teal</option>
                </select>
                <div className={`mt-2 h-20 rounded bg-gradient-to-r ${formData.color}`} />
            </div>

            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-500 px-6 py-3 rounded hover:bg-green-600 disabled:opacity-50 font-medium transition-colors"
                >
                    {isSubmitting ? 'Saving...' : submitLabel}
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
