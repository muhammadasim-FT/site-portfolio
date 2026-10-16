const projects = [
  {
    id: "task-engine",
    title: "Task Engine",
    category: "( Full-Stack )",
    counter: "1",
    image: "lumenis-project-wine",
    mainImage: "lumenis-project-wine-main",
    alt: "Distributed task queue dashboard",
  },
  {
    id: "realtime-collar",
    title: "Realtime Collar",
    category: "( WebSocket )",
    counter: "2",
    image: "lumenis-project-car",
    mainImage: "lumenis-project-car-main",
    alt: "Live data streaming visualization",
  },
  {
    id: "query-layer",
    title: "Query Layer",
    category: "( API )",
    counter: "3",
    image: "lumenis-project-future",
    mainImage: "lumenis-project-future-main",
    alt: "GraphQL API explorer interface",
  },
  {
    id: "pipeline",
    title: "Pipeline",
    category: "( DevOps )",
    counter: "4",
    image: "lumenis-project-drama",
    mainImage: "lumenis-project-drama-main",
    alt: "CI/CD pipeline status dashboard",
  },
];

export default function Projects() {
  return (
    <section className="section">
      <div className="section-spacing">
        <div className="container gray">
          <div className="section-inside">
            <div className="grid-title">
              <div className="grid-title-container">
                <div className="fade-in-on-scroll">
                  <p className="paragraph-title">projects</p>
                </div>
                <div className="title-animation mt-4">
                  <div className="heading-holder">
                    <div className="fade-in-on-scroll">
                      <h1 className="h4-style">Software I've Built.</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fade-in-on-scroll mt-6">
                <p className="max-w-lg text-[15px] leading-relaxed text-neutral-600">
                  A selection of systems I've designed, built, and deployed — from real-time
                  data pipelines to full-stack web applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="project-list-wrapper mt-16">
          <div className="project-list-container">
            {projects.map((project) => (
              <div key={project.id} role="listitem" className="project-list-item">
                <a href={`/project/${project.id}`} className="project-link-wrapper">
                  {/* Background image */}
                  <div className="project-image-holder">
                    <div className="overlay" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${project.image}/1600/900`}
                      alt={project.alt}
                      loading="lazy"
                      className="project-image"
                    />
                  </div>

                  <div className="container">
                    <div className="project-main-wrapper">
                      <div className="project-main">
                        <div className="project-title-holder">
                          <h1 className="diffrence">{project.title}</h1>
                        </div>
                        <div className="project-category-wrapper">
                          <p className="project-category-text">{project.category}</p>
                        </div>
                      </div>

                      <div className="project-main">
                        <div className="project-main-image-holderr">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://picsum.photos/seed/${project.mainImage}/800/600`}
                            alt={project.alt}
                            loading="lazy"
                            className="project-main-image"
                          />
                          <div className="discover">
                            <p className="paragraph-title text-white">View Project</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="project-counter-holder">
                      <span>{project.counter}</span>
                      <span>/</span>
                      <span>4</span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
