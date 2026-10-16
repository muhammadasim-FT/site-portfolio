const projects = [
  {
    id: "wine-dine",
    title: "Wine Dine",
    category: "( Trailer )",
    counter: "1",
    image: "lumenis-project-wine",
    mainImage: "lumenis-project-wine-main",
    alt: "Autumn solitude cyclist",
  },
  {
    id: "lonely-car",
    title: "Lonely Car",
    category: "( Animation )",
    counter: "2",
    image: "lumenis-project-car",
    mainImage: "lumenis-project-car-main",
    alt: "Beachside gathering",
  },
  {
    id: "futuristic",
    title: "Futuristic",
    category: "( Movie )",
    counter: "3",
    image: "lumenis-project-future",
    mainImage: "lumenis-project-future-main",
    alt: "Man in vintage car",
  },
  {
    id: "drama-fabric",
    title: "Drama Fabric",
    category: "( Trailer )",
    counter: "4",
    image: "lumenis-project-drama",
    mainImage: "lumenis-project-drama-main",
    alt: "Futuristic bike ride",
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
                      <h1 className="h4-style">Digital Experiences Selected Works.</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fade-in-on-scroll mt-6">
                <p className="max-w-lg text-[15px] leading-relaxed text-neutral-600">
                  Lorem ipsum dolor sit amet consectetur. Ullamcorper amet diam duis lacus ut
                  tincidunt vel mauris. Elementum tortor elit nisi viverra purus. Quam lacus;
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
                            <p className="paragraph-title text-white">Discover More</p>
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
