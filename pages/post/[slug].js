import { getPosts } from '@/services';

// Detail page for a single post. The CMS only stores title/excerpt/metadata,
// so the body content here is placeholder lorem ipsum text.
const PostDetail = ({ post }) => {
  if (!post) {
    return (
      <div className="container mx-auto px-10 mb-8">
        <p className="text-white text-center">Post not found.</p>
      </div>
    );
  }

  const {
    title,
    excerpt,
    createdAt,
    featureImage,
    author,
    categories,
  } = post;

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="relative shadow-lg pb-80 mb-6">
        <img
          src={featureImage?.url}
          alt={title}
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-lg"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
        <div className="relative mb-8">
          <div className="absolute w-full h-full rounded-lg bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-center text-3xl lg:text-5xl font-semibold text-white px-4">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-center mb-8 px-4 lg:px-20">
          <div className="flex items-center justify-center mr-8">
            <img
              unoptimized
              alt={author?.name}
              height="30"
              width="30"
              className="align-middle rounded-full"
              src={author?.photo?.url}
            />
            <p className="inline align-middle text-gray-700 dark:text-gray-300 ml-2 font-medium text-lg">
              {author?.name}
            </p>
          </div>
          <div className="font-medium text-gray-700 dark:text-gray-300">
            <span>{new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}</span>
          </div>
        </div>

        {categories?.length > 0 && (
          <div className="flex justify-center mb-8">
            {categories.map((category) => (
              <span
                key={category.slug}
                className="mx-2 bg-pink-600 text-white text-sm font-medium px-4 py-1 rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        <div className="px-4 lg:px-20">
          <p className="text-lg text-gray-700 dark:text-gray-300 font-normal mb-8">{excerpt}</p>

          <h2 className="text-2xl font-semibold mb-4">Lorem Ipsum</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-normal mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-normal mb-8">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-normal mb-8">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
            sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
            dolor sit amet, consectetur, adipisci velit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

export async function getStaticProps({ params }) {
  const posts = (await getPosts()) || [];
  const post = posts.find((edge) => edge.node.slug === params.slug)?.node;

  return {
    props: {
      post: post || null,
    },
  };
}

export async function getStaticPaths() {
  const posts = (await getPosts()) || [];
  const paths = posts.map((edge) => ({
    params: { slug: edge.node.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
