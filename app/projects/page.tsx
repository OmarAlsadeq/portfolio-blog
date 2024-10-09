import ProjectCard from '@/components/ProjectCard';

const ProjectsPage = () => {
  // Sample project data; replace this with actual data from your database or file.
  const projects = [
    {
      title: 'My First Project',
      description: 'This is a brief description of my first project.',
      imageUrl: '/path/to/image1.jpg', // Replace with actual image path
      link: 'https://example.com/project1',
    },
    {
      title: 'My Second Project',
      description: 'This is a brief description of my second project.',
      imageUrl: '/path/to/image2.jpg', // Replace with actual image path
      link: 'https://example.com/project2',
    },
  ];

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
