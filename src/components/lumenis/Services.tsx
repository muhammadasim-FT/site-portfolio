const services = [
  {
    name: "Full-Stack Development",
    image: "/assets/images/gallery/norms.jpg",
    alt: "Full-stack development workspace",
    description:
      "End-to-end product development from database design to deployed application. React, Next.js, Node.js, TypeScript, PostgreSQL, Prisma, GraphQL, REST APIs, authentication, real-time features.",
  },
  {
    name: "DevOps & Cloud Infrastructure",
    image: "/assets/images/gallery/serviceflow.jpg",
    alt: "Cloud infrastructure diagram",
    description:
      "Production-grade infrastructure on AWS/GCP. Kubernetes, Docker, Terraform, CI/CD pipelines, monitoring, logging, auto-scaling, disaster recovery, cost optimization.",
  },
  {
    name: "AI & LLM Integration",
    image: "/assets/images/gallery/saftai.jpg",
    alt: "AI pipeline architecture",
    description:
      "Multi-agent systems, RAG pipelines, LLM fine-tuning, vector databases, prompt engineering, LangChain, OpenAI/Anthropic APIs, semantic search, document processing, automated workflows.",
  },
  {
    name: "Web3 & Blockchain",
    image: "/assets/images/gallery/launhpad.jpg",
    alt: "Blockchain development",
    description:
      "Smart contracts (Solidity, Rust), DeFi protocols, NFT platforms, IDO launchpads, wallet integration, multi-chain deployment, IPFS, The Graph, Foundry, Hardhat, auditing.",
  },
];

export default function Services() {
  return (
    <section className="section">
      <div className="section-spacing">
        <div className="container">
          <div className="section-inside">
            <div className="grid-title">
              <div className="grid-title-container">
                <div className="fade-in-on-scroll">
                  <p className="paragraph-title">What I do</p>
                </div>
                <div className="title-animation mt-4">
                  <div className="heading-holder l">
                    <div className="fade-in-on-scroll">
                      <h1 className="h4-style">
                        I build end-to-end software solutions.
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fade-in-on-scroll mt-6">
                <p className="max-w-lg text-[15px] leading-relaxed text-neutral-600">
                  From database schema design to deployment pipelines — I handle the full lifecycle
                  of software development across web2 and web3.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky-services-holder mt-16">
          <div className="container">
            <div className="sticky-services">
              <div className="services">
                <div className="services-text-holder">
                  <div className="services-title">
                    <p className="paragraph-title white-text">Core competencies</p>
                  </div>
                  <div className="services-text-container">
                    {services.map((s) => (
                      <div key={s.name} className="services-text">
                        <div className="h2-style">{s.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="yellow-box spacings">
                  <p className="paragraph-title">Expertise</p>
                </div>
              </div>

              <div className="services-images-holder">
                {services.map((s) => (
                  <div key={s.name} className="overflow-hidden">
                    <div className="relative aspect-square bg-neutral-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.image}
                        alt={s.alt}
                        loading="lazy"
                        className="services-images"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}