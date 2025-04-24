import Image from 'next/image';
import { fetchAiTools } from '@/lib/api';
import Link from 'next/link';

type AiTool = {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: {
    price?: string;
    use_case?: string;
  };
  _embedded?: { 'wp:featuredmedia'?: any[] };
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
};

export default async function HomePage({ searchParams }: Props) {
  let aiTools: AiTool[] = [];
  try {
    aiTools = await fetchAiTools();
  } catch (error) {
    return <div>Failed to load tools.</div>;
  }

  const useCases = Array.from(
    new Set(aiTools.map(tool => tool.acf?.use_case).filter(Boolean))
  ) as string[];

  const selectedUseCase =
    typeof searchParams?.use_case === 'string' ? searchParams.use_case : null;

  const filteredTools = selectedUseCase
    ? aiTools.filter(tool => tool.acf?.use_case === selectedUseCase)
    : aiTools;

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center mb-8 mt-2">
      <h1
        style={{
          color: '#FFFFFF',
          fontFamily: '"Sarabun", Sans-serif',
          fontSize: '32px',
          fontWeight: 800,
          fontStyle: 'italic',
        }}
        className="mb-12 text-center"
      >
        All Audio AI Tools - In One Place
      </h1>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className={`px-4 py-2 rounded border font-bold transition ${
            !selectedUseCase
              ? 'bg-[#6251F0] text-white border-[#6251F0]'
              : 'bg-white text-[#6251F0] border-[#6251F0]'
          }`}
        >
          All
        </Link>
        {useCases.map(useCase => (
          <Link
            key={useCase}
            href={`/?use_case=${encodeURIComponent(useCase)}`}
            className={`px-4 py-2 rounded border font-bold transition ${
              selectedUseCase === useCase
                ? 'bg-[#6251F0] text-white border-[#6251F0]'
                : 'bg-white text-[#6251F0] border-[#6251F0]'
            }`}
          >
            {useCase}
          </Link>
        ))}
      </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTools.length === 0 && (
          <p className="col-span-full text-center text-gray-600">
            No tools found for this category.
          </p>
        )}
        {filteredTools.map(tool => {
          const featuredMedia = tool._embedded?.['wp:featuredmedia']?.[0];
          const thumbnail = featuredMedia?.source_url;
          return (
            <Link
              key={tool.id}
              href={`/ai_tools/${tool.slug}`}
              className="rounded shadow p-4 flex flex-col bg-white hover:bg-gray-50 transition"
            >
              {thumbnail && (
                <Image
                  src={thumbnail}
                  alt={tool.title.rendered}
                  width={200}
                  height={120}
                  className="rounded mb-3 object-cover w-full aspect-[5/3]"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{tool.title.rendered}</h2>
              <p className="text-gray-600 mb-2">
                <strong>Price:</strong> {tool.acf?.price ?? 'N/A'}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Use Case:</strong> {tool.acf?.use_case ?? 'N/A'}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}