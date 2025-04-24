import Image from 'next/image';
import { fetchAiTools } from '@/lib/api';
import Link from 'next/link';
import ToolMetaChips from '@/components/ToolMetaChips';

type WPFeaturedMedia = {
  source_url: string;
  // Add any other properties you use from the media object
};

type AiTool = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  acf?: {
    price?: string;
    use_case?: string;
  };
  _embedded?: { 'wp:featuredmedia'?: WPFeaturedMedia[] };
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
};

export default async function HomePage({ searchParams }: Props) {
  let aiTools: AiTool[] = [];
  try {
    aiTools = await fetchAiTools();
  } catch (error) {
    console.error(error);
    return <div>Failed to load tools.</div>;
  }

  const useCases = Array.from(
    new Set(aiTools.map(tool => tool.acf?.use_case).filter(Boolean))
  ) as string[];

  const { use_case } = searchParams;
  const selectedUseCase = typeof use_case === 'string' ? use_case : null;

  const filteredTools = selectedUseCase
    ? aiTools.filter(tool => tool.acf?.use_case === selectedUseCase)
    : aiTools;

  return (
    <main className="max-w-6xl mx-auto p-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {filteredTools.map(tool => {
          const featuredMedia = tool._embedded?.['wp:featuredmedia']?.[0];
          const thumbnail = featuredMedia?.source_url;
          return (
            <div
              key={tool.id}
              className="bg-[#626262] rounded-2xl shadow-lg p-5 flex flex-col w-full hover:shadow-xl transition"
              style={{ minHeight: 360 }}
            >
              <Link
                href={`/ai_tools/${tool.slug}`}
                className="flex-1 flex flex-col"
                tabIndex={-1}
                style={{ textDecoration: 'none' }}
              >
                {thumbnail && (
                  <Image
                    src={thumbnail}
                    alt={tool.title.rendered}
                    width={400}
                    height={180}
                    className="rounded-lg mb-4 object-cover w-full aspect-[4/2]"
                  />
                )}
                <h2 className="text-2xl font-bold mb-2 text-white">{tool.title.rendered}</h2>
                {tool.excerpt?.rendered && (
                  <p
                    className="text-gray-300 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: tool.excerpt.rendered }}
                    suppressHydrationWarning={true}
                  />
                )}
              </Link>
              <div className="mt-auto flex gap-3">
                <ToolMetaChips price={tool.acf?.price} useCase={tool.acf?.use_case} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}