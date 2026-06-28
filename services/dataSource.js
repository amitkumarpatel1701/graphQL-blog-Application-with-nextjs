import { request, gql } from 'graphql-request';

// ----------------------------------------------------------------------------
// Online/offline data-source toggle.
//
// Offline (mock) is the default. The toggle lives in the Header and persists
// the choice in localStorage under this key. Fetchers call `getDataSource()`
// at request time and branch between the local mock and the live CMS.
//
// This is a client-side, runtime toggle. Server-side `getStaticProps` that
// wants to honor it could read the same key from a cookie, but for now it
// only governs the client-side useEffect fetches (Header, Categories, PostWidget).
// ----------------------------------------------------------------------------

export const DATA_SOURCE_KEY = 'blogDataSource';

// 'mock' | 'cms'. Mock is the default so the app works fully offline.
export const DEFAULT_DATA_SOURCE = 'mock';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

function readStoredSource() {
  if (typeof window === 'undefined') return DEFAULT_DATA_SOURCE;
  return window.localStorage.getItem(DATA_SOURCE_KEY) || DEFAULT_DATA_SOURCE;
}

export const isOnline = () => readStoredSource() === 'cms';

// Lets the Header toggle reflect the current persisted choice on mount.
export const getDataSource = () => readStoredSource();

export const setDataSource = (source) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(DATA_SOURCE_KEY, source);
};

// ---- Original GraphQL queries, restored for online mode --------------------

export const graphql = {
  postsConnection: gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featureImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `,
  recentPosts: gql`
    query getPostDetails() {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featureImage { url }
        createdAt
        slug
      }
    }
  `,
  similarPosts: gql`
    query getPostDetails($slug: String!, $categories: [String]!) {
      posts(
        where: { $slug_not: $slug, AND: { categories_some: { $slug_in: $categories } } }
        last: 3
      ) {
        title
        featureImage { url }
        createdAt
        slug
      }
    }
  `,
  categories: gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `,
};

export const fetchFromCMS = {
  posts: async () => {
    const result = await request(graphqlAPI, graphql.postsConnection);
    return result.postsConnection.edges;
  },
  recentPosts: async () => {
    const result = await request(graphqlAPI, graphql.recentPosts);
    return result.posts;
  },
  similarPosts: async (slug, categories) => {
    const result = await request(graphqlAPI, graphql.similarPosts, {
      slug,
      categories,
    });
    return result.posts;
  },
  categories: async () => {
    const result = await request(graphqlAPI, graphql.categories);
    return result.categories;
  },
};
