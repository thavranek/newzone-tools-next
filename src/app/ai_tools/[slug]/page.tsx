import { fetchAiToolBySlug } from '@/lib/api';
import Image from 'next/image';

type Props = {
  params: { slug: string };
};

export default async function ToolDetailPage({ params }: Props) {
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
          width={300}
          height={300}
          className="rounded mb-4"
        />
      )}
      <p className="mb-4 text-gray-600">
        <strong>Price:</strong> {tool.acf?.price ?? 'N/A'}
      </p>
      <p className="text-gray-600 mb-2">
                <strong>Use Case:</strong> {tool.acf?.use_case ?? 'N/A'}
              </p>
              <article
                className="tool-article-content"
                dangerouslySetInnerHTML={{ __html: tool.content.rendered }}
              />
    </main>
  );
}