import Head from 'next/head';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Me | My Portfolio</title>
        <meta name="description" content="Learn more about Omar, a web developer with experience in building dynamic and responsive web applications. Specializing in [technologies], Omar has worked on [mention projects]." />
      </Head>

      <section className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">About Me</h1>
        <div className="flex space-x-6">
          <img src="/path-to-photo.jpg" alt="Omar" className="rounded-full w-32 h-32" />
          <div>
            <p>
              Hello! I’m Omar, a web developer with experience in building dynamic and responsive web applications.
            </p>
            <p className="mt-4">
              I specialize in [list technologies] and have worked on [mention projects/experience].
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
