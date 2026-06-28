// ----------------------------------------------------------------------------
// Local mock data — the CMS is bypassed entirely so the app runs offline.
// The shapes match exactly what the components expect, so no other file
// needs to change. Export names are kept identical to the original CMS
// fetchers (getPosts, getRecentPost, getSimiliarPosts, getCategories).
// ----------------------------------------------------------------------------

const authors = [
  {
    id: 'author-1',
    name: 'Jane Doe',
    bio: 'Frontend developer and technical writer who loves React and GraphQL.',
    photo: { url: 'https://picsum.photos/seed/jane/100/100' },
  },
  {
    id: 'author-2',
    name: 'John Smith',
    bio: 'Full-stack engineer blogging about web performance and developer tools.',
    photo: { url: 'https://picsum.photos/seed/john/100/100' },
  },
  {
    id: 'author-3',
    name: 'Alex Lee',
    bio: 'Designer turned developer, focused on CSS and accessible UI.',
    photo: { url: 'https://picsum.photos/seed/alex/100/100' },
  },
];

const categories = [
  { name: 'React', slug: 'react' },
  { name: 'GraphQL', slug: 'graphql' },
  { name: 'Web Development', slug: 'web-development' },
];

const posts = [
  {
    title: 'Getting Started with Next.js 13',
    slug: 'getting-started-with-nextjs-13',
    excerpt:
      'A beginner-friendly guide to building modern web applications with Next.js 13, covering the Pages Router, static generation, and more.',
    createdAt: '2026-06-25T10:30:00.000Z',
    featureImage: { url: 'https://picsum.photos/seed/nextjs/800/400' },
    author: authors[0],
    categories: [categories[0], categories[2]],
  },
  {
    title: 'Why GraphQL Beats REST for Complex Apps',
    slug: 'why-graphql-beats-rest',
    excerpt:
      'Explore how GraphQL gives clients exactly the data they need, reduces over-fetching, and simplifies evolving your API over time.',
    createdAt: '2026-06-20T14:15:00.000Z',
    featureImage: { url: 'https://picsum.photos/seed/graphql/800/400' },
    author: authors[1],
    categories: [categories[1], categories[2]],
  },
  {
    title: 'Styling at Scale with Tailwind CSS',
    slug: 'styling-at-scale-with-tailwind',
    excerpt:
      'How utility-first CSS with Tailwind can speed up UI development, keep styles consistent, and pair well with component frameworks.',
    createdAt: '2026-06-15T09:00:00.000Z',
    featureImage: { url: 'https://picsum.photos/seed/tailwind/800/400' },
    author: authors[2],
    categories: [categories[2]],
  },
  {
    title: 'Static Generation vs Server-Side Rendering',
    slug: 'ssg-vs-ssr',
    excerpt:
      'When should you pre-render at build time and when should you render on each request? A practical comparison for Next.js apps.',
    createdAt: '2026-06-10T16:45:00.000Z',
    featureImage: { url: 'https://picsum.photos/seed/rendering/800/400' },
    author: authors[0],
    categories: [categories[0]],
  },
  {
    title: 'Building a Blog with a Headless CMS',
    slug: 'building-a-blog-with-a-headless-cms',
    excerpt:
      'Step-by-step: connect a headless CMS to a Next.js frontend, model your content, and deploy a fully static blog.',
    createdAt: '2026-06-05T11:20:00.000Z',
    featureImage: { url: 'https://picsum.photos/seed/cms/800/400' },
    author: authors[1],
    categories: [categories[1], categories[2]],
  },
];

// Shape matches the original GraphQL response: { postsConnection: { edges: [{ cursor, node }] } }
export const getPosts = async () =>
  posts.map((node, index) => ({ node, cursor: `mock-cursor-${index}` }));

// Shape matches the original: posts(last: 3) ordered by createdAt_ASC
export const getRecentPost = async () => posts.slice(0, 3);

// Shape matches the original: related posts (same fields as getRecentPost)
export const getSimiliarPosts = async () => posts.slice(0, 3);

// Shape matches the original: [{ name, slug }]
export const getCategories = async () => categories;
