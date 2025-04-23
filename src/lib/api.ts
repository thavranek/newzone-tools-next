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