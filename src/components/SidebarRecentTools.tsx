import Link from 'next/link';
import Image from 'next/image';
import { fetchRecentAiTools } from '@/lib/api';

type AiTool = {
  id: number;
  slug: string;
  title: { rendered: string };
  _embedded?: { 'wp:featuredmedia'?: any[] };
};

export default async function SidebarRecentTools() {
  const recentTools: AiTool[] = await fetchRecentAiTools(5);

  return (
    <aside className="w-full md:w-64 bg-[#232323] p-4 rounded-lg shadow mb-8 md:mb-0">
      <h3 className="text-xl font-bold text-white mb-4">Recent Additions</h3>
      <ul className="space-y-6">
        {recentTools.map((tool: AiTool) => {
          const featuredMedia = tool._embedded?.['wp:featuredmedia']?.[0];
          const thumbnail = featuredMedia?.source_url;
          return (
            <li
              key={tool.id}
              className="flex flex-col items-center bg-[#292929] rounded p-3 border border-white"
            >
              <Link
                href={`/ai_tools/${tool.slug}`}
                className="flex flex-col items-center w-full"
              >
                {/* IMAGE CONTAINER */}
                <div className="w-full aspect-[16/9] relative mb-2 rounded overflow-hidden">
                  {thumbnail && (
                    <Image
                      src={thumbnail}
                      alt={tool.title.rendered}
                      fill
                      className="object-cover"
                      sizes="(max-width: 320px) 100vw, 256px"
                      priority
                    />
                  )}
                </div>
                <span className="text-white text-lg font-semibold line-clamp-2 text-center mb-2">
                  {tool.title.rendered}
                </span>
              </Link>
              <Link
                href={`/ai_tools/${tool.slug}`}
                className="mt-1 px-4 py-1 bg-[#6251F0] text-white rounded text-sm font-bold hover:bg-[#4634b7] transition"
              >
                View
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}