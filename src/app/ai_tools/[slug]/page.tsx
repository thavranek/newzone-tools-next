import { fetchAiToolBySlug } from '@/lib/api';
import Image from 'next/image';
import ToolMetaChips from '@/components/ToolMetaChips';
import SidebarRecentTools from '@/components/SidebarRecentTools';

export default async function ToolDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const tool = await fetchAiToolBySlug(slug);

  if (!tool) {
    return <div>Tool not found.</div>;
  }

  const featuredMedia = tool._embedded?.['wp:featuredmedia']?.[0];
  const thumbnail = featuredMedia?.source_url ?? '';

  return (
    <main className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        {/* Main content */}
        <h1 className="text-2xl text-white font-bold mb-4">
          {tool.title.rendered}
        </h1>

        {thumbnail && (
          <Image
            src={thumbnail}
            alt={tool.title.rendered}
            width={700}
            height={700}
            className="rounded mb-4"
          />
        )}

        <ToolMetaChips
          price={tool.acf?.price}
          useCase={tool.acf?.use_case}
        />

        <article
          className="tool-article-content"
          dangerouslySetInnerHTML={{ __html: tool.content.rendered }}
        />
      </div>

      <SidebarRecentTools />
    </main>
  );
}