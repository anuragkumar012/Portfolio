"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { 
  ArrowUpRight, 
  Brain, 
  Database, 
  Layers, 
  Cloud, 
  Code,
  Terminal,
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  Server,
  Layout,
  CheckCircle2
} from "lucide-react";

// Types
interface Project {
  name: string;
  role: string;
}

interface Skill {
  name: string;
  level: number;
  levelText: string;
  desc: string;
  techs: string[];
  projects: Project[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  desc: string;
  skills: Skill[];
  subnodes: string[];
}

// Data Definition
const categoriesData: Category[] = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    icon: <Brain className="w-5 h-5 text-[#ff5722]" />,
    desc: "Building neural networks, computer vision, LLM architectures and prompt orchestration systems.",
    subnodes: ["LLMs", "RAG", "PyTorch", "OpenCV"],
    skills: [
      {
        name: "LLMs & RAG",
        level: 92,
        levelText: "Expert",
        desc: "Architecting retrieval-augmented generation pipelines using vector databases and LangChain for custom context reasoning.",
        techs: ["LangChain", "Vector DBs", "LlamaIndex", "HuggingFace", "OpenAI API"],
        projects: [
          { name: "InsightDocs AI Search", role: "NLP Research Developer" },
          { name: "SupportBot RAG Orchestrator", role: "Lead Developer" }
        ]
      },
      {
        name: "Computer Vision",
        level: 88,
        levelText: "Advanced",
        desc: "Object detection and tracking using YOLO models, image processing with OpenCV, and custom segmentation tasks.",
        techs: ["OpenCV", "YOLO v8", "PyTorch", "Albumentations", "TensorFlow"],
        projects: [
          { name: "Neural Vision Traffic Tracker", role: "Lead AI Engineer" },
          { name: "Autonomous Path Finder", role: "Robotics Specialist" }
        ]
      },
      {
        name: "Deep Learning",
        level: 85,
        levelText: "Advanced",
        desc: "Training convolutional and recurrent networks in PyTorch and TensorFlow for pattern recognition and regression.",
        techs: ["PyTorch", "TensorFlow", "Keras", "Weights & Biases", "CUDA"],
        projects: [
          { name: "Anomaly Detection Hub", role: "ML Researcher" }
        ]
      }
    ]
  },
  {
    id: "ds",
    name: "Data Science",
    icon: <Activity className="w-5 h-5 text-[#ff5722]" />,
    desc: "Extracting actionable insights, building predictive models, and running statistical hypotheses.",
    subnodes: ["Scikit-Learn", "Pandas", "Stats", "XGBoost"],
    skills: [
      {
        name: "Machine Learning",
        level: 95,
        levelText: "Expert",
        desc: "Supervised and unsupervised learning, ensemble models (XGBoost, Random Forests) and hyperparameter optimization.",
        techs: ["Scikit-Learn", "XGBoost", "LightGBM", "Optuna", "Imbalanced-learn"],
        projects: [
          { name: "Churn Prediction Engine", role: "Data Scientist" },
          { name: "Retail Demand Forecast Model", role: "ML Engineer" }
        ]
      },
      {
        name: "Exploratory Analysis",
        level: 90,
        levelText: "Expert",
        desc: "Data parsing, cleaning, feature engineering, and statistical analytics to formulate critical hypothesis tests.",
        techs: ["Pandas", "NumPy", "Scipy Stats", "Statsmodels", "Polars"],
        projects: [
          { name: "Clinical Trial Bio-Stats", role: "Analyst" }
        ]
      },
      {
        name: "Visual Analytics",
        level: 85,
        levelText: "Advanced",
        desc: "Creating rich, storytelling charts, interactive dashboards, and reporting metrics for stakeholders.",
        techs: ["Matplotlib", "Seaborn", "Plotly", "Tableau", "Streamlit"],
        projects: [
          { name: "Executive KPI Dashboard", role: "BI Developer" }
        ]
      }
    ]
  },
  {
    id: "de",
    name: "Data Engineering",
    icon: <Database className="w-5 h-5 text-[#ff5722]" />,
    desc: "Designing scalable database architectures, ETL pipelines, and high-throughput data processing workflows.",
    subnodes: ["Airflow", "Postgres", "Spark", "Kafka"],
    skills: [
      {
        name: "Pipeline Orchestration",
        level: 90,
        levelText: "Expert",
        desc: "Creating resilient ETL/ELT flows using Apache Airflow, dbt, and custom script architectures with automatic alerts.",
        techs: ["Apache Airflow", "dbt", "Prefect", "Python Shell", "Bash"],
        projects: [
          { name: "Enterprise Data Warehouse Sync", role: "ETL Specialist" },
          { name: "IoT Sensor Feed Ingestion", role: "Systems Developer" }
        ]
      },
      {
        name: "Relational & NoSQL",
        level: 88,
        levelText: "Advanced",
        desc: "Schema design, query optimization, indexing, partition keys, and replication in Postgres, MongoDB, and Redis.",
        techs: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "SQLAlchemy"],
        projects: [
          { name: "Real-time Clickstream Pipeline", role: "Data Architect" }
        ]
      },
      {
        name: "Big Data Processing",
        level: 82,
        levelText: "Advanced",
        desc: "Distributed processing of massive datasets using Apache Spark and stream message queues like Kafka.",
        techs: ["Apache Spark", "Apache Kafka", "PySpark", "AWS EMR", "Parquet"],
        projects: [
          { name: "Clickstream Behavioral Lakehouse", role: "Big Data Engineer" }
        ]
      }
    ]
  },
  {
    id: "cloud",
    name: "Cloud & Deployment",
    icon: <Cloud className="w-5 h-5 text-[#ff5722]" />,
    desc: "Configuring cloud infrastructure, container orchestration, and automated CI/CD deployment pipelines.",
    subnodes: ["AWS", "Docker", "CI/CD", "FastAPI"],
    skills: [
      {
        name: "AWS Cloud Services",
        level: 88,
        levelText: "Advanced",
        desc: "Resource provisioning, VPC management, security groups, IAM policies, S3 storage, and serverless Lambda computing.",
        techs: ["AWS EC2", "AWS S3", "AWS Lambda", "API Gateway", "AWS ECS"],
        projects: [
          { name: "CI/CD Pipeline Migration", role: "Cloud Consultant" }
        ]
      },
      {
        name: "Container Operations",
        level: 92,
        levelText: "Expert",
        desc: "Containerizing microservices using multi-stage Dockerfiles, managing compose stacks, and basic Kubernetes deployments.",
        techs: ["Docker", "Docker Compose", "Kubernetes", "EKS", "Container Registries"],
        projects: [
          { name: "Kubernetes Auto-scaling Cluster", role: "DevOps Engineer" }
        ]
      },
      {
        name: "Automated Deployments",
        level: 85,
        levelText: "Advanced",
        desc: "Automating testing pipelines, building artifacts, and deploying APIs securely to web servers.",
        techs: ["GitHub Actions", "Vercel", "Nginx", "FastAPI", "Gunicorn", "PM2"],
        projects: [
          { name: "HuggingFace API Deployment", role: "MLOps Engineer" }
        ]
      }
    ]
  },
  {
    id: "fs",
    name: "Full Stack Development",
    icon: <Code className="w-5 h-5 text-[#ff5722]" />,
    desc: "Designing modern responsive user interfaces, robust backend APIs, and database integrations.",
    subnodes: ["Next.js", "TS", "Node.js", "Tailwind"],
    skills: [
      {
        name: "Frontend Engineering",
        level: 90,
        levelText: "Expert",
        desc: "Creating fluid, responsive components using React, Next.js, TypeScript, and modern CSS/Tailwind layouts.",
        techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "CSS Grid/Flexbox"],
        projects: [
          { name: "AI Portfolio Dashboard", role: "Lead Frontend Dev" },
          { name: "Real-time Collaborative Workspace", role: "Full Stack Engineer" }
        ]
      },
      {
        name: "Backend API Design",
        level: 86,
        levelText: "Advanced",
        desc: "Developing scalable RESTful and GraphQL endpoints in Node.js, Express, and Python frameworks (FastAPI/Flask).",
        techs: ["Node.js", "Express.js", "FastAPI", "JWT Auth", "REST APIs", "GraphQL"],
        projects: [
          { name: "SaaS Subscription Backend", role: "Backend Architect" }
        ]
      },
      {
        name: "State Management",
        level: 88,
        levelText: "Advanced",
        desc: "Architecting complex client-side state, caching mechanisms, and server state synchronization.",
        techs: ["Redux Toolkit", "Zustand", "React Query", "SWR", "Context API"],
        projects: [
          { name: "Real-time Chat Portal", role: "Full Stack Engineer" }
        ]
      }
    ]
  }
];

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>(categoriesData[0]);
  const [activeSkill, setActiveSkill] = useState<Skill>(categoriesData[0].skills[0]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Sync active skill when category changes
  useEffect(() => {
    setActiveSkill(activeCategory.skills[0]);
  }, [activeCategory]);

  return (
    <main className="portfolio-frame">
      <div className="ambient-glow" />
      <Header />

      <div className="skills-container">
        {/* Left Interactive Graph Panel */}
        <div className="skills-interactive-panel">
          <div>
            <span className="skill-detail-category">Explore Anurag's Stack</span>
            <h2 className="hero-intro" style={{ fontSize: "1.8rem", fontWeight: "700", marginTop: "4px" }}>
              Interactive Skill Graph
            </h2>
            <p className="hero-paragraph" style={{ marginLeft: 0, marginTop: "8px", fontSize: "0.95rem", color: "var(--text-grey)", maxWidth: "100%" }}>
              Click on the domain circles inside the network to inspect core technologies, view live simulations, and explore relevant professional experience.
            </p>
          </div>

          {/* SVG Graph Visualizer */}
          <div className="relative justify-center">
            <SkillGraph 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory}
              hoveredNode={hoveredNode}
              setHoveredNode={setHoveredNode}
            />
          </div>

          {/* Fallback/Backup Category Tabs */}
          <div className="category-tabs">
            {categoriesData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat)}
                className={`tab-btn ${activeCategory.id === cat.id ? "active" : ""}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="skills-details-panel">
          {/* Main Info Card */}
          <div className="glass-card flex-col gap-6">
            <div>
              <div className="skill-detail-title-row">
                <span className="skill-detail-category">{activeCategory.name}</span>
                <span className="text-orange semibold text-sm bg-orange-subtle px-3 py-1 rounded-full border-orange-subtle">
                  {activeSkill.levelText}
                </span>
              </div>
              <h3 className="skill-detail-title">{activeSkill.name}</h3>
            </div>

            <p className="skill-detail-desc">{activeSkill.desc}</p>

            <div>
              <div className="flex-row-between mb-2">
                <span className="text-sm semibold text-white">Expertise Level</span>
                <span className="text-sm semibold text-orange">{activeSkill.level}%</span>
              </div>
              <div className="progress-container">
                <div 
                  className="progress-fill" 
                  style={{ width: `${activeSkill.level}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-sm semibold text-white block mb-3">Core Stack & Library Ecosystem</span>
              <div className="tech-badges-list">
                {activeSkill.techs.map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Associated Projects Section */}
          <div className="glass-card">
            <h4 className="projects-section-title">Projects Built with this Skill</h4>
            {activeSkill.projects && activeSkill.projects.length > 0 ? (
              <div className="skill-projects-list">
                {activeSkill.projects.map((proj, idx) => (
                  <a href="#works" key={idx} className="skill-project-item">
                    <div className="skill-project-info">
                      <span className="skill-project-name">{proj.name}</span>
                      <span className="skill-project-role">{proj.role}</span>
                    </div>
                    <ArrowUpRight size={16} className="skill-project-arrow" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-var(--text-dim) italic">Projects logged under primary system dashboard.</p>
            )}
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="glass-card">
            <h4 className="projects-section-title">Live Code Simulation Playground</h4>
            <InteractiveSandbox categoryId={activeCategory.id} />
          </div>

          {/* Skills Mini-Grid selector inside selected category */}
          <div className="glass-card">
            <h4 className="projects-section-title">Select Focus Skill</h4>
            <div className="skills-grid">
              {activeCategory.skills.map((skill) => (
                <div
                  key={skill.name}
                  onClick={() => setActiveSkill(skill)}
                  className={`skill-tag-card ${activeSkill.name === skill.name ? "active" : ""}`}
                >
                  <span className="skill-tag-name">{skill.name}</span>
                  <span className="skill-tag-level">{skill.level}% Proficiency</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ----------------------------------------------------
// Sub-Component: SVG Interactive Skill Network Graph
// ----------------------------------------------------
interface SkillGraphProps {
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  hoveredNode: string | null;
  setHoveredNode: (node: string | null) => void;
}

function SkillGraph({ activeCategory, setActiveCategory, hoveredNode, setHoveredNode }: SkillGraphProps) {
  // Center node: (300, 210)
  const cx = 300;
  const cy = 210;
  
  // Arrange categories in a circular layout
  const nodes = categoriesData.map((cat, idx) => {
    const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
    const radius = 135;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    
    // Satellites for subnodes
    const satellites = cat.subnodes.map((sub, sIdx) => {
      // Branch off the category node radially outwards
      let subAngle = angle + (sIdx - 1.5) * (Math.PI / 5.5);
      
      // Override branching angles for bottom nodes to prevent text label overlap
      if (cat.id === "de") {
        subAngle = -Math.PI / 12 + (sIdx - 1.5) * (Math.PI / 6); // fan out to the right/up-right
      } else if (cat.id === "cloud") {
        subAngle = Math.PI + Math.PI / 12 + (sIdx - 1.5) * (Math.PI / 6); // fan out to the left/up-left
      }
      
      const subRadius = 55;
      return {
        name: sub,
        x: x + subRadius * Math.cos(subAngle),
        y: y + subRadius * Math.sin(subAngle)
      };
    });

    return {
      ...cat,
      x,
      y,
      satellites
    };
  });

  return (
    <svg viewBox="0 0 600 420" className="svg-graph">
      {/* Background ambient radial grid lines */}
      <circle cx={cx} cy={cy} r="65" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r="135" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" strokeDasharray="5,5" />
      <circle cx={cx} cy={cy} r="185" fill="none" stroke="rgba(255, 255, 255, 0.01)" strokeWidth="1" />

      {/* Connection Links */}
      {nodes.map((node) => {
        const isActive = activeCategory.id === node.id;
        const isHovered = hoveredNode === node.id;
        return (
          <g key={`links-${node.id}`}>
            {/* Center link to Category */}
            <line
              x1={cx}
              y1={cy}
              x2={node.x}
              y2={node.y}
              className={`node-link ${isActive || isHovered ? "active" : ""}`}
            />
            {/* Subnode satellite links */}
            {isActive && node.satellites.map((sat, sIdx) => (
              <line
                key={`sat-link-${sIdx}`}
                x1={node.x}
                y1={node.y}
                x2={sat.x}
                y2={sat.y}
                stroke="rgba(255, 87, 34, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
            ))}
          </g>
        );
      })}

      {/* Satellite Node Circles */}
      {nodes.map((node) => {
        const isActive = activeCategory.id === node.id;
        if (!isActive) return null;

        return (
          <g key={`satellites-${node.id}`}>
            {node.satellites.map((sat, sIdx) => {
              const isRight = sat.x > node.x;
              return (
                <g key={`sat-${sIdx}`}>
                  <circle
                    cx={sat.x}
                    cy={sat.y}
                    r="5"
                    fill="var(--orange-accent)"
                    stroke="rgba(255, 87, 34, 0.4)"
                    strokeWidth="2.5"
                  />
                  <text
                    x={sat.x}
                    y={sat.y + 3}
                    dx={isRight ? 12 : -12}
                    className="node-text-satellite"
                    textAnchor={isRight ? "start" : "end"}
                    style={{ fill: "var(--text-white)", fontSize: "11px" }}
                  >
                    {sat.name}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Central Node representing Anurag */}
      <g>
        <circle cx={cx} cy={cy} r="28" className="node-center" />
        <text
          x={cx}
          y={cy - 1}
          textAnchor="middle"
          className="node-text"
          style={{ fill: "#fff", fontSize: "12px", fontWeight: "700" }}
        >
          ANURAG
        </text>
        <text
          x={cx}
          y={cy + 11}
          textAnchor="middle"
          className="node-text"
          style={{ fill: "var(--orange-accent)", fontSize: "8px", fontWeight: "800", letterSpacing: "1px" }}
        >
          ENGINEER
        </text>
      </g>

      {/* Category Nodes */}
      {nodes.map((node) => {
        const isActive = activeCategory.id === node.id;
        const isHovered = hoveredNode === node.id;
        return (
          <g
            key={node.id}
            className={`node-group ${isActive ? "active" : ""}`}
            onClick={() => setActiveCategory(node)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="22"
              className={`node-category ${isActive || isHovered ? "active" : ""}`}
            />
            {/* Center icon / initials inside the category node */}
            <g transform={`translate(${node.x - 9}, ${node.y - 10}) scale(0.9)`}>
              {node.id === "ai" && <Brain size={20} strokeWidth={2} className="text-white" />}
              {node.id === "ds" && <Activity size={20} strokeWidth={2} className="text-white" />}
              {node.id === "de" && <Database size={20} strokeWidth={2} className="text-white" />}
              {node.id === "cloud" && <Cloud size={20} strokeWidth={2} className="text-white" />}
              {node.id === "fs" && <Code size={20} strokeWidth={2} className="text-white" />}
            </g>
            {(() => {
              const lines = [];
              if (node.id === "ai") {
                lines.push("AI / ML");
              } else if (node.id === "ds") {
                lines.push("Data", "Science");
              } else if (node.id === "de") {
                lines.push("Data", "Engineering");
              } else if (node.id === "cloud") {
                lines.push("Cloud &", "DevOps");
              } else if (node.id === "fs") {
                lines.push("Full", "Stack");
              }

              if (lines.length === 1) {
                return (
                  <text
                    x={node.x}
                    y={node.y + 37}
                    textAnchor="middle"
                    className="node-text"
                    style={{ fontSize: "12px", fontWeight: isActive ? "700" : "500" }}
                  >
                    {lines[0]}
                  </text>
                );
              } else {
                return (
                  <text
                    x={node.x}
                    y={node.y + 33}
                    textAnchor="middle"
                    className="node-text"
                    style={{ fontSize: "12px", fontWeight: isActive ? "700" : "500" }}
                  >
                    <tspan x={node.x} dy="0">{lines[0]}</tspan>
                    <tspan x={node.x} dy="13">{lines[1]}</tspan>
                  </text>
                );
              }
            })()}
          </g>
        );
      })}
    </svg>
  );
}

// ----------------------------------------------------
// Sub-Component: Sandbox Live Code Simulations
// ----------------------------------------------------
interface SandboxProps {
  categoryId: string;
}

function InteractiveSandbox({ categoryId }: SandboxProps) {
  switch (categoryId) {
    case "ai":
      return <AISandbox />;
    case "ds":
      return <DSSandbox />;
    case "de":
      return <DESandbox />;
    case "cloud":
      return <CloudSandbox />;
    case "fs":
      return <FSSandbox />;
    default:
      return <div className="text-sm text-dim italic">Simulation loading...</div>;
  }
}

// 1. Artificial Intelligence Simulation (Neural Network Propagator)
function AISandbox() {
  const [pulseIndex, setPulseIndex] = useState(0);
  const [nodesActive, setNodesActive] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const triggerCustomPulse = (index: number) => {
    const updated = [...nodesActive];
    updated[index] = true;
    setNodesActive(updated);
    setTimeout(() => {
      const reset = [...nodesActive];
      reset[index] = false;
      setNodesActive(reset);
    }, 600);
  };

  return (
    <div className="simulation-card flex-col justify-between p-4">
      <div className="ai-sandbox-container">
        {/* Layer 1: Inputs */}
        <div className="ai-layer">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => triggerCustomPulse(i)}
              className={`ai-node-btn ${pulseIndex === 0 || nodesActive[i] ? "active" : ""}`}
            >
              <span className="ai-node-text">X{i}</span>
            </button>
          ))}
        </div>

        {/* Connections L1 -> L2 */}
        <div className="ai-connection-svg flex-col justify-around h-full">
          <svg width="40" height="80">
            <line x1="0" y1="10" x2="40" y2="20" stroke={pulseIndex === 1 ? "#ff5722" : "#a0a0a5"} strokeWidth="1.5" />
            <line x1="0" y1="40" x2="40" y2="40" stroke={pulseIndex === 1 ? "#ff5722" : "#a0a0a5"} strokeWidth="1.5" />
            <line x1="0" y1="70" x2="40" y2="60" stroke={pulseIndex === 1 ? "#ff5722" : "#a0a0a5"} strokeWidth="1.5" />
          </svg>
        </div>

        {/* Layer 2: Hidden */}
        <div className="ai-layer">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`ai-hidden-node ${pulseIndex === 2 ? "active" : ""}`}
            >
              <Brain size={12} style={{ color: "#fff" }} />
            </div>
          ))}
        </div>

        {/* Connections L2 -> L3 */}
        <div className="ai-connection-svg flex-col justify-around h-full">
          <svg width="40" height="80">
            <line x1="0" y1="20" x2="40" y2="40" stroke={pulseIndex === 3 ? "#ff5722" : "#a0a0a5"} strokeWidth="1.5" />
            <line x1="0" y1="60" x2="40" y2="40" stroke={pulseIndex === 3 ? "#ff5722" : "#a0a0a5"} strokeWidth="1.5" />
          </svg>
        </div>

        {/* Layer 3: Output */}
        <div className="ai-layer justify-center">
          <div className={`ai-output-node ${pulseIndex === 3 ? "active" : ""}`}>
            <Sparkles size={14} style={{ color: "#fff" }} />
          </div>
        </div>
      </div>

      <div className="simulation-overlay">
        <div className="simulation-title">Neural Net Propagation Model</div>
        <div className="simulation-status">
          <span className="simulation-dot"></span>
          <span>Feed Forward Running</span>
        </div>
      </div>
    </div>
  );
}

// 2. Data Science Simulation (Dynamic Regression Line Fitting)
function DSSandbox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([
    { x: 30, y: 120 },
    { x: 70, y: 95 },
    { x: 120, y: 80 },
    { x: 170, y: 55 },
    { x: 220, y: 40 },
    { x: 280, y: 30 }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Axes grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 20; i < canvas.width; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 20; j < canvas.height; j += 30) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Draw Data Points
    ctx.fillStyle = "#ff5722";
    points.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, 2 * Math.PI);
      ctx.shadowColor = "#ff5722";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Compute Linear Regression parameters (y = mx + b)
    const n = points.length;
    if (n > 1) {
      let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
      points.forEach((pt) => {
        sumX += pt.x;
        sumY += pt.y;
        sumXY += (pt.x * pt.y);
        sumXX += (pt.x * pt.x);
      });

      const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const b = (sumY - m * sumX) / n;

      // Draw Least Squares Regression line
      ctx.strokeStyle = "#ff8a65";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#ff8a65";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.moveTo(0, b);
      ctx.lineTo(canvas.width, m * canvas.width + b);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }, [points]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prev) => {
      if (prev.length > 15) {
        return [...prev.slice(1), { x, y }]; // Cap size
      }
      return [...prev, { x, y }];
    });
  };

  const handleReset = () => {
    setPoints([
      { x: 30, y: 120 },
      { x: 70, y: 95 },
      { x: 120, y: 80 },
      { x: 170, y: 55 },
      { x: 220, y: 40 },
      { x: 280, y: 30 }
    ]);
  };

  return (
    <div className="simulation-card flex-col justify-between p-3">
      <div className="ds-sandbox-container">
        <canvas 
          ref={canvasRef} 
          width="350" 
          height="130" 
          onClick={handleCanvasClick}
          className="ds-canvas"
        />
        <button 
          onClick={handleReset}
          className="ds-reset-btn"
          title="Reset Graph"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      <div className="simulation-overlay">
        <div className="simulation-title">Least-Squares regression model. Click graph to add points!</div>
        <div className="simulation-status">
          <span className="simulation-dot"></span>
          <span>N = {points.length} points</span>
        </div>
      </div>
    </div>
  );
}

// 3. Data Engineering Simulation (Resilient Pipeline Runner)
function DESandbox() {
  const [pipelineState, setPipelineState] = useState<"idle" | "ingesting" | "transforming" | "loading" | "complete">("idle");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const startPipeline = () => {
    if (pipelineState !== "idle") return;
    setConsoleLogs([]);
    setProgress(0);
    setPipelineState("ingesting");
    
    // Step 1
    addLog("Pipeline initialized. Trigger: manual_api_hook.");
    addLog("Ingesting from PostgreSQL transactional DB...");
  };

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs((prev) => [...prev, `[${timestamp}] ${msg}`]);
  };

  // Run simulation states
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (pipelineState === "ingesting") {
      timer = setTimeout(() => {
        setProgress(33);
        setPipelineState("transforming");
        addLog("Ingestion complete. Rows count: 48,291.");
        addLog("Transforming schema: removing duplicates & formatting timestamp formats...");
      }, 1500);
    } else if (pipelineState === "transforming") {
      timer = setTimeout(() => {
        setProgress(66);
        setPipelineState("loading");
        addLog("Transformation complete. Spark job exit code: 0.");
        addLog("Loading parquet logs into data warehouse repository...");
      }, 1500);
    } else if (pipelineState === "loading") {
      timer = setTimeout(() => {
        setProgress(100);
        setPipelineState("complete");
        addLog("Data successfully loaded. Warehouse cluster target sync OK.");
        addLog("ETL Pipeline job: SUCCESS ✅");
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [pipelineState]);

  const resetPipeline = () => {
    setPipelineState("idle");
    setConsoleLogs([]);
    setProgress(0);
  };

  return (
    <div className="simulation-card flex-col justify-between p-3">
      <div className="de-sandbox-container">
        {/* Buttons / Control panel */}
        <div className="de-controls">
          <div className="de-btn-group">
            <button
              onClick={startPipeline}
              disabled={pipelineState !== "idle"}
              className="de-btn-run"
            >
              <Play size={10} />
              Run pipeline
            </button>
            <button
              onClick={resetPipeline}
              className="de-btn-reset"
            >
              <RotateCcw size={10} />
              Reset
            </button>
          </div>
          
          {/* Main Progress percentage */}
          <div className="de-progress-text">
            Job Progress: {progress}%
          </div>
        </div>

        {/* Real-time scrolling console terminal */}
        <div className="de-terminal select-none">
          {consoleLogs.length === 0 ? (
            <div style={{ fontStyle: "italic", color: "var(--text-dim)" }}>Click 'Run pipeline' to stream ETL process logs...</div>
          ) : (
            consoleLogs.map((log, index) => (
              <div 
                key={index} 
                className={log.includes("SUCCESS") ? "de-terminal-success" : ""}
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="simulation-overlay">
        <div className="simulation-title">Orchestrator Pipeline Monitor</div>
        <div className="simulation-status">
          <span className="simulation-dot"></span>
          <span>Status: {pipelineState.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}

// 4. Cloud & Deployment Simulation (MLOps Cluster deployment logs)
function CloudSandbox() {
  const [logs, setLogs] = useState<string[]>([]);
  const [pods, setPods] = useState<string[]>(["active", "active", "active"]);
  const [isDeploying, setIsDeploying] = useState(false);

  const startDeployment = () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setLogs([]);
    setPods(["pending", "pending", "pending"]);

    const script = [
      "$ git push origin main",
      "Deploy trigger caught. Revision hash: f88a7c2",
      "Building Docker file image layer caches...",
      "Layer 1: Base python:3.10-slim ... Cached",
      "Layer 2: Installing requirements.txt ... Success",
      "Tagging Image: registry.aws/ml-api:v2.0.4",
      "Pushing container registry ... OK",
      "Rolling update in Kubernetes cluster...",
      "Stopping pod 0 ... OK",
      "Starting node-api-pod-v2-xyz0 ... Health Check GREEN",
      "Stopping pod 1 ... OK",
      "Starting node-api-pod-v2-abc1 ... Health Check GREEN",
      "Stopping pod 2 ... OK",
      "Starting node-api-pod-v2-def2 ... Health Check GREEN",
      "Zero-downtime routing finalized. Cluster online ✅"
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < script.length) {
        setLogs((prev) => [...prev, script[i]]);
        
        // Dynamic Pod state transitions
        if (script[i].includes("Starting node-api-pod-v2-xyz0")) {
          setPods(["active", "pending", "pending"]);
        } else if (script[i].includes("Starting node-api-pod-v2-abc1")) {
          setPods(["active", "active", "pending"]);
        } else if (script[i].includes("Starting node-api-pod-v2-def2")) {
          setPods(["active", "active", "active"]);
        }
        
        i++;
      } else {
        clearInterval(interval);
        setIsDeploying(false);
      }
    }, 400);
  };

  return (
    <div className="simulation-card flex-col justify-between p-3">
      <div className="cloud-sandbox-container">
        {/* Pod Cluster Graphic */}
        <div className="cloud-cluster">
          <span className="cloud-cluster-title">Cluster Pods</span>
          {pods.map((state, idx) => (
            <div key={idx} className="cloud-pod-item">
              <span className="cloud-pod-name">Pod {idx}</span>
              <div 
                className={`cloud-pod-dot ${state === "active" ? "active" : "pending"}`} 
              />
            </div>
          ))}
        </div>

        {/* Deploy Terminal */}
        <div className="cloud-terminal-container">
          <div className="cloud-terminal select-none">
            {logs.length === 0 ? (
              <div style={{ fontStyle: "italic", color: "var(--text-dim)" }}>Click 'Deploy Code' to run AWS pipeline script...</div>
            ) : (
              logs.map((line, idx) => {
                let colorStyle = {};
                if (line.startsWith("$")) {
                  colorStyle = { color: "#ff8a65" };
                } else if (line.includes("GREEN") || line.includes("online")) {
                  colorStyle = { color: "#4cd964" };
                }
                return (
                  <div key={idx} style={colorStyle}>
                    {line}
                  </div>
                );
              })
            )}
          </div>
          
          <button
            onClick={startDeployment}
            disabled={isDeploying}
            className="cloud-btn-deploy"
          >
            {isDeploying ? "Deploying..." : "Deploy Code"}
          </button>
        </div>
      </div>

      <div className="simulation-overlay">
        <div className="simulation-title">AWS EKS Cluster Deployment Monitor</div>
        <div className="simulation-status">
          <span className="simulation-dot"></span>
          <span>Docker MLOps Engine</span>
        </div>
      </div>
    </div>
  );
}

// 5. Full Stack Development Simulation (React Component Customizer)
function FSSandbox() {
  const [theme, setTheme] = useState<"dark" | "glass" | "orange">("glass");
  const [glowIntensity, setGlowIntensity] = useState<"low" | "medium" | "high">("medium");
  const [borderRadius, setBorderRadius] = useState<"rounded" | "curved" | "pill">("curved");

  return (
    <div className="simulation-card flex-col justify-between p-3">
      <div className="fs-sandbox-container">
        {/* Control Box */}
        <div className="fs-controls">
          {/* Option 1: Theme */}
          <div className="fs-control-group">
            <span className="fs-control-title">Theme Style</span>
            <div className="fs-btn-row">
              {(["dark", "glass", "orange"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`fs-toggle-btn ${theme === t ? "active" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Option 2: Glow */}
          <div className="fs-control-group">
            <span className="fs-control-title">Border Glow</span>
            <div className="fs-btn-row">
              {(["low", "medium", "high"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGlowIntensity(g)}
                  className={`fs-toggle-btn ${glowIntensity === g ? "active" : ""}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Option 3: Radius */}
          <div className="fs-control-group">
            <span className="fs-control-title">Border Radius</span>
            <div className="fs-btn-row">
              {(["rounded", "curved", "pill"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setBorderRadius(r)}
                  className={`fs-toggle-btn ${borderRadius === r ? "active" : ""}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Component Box */}
        <div className="fs-preview-area">
          <div 
            className="fs-widget"
            style={{
              background: 
                theme === "dark" 
                  ? "#09090b" 
                  : theme === "glass" 
                  ? "rgba(255,255,255,0.03)" 
                  : "rgba(255,87,34,0.08)",
              border: 
                theme === "orange" 
                  ? "1px solid #ff5722" 
                  : theme === "glass"
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid #27272a",
              color: 
                theme === "orange" ? "#ff8a65" : "#ffffff",
              borderRadius: 
                borderRadius === "rounded" 
                  ? "6px" 
                  : borderRadius === "curved" 
                  ? "16px" 
                  : "30px",
              boxShadow: 
                glowIntensity === "low" 
                  ? "none" 
                  : glowIntensity === "medium" 
                  ? "0 4px 20px rgba(255, 87, 34, 0.15)" 
                  : "0 8px 30px rgba(255, 87, 34, 0.4)"
            }}
          >
            <div className="fs-widget-header">
              <span className="fs-widget-title">Widget V1</span>
              <Server size={10} />
            </div>
            <p className="fs-widget-body select-none">
              A dynamic interactive React card sandbox. Adjust controls to custom-tailor styling details!
            </p>
            <button className="fs-widget-btn select-none">
              Submit Payload
            </button>
          </div>
        </div>
      </div>

      <div className="simulation-overlay">
        <div className="simulation-title">Interactive React Card Sandbox</div>
        <div className="simulation-status">
          <span className="simulation-dot"></span>
          <span>DOM State synced</span>
        </div>
      </div>
    </div>
  );
}
