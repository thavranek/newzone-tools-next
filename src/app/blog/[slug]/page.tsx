import { fetchBlogPostBySlug } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

type WPFeaturedMedia = {
  source_url: string;
  // add more fields if needed
};

type WPAuthor = {
  name: string;
  // add more fields if needed
};

type WPPost = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: { 
    'wp:featuredmedia'?: WPFeaturedMedia[]; 
    author?: WPAuthor[]; 
  };
};

type Props = {
  params: { slug: string };
};

export default async function BlogPostPage({ params }: Props) {
  const post: WPPost | null = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    return (
      <main className="max-w-2xl mx-auto p-4 text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-[#6251F0] underline">
          Back to Blog
        </Link>
      </main>
    );
  }

  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const imageUrl = media?.source_url;
  const author = post._embedded?.author?.[0]?.name;

  return (
    <main className="max-w-2xl mx-auto p-4">
      <Link href="/blog" className="text-[#6251F0] underline mb-4 inline-block">
        &larr; Back to Blog
      </Link>
      {imageUrl && (
        <div className="w-full mb-6">
          <Image
            src={imageUrl}
            alt={post.title.rendered}
            width={800}
            height={450}
            className="rounded w-full h-auto object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2 text-white">{post.title.rendered}</h1>
      <div className="text-gray-400 mb-8">
        <span>
          {author && <>By {author} &ndash; </>}
          {new Date(post.date).toLocaleDateString()}
        </span>
      </div>
      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </main>
  );
}