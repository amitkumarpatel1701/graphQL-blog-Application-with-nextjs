import Head from "next/head";

const Profile = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Profile — Dynamic Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
            AK
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Amit Kumar Patel</h1>
            <p className="text-gray-600">Full-stack developer · GraphQL enthusiast</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            I build web applications end-to-end, with a soft spot for the layer where APIs meet
            the frontend. Most of my recent work sits at the intersection of GraphQL, Next.js,
            and headless CMS platforms like Hygraph.
          </p>

          <p>
            I care about shipping small, focused experiments and iterating on them in public.
            This blog is part of that practice — a place to document what I'm learning while the
            ideas are still fresh.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Skills & Tools</h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "GraphQL",
            "Node.js",
            "Tailwind CSS",
            "Hygraph",
            "PostgreSQL",
            "Docker",
          ].map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">Where to Find Me</h2>

        <ul className="space-y-2 text-gray-700">
          <li>
            <span className="font-medium">GitHub:</span>{" "}
            <a className="text-blue-600 hover:underline" href="#">github.com/amitkumarpatel1701</a>
          </li>
          <li>
            <span className="font-medium">LinkedIn:</span>{" "}
            <a className="text-blue-600 hover:underline" href="#">linkedin.com/in/amitkumarpatel1701</a>
          </li>
          <li>
            <span className="font-medium">Email:</span>{" "}
            <a className="text-blue-600 hover:underline" href="mailto:amit@example.com">amit@example.com</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
