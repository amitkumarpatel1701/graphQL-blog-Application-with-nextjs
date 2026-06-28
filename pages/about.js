import Head from "next/head";

const About = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>About — Dynamic Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About This Blog</h1>

        <p className="text-gray-700 leading-relaxed mb-4">
          Dynamic Blog is a small corner of the internet dedicated to exploring modern web
          development, with a focus on the GraphQL ecosystem, Next.js, and the Jamstack
          architecture that powers many of today's fastest sites.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          The project started as a way to stitch together a headless CMS (Hygraph, formerly
          GraphCMS) with a statically-rendered frontend. Along the way it became a playground
          for experimenting with offline-first patterns, image loading strategies, and the
          tradeoffs between mock data and live APIs.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          When I'm not writing here, I'm usually tinkering with side projects, contributing to
          open-source tooling, or trying to keep up with the pace of change in the JavaScript
          ecosystem. I believe the best way to learn something is to build something real and
          then write about what surprised you.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-3">What You'll Find Here</h2>

        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Walkthroughs of full-stack GraphQL patterns</li>
          <li>Notes on Next.js, both the Pages Router and the App Router</li>
          <li>Lessons learned from shipping side projects end-to-end</li>
          <li>Occasional detours into design, tooling, and developer experience</li>
        </ul>

        <p className="text-gray-700 leading-relaxed">
          Thanks for stopping by. If something here sparks a thought or a question, don't
          hesitate to reach out.
        </p>
      </div>
    </div>
  );
};

export default About;
