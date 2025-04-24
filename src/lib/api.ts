// src/lib/api.ts
export async function fetchAiTools() {
    const res = await fetch('https://newzone.audio/wp-json/wp/v2/ai_tools?_embed');
    if (!res.ok) throw new Error('Failed to fetch AI Tools');
    return res.json();
  }

// src/lib/api.ts
export async function fetchAiToolBySlug(slug: string) {
    const res = await fetch(
      `https://newzone.audio/wp-json/wp/v2/ai_tools?slug=${slug}&_embed`
    );
    if (!res.ok) throw new Error('Failed to fetch AI Tool');
    const items = await res.json();
    return items[0] || null;
  }

  export async function fetchRecentAiTools(limit = 5) {
    const res = await fetch(
      `https://newzone.audio/wp-json/wp/v2/ai_tools?per_page=${limit}&orderby=date&order=desc&_embed`
    );
    if (!res.ok) throw new Error('Failed to fetch recent AI Tools');
    return res.json();
  }

  export async function fetchBlogPosts(limit: number = 9) {
    const res = await fetch(
      `https://newzone.audio/wp-json/wp/v2/posts?_embed&per_page=${limit}`,
      { next: { revalidate: 60 } } // for ISR if using Next.js App Router
    );
    if (!res.ok) throw new Error('Failed to fetch blog posts');
    return res.json();
  }

  export async function fetchBlogPostBySlug(slug: string) {
    const res = await fetch(
      `https://newzone.audio/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
    if (!res.ok) throw new Error('Failed to fetch post');
    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;
  }