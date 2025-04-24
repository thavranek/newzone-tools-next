import Link from 'next/link';
import Image from 'next/image';
import { fetchBlogPosts } from '@/lib/api'; // update path as needed

type WPFeaturedMedia = {
  source_url: string;
  // Add other properties if needed
};

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: { 'wp:featuredmedia'?: WPFeaturedMedia[] };
};

export default async function BlogPage() {
  const posts: WPPost[] = await fetchBlogPosts();

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => {
          const media = post._embedded?.['wp:featuredmedia']?.[0];
          const imageUrl = media?.source_url;
          return (
            <div key={post.id} className="bg-[#232323] rounded-lg shadow p-4 flex flex-col border border-[#6251F0]">
              <Link href={`/blog/${post.slug}`} className="block w-full aspect-[16/9] relative rounded overflow-hidden mb-4">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={post.title.rendered}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
              </Link>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 hover:text-[#6251F0] transition">
                  {post.title.rendered}
                </h2>
              </Link>
              <div
                className="text-gray-300 mb-4 text-base line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <Link
                href={`/blog/${post.slug}`}
                className="mt-auto px-4 py-2 bg-[#6251F0] text-white rounded text-sm font-bold hover:bg-[#4634b7] transition self-start"
              >
                Read More
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}