import { fetchAiToolBySlug } from '@/lib/api';
import Image from 'next/image';

export default async function ToolDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const tool = await fetchAiToolBySlug(params.slug);

  if (!tool) return <div>Tool not found.</div>;

  const featuredMedia = tool._embedded?.['wp:featuredmedia']?.[0];
  const thumbnail = featuredMedia?.source_url;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{tool.title.rendered}</h1>
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={tool.title.rendered}
          width={600}
          height={340}
          className="rounded mb-4"
        />
      )}
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: tool.content.rendered }}
      />
    </main>
  );
}