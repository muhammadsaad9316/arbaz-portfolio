import { getOverlayContent } from '@/actions/overlay';
import OverlayForm from '@/components/admin/OverlayForm';

export const dynamic = 'force-dynamic';

export default async function OverlayEditorPage() {
    const content = await getOverlayContent();

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Edit Hero Section</h1>
            <OverlayForm initialContent={content} />
        </div>
    );
}
