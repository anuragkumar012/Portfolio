import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  const services = [
    { id: "01", title: "Artificial Intelligence" },
    { id: "02", title: "Data Science" },
    { id: "03", title: "Data Engineering" },
    { id: "04", title: "Cloud & Deployment" },
    { id: "05", title: "Full Stack Development" },
  ];

  return (
    <main className="portfolio-frame">
      <div className="ambient-glow" />

      <Header />

      {/* Hero Section */}
      <div className="hero-content">
        <div className="hero-image-container">
          <Image
            src="/profile.png"
            alt="Anurag Kumar"
            width={600}
            height={600}
            className="hero-image"
            priority
          />
        </div>

        {/* Foreground Content  */}
        <div className="hero-main-row">
          <div className="hero-text-block">
            <span className="hero-intro">Hey&apos; I Am</span>
            <h1 className="hero-title">
              <span>Anurag</span>
              <span>Kumar</span>
            </h1>
          </div>

          {/* Description & Action block */}
          <div className="hero-desc-block">
            <p className="hero-paragraph">
              Portfolio of Anurag — Data Scientist & AI Engineer building intelligent systems, computer vision solutions, and scalable data-driven applications.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Service Badges */}
      <footer className="services-footer">
        {services.map((service) => (
          <div key={service.id} className="service-item">
            <div className="service-number-row">
              <span className="service-accent" />
              <span>{service.id}</span>
            </div>
            <span className="service-title">{service.title}</span>
          </div>
        ))}
      </footer>
    </main>
  );
}
