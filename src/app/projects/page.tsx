"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Header from "../components/Header";
import {
  Search,
  LayoutGrid,
  List,
  Folder,
  File,
  Play,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Star,
  GitCommit,
  Code2,
  Cpu,
  Database,
  MessageSquare,
  FileCode,
  Layers,
  SearchCode,
  History,
  Activity,
  Send,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Volume2
} from "lucide-react";

// Interfaces
interface ProjectFile {
  name: string;
  isFolder: boolean;
  content?: string;
  children?: string[]; // list of file names in folder
}

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  visibility: "Public" | "Private";
  language: string;
  languageColor: string;
  stars: number;
  updatedAt: string;
  stats: {
    commits: number;
    linesOfCode: number;
    complexity: "Low" | "Medium" | "High";
  };
  fileSystem: Record<string, ProjectFile>;
  defaultFile: string;
  simulationType: "face-detection" | "sql-query" | "chat-room" | "api-response" | "text-to-speech" | "none";
}

// Project Dataset matching the user's repositories screenshots
const projectsData: ProjectItem[] = [
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Personal portfolio built with Next.js App Router, advanced CSS animations, and interactive SVG visualization components.",
    visibility: "Public",
    language: "CSS",
    languageColor: "#563d7c",
    stars: 0,
    updatedAt: "1 hour ago",
    stats: { commits: 42, linesOfCode: 1540, complexity: "Medium" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["src", "package.json", "next.config.ts"] },
      "src": { name: "src", isFolder: true, children: ["app", "components"] },
      "app": { name: "app", isFolder: true, children: ["page.tsx", "globals.css", "layout.tsx"] },
      "components": { name: "components", isFolder: true, children: ["Header.tsx"] },
      "page.tsx": {
        name: "page.tsx",
        isFolder: false,
        content: `import Header from "./components/Header";\n\nexport default function Home() {\n  return (\n    <main className="portfolio-frame">\n      <Header />\n      <div className="hero-content">\n        <h1 className="hero-title">Anurag Kumar</h1>\n        <p>AI Engineer & Data Scientist</p>\n      </div>\n    </main>\n  );\n}`
      },
      "globals.css": {
        name: "globals.css",
        isFolder: false,
        content: `:root {\n  --bg-dark: #000000;\n  --orange-accent: #ff5722;\n}\n\nbody {\n  background-color: var(--bg-dark);\n  color: #fff;\n  font-family: 'Outfit', sans-serif;\n}`
      },
      "layout.tsx": {
        name: "layout.tsx",
        isFolder: false,
        content: `export default function RootLayout({ children }) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  );\n}`
      },
      "Header.tsx": {
        name: "Header.tsx",
        isFolder: false,
        content: `"use client";\nimport Link from "next/link";\n\nexport default function Header() {\n  return (\n    <header className="header">\n      <Link href="/" className="logo">Portfolio</Link>\n    </header>\n  );\n}`
      },
      "package.json": {
        name: "package.json",
        isFolder: false,
        content: `{\n  "name": "portfolio",\n  "version": "1.0.0",\n  "dependencies": {\n    "next": "latest",\n    "react": "latest",\n    "lucide-react": "^0.300.0"\n  }\n}`
      },
      "next.config.ts": {
        name: "next.config.ts",
        isFolder: false,
        content: `import type { NextConfig } from "next";\n\nconst nextConfig: NextConfig = {\n  reactStrictMode: true,\n};\n\nexport default nextConfig;`
      }
    },
    defaultFile: "page.tsx",
    simulationType: "none"
  },
  {
    id: "face-detection",
    name: "Face-Detection-system-",
    description: "High-performance face detection system supporting multiple device streams, custom feature mapping, and real-time biometric analysis.",
    visibility: "Public",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    updatedAt: "5 hours ago",
    stats: { commits: 68, linesOfCode: 3200, complexity: "High" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["main.py", "detector.py", "requirements.txt", "config.yaml"] },
      "main.py": {
        name: "main.py",
        isFolder: false,
        content: `import cv2\nfrom detector import FaceDetector\n\ndef main():\n    cap = cv2.VideoCapture(0)\n    detector = FaceDetector(model_path="weights/yolov8_face.pt")\n    \n    while cap.isOpened():\n        ret, frame = cap.read()\n        if not ret: break\n        \n        faces = detector.detect(frame)\n        detector.draw_annotations(frame, faces)\n        \n        cv2.imshow("Biometric Analysis Stream", frame)\n        if cv2.waitKey(1) & 0xFF == ord('q'):\n            break\n            \n    cap.release()\n    cv2.destroyAllWindows()\n\nif __name__ == '__main__':\n    main()`
      },
      "detector.py": {
        name: "detector.py",
        isFolder: false,
        content: `import torch\nimport numpy as np\n\nclass FaceDetector:\n    def __init__(self, model_path):\n        self.device = "cuda" if torch.cuda.is_available() else "cpu"\n        self.model = torch.load(model_path, map_location=self.device)\n        \n    def detect(self, img):\n        # Model preprocessing & inference loop\n        results = self.model(img)\n        faces = []\n        for r in results:\n            bbox = r.boxes.xyxy.cpu().numpy()\n            conf = r.boxes.conf.cpu().numpy()\n            faces.append({"bbox": bbox, "confidence": conf})\n        return faces`
      },
      "requirements.txt": {
        name: "requirements.txt",
        isFolder: false,
        content: `opencv-python>=4.8.0\ntorch>=2.1.0\ntouchvision>=0.16.0\nnumpy>=1.24.0\npyyaml>=6.0`
      },
      "config.yaml": {
        name: "config.yaml",
        isFolder: false,
        content: `model:\n  weights: "weights/yolov8_face.pt"\n  confidence_threshold: 0.65\n  nms_threshold: 0.45\ndevice:\n  prefer_cuda: true\n  max_fps: 30`
      }
    },
    defaultFile: "main.py",
    simulationType: "face-detection"
  },
  {
    id: "catering-backend",
    name: "Catering-banckend",
    description: "Robust food service catering backend handling real-time order matching, inventory notifications, dynamic menu pricing, and stripe checkout endpoints.",
    visibility: "Private",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 0,
    updatedAt: "3 weeks ago",
    stats: { commits: 24, linesOfCode: 1840, complexity: "Medium" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["server.js", "routes", "models"] },
      "routes": { name: "routes", isFolder: true, children: ["orders.js", "menu.js"] },
      "models": { name: "models", isFolder: true, children: ["Order.js"] },
      "server.js": {
        name: "server.js",
        isFolder: false,
        content: `const express = require('express');\nconst mongoose = require('mongoose');\nconst app = express();\n\napp.use(express.json());\n\nmongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })\n  .then(() => console.log('Connected to MongoDB'))\n  .catch(err => console.error(err));\n\napp.use('/api/orders', require('./routes/orders'));\napp.use('/api/menu', require('./routes/menu'));\n\napp.listen(5000, () => console.log('Catering Backend running on port 5000'));`
      },
      "orders.js": {
        name: "orders.js",
        isFolder: false,
        content: `const express = require('express');\nconst router = express.Router();\nconst Order = require('../models/Order');\n\nrouter.post('/', async (req, res) => {\n  try {\n    const newOrder = new Order(req.body);\n    await newOrder.save();\n    res.status(201).json({ success: true, order: newOrder });\n  } catch (err) {\n    res.status(500).json({ error: err.message });\n  }\n});\n\nmodule.exports = router;`
      },
      "menu.js": {
        name: "menu.js",
        isFolder: false,
        content: `const express = require('express');\nconst router = express.Router();\n\nrouter.get('/', (req, res) => {\n  res.json([\n    { id: 1, name: "Premium Buffet Combo", price: 45.00 },\n    { id: 2, name: "Corporate Lunch Pack", price: 18.50 },\n    { id: 3, name: "Veggie Feast Selection", price: 22.00 }\n  ]);\n});\n\nmodule.exports = router;`
      },
      "Order.js": {
        name: "Order.js",
        isFolder: false,
        content: `const mongoose = require('mongoose');\n\nconst OrderSchema = new mongoose.Schema({\n  customerName: String,\n  items: Array,\n  totalAmount: Number,\n  status: { type: String, default: 'Pending' },\n  createdAt: { type: Date, default: Date.now }\n});\n\nmodule.exports = mongoose.model('Order', OrderSchema);`
      }
    },
    defaultFile: "server.js",
    simulationType: "api-response"
  },
  {
    id: "pooja-shree-catering",
    name: "Pooja-Shree-catering",
    description: "Corporate and event food catering customer booking frontend web application, complete with responsive grids and custom checkout flows.",
    visibility: "Private",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 0,
    updatedAt: "3 weeks ago",
    stats: { commits: 19, linesOfCode: 920, complexity: "Medium" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["index.html", "app.js", "styles.css"] },
      "index.html": {
        name: "index.html",
        isFolder: false,
        content: `<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <nav>\n    <a href="#">Pooja Shree Catering</a>\n  </nav>\n  <main>\n    <h2>Book Elegant Catering Services</h2>\n    <div id="menu-container"></div>\n    <button id="book-btn">Place Ingestion Booking</button>\n  </main>\n  <script src="app.js"></script>\n</body>\n</html>`
      },
      "app.js": {
        name: "app.js",
        isFolder: false,
        content: `document.addEventListener('DOMContentLoaded', () => {\n  const container = document.getElementById('menu-container');\n  \n  fetch('http://localhost:5000/api/menu')\n    .then(res => res.json())\n    .then(items => {\n      container.innerHTML = items.map(item => \n        \`<div class="menu-card">\n          <h3>\${item.name}</h3>\n          <p>$\${item.price.toFixed(2)}</p>\n         </div>\`\n      ).join('');\n    });\n});`
      },
      "styles.css": {
        name: "styles.css",
        isFolder: false,
        content: `body {\n  background-color: #0b0b0d;\n  color: #fff;\n  font-family: sans-serif;\n}\n.menu-card {\n  border: 1px solid rgba(255,255,255,0.1);\n  padding: 15px;\n  margin-bottom: 10px;\n  border-radius: 8px;\n}`
      }
    },
    defaultFile: "app.js",
    simulationType: "none"
  },
  {
    id: "doctor-patient-app",
    name: "Doctors-Patient-Management-App",
    description: "MediConnect is a comprehensive healthcare web application connecting doctors and patients. Features appointments booking, profile creation, and real-time medical logs.",
    visibility: "Public",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 0,
    updatedAt: "on Apr 3",
    stats: { commits: 88, linesOfCode: 5200, complexity: "High" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["src", "package.json"] },
      "src": { name: "src", isFolder: true, children: ["App.tsx", "components", "context"] },
      "components": { name: "components", isFolder: true, children: ["BookingForm.tsx", "DoctorCard.tsx"] },
      "context": { name: "context", isFolder: true, children: ["AppContext.tsx"] },
      "App.tsx": {
        name: "App.tsx",
        isFolder: false,
        content: `import React from 'react';\nimport BookingForm from './components/BookingForm';\n\nexport default function App() {\n  return (\n    <div className="medi-container">\n      <header className="app-header">\n        <h1>MediConnect Hub</h1>\n      </header>\n      <main>\n        <BookingForm />\n      </main>\n    </div>\n  );\n}`
      },
      "BookingForm.tsx": {
        name: "BookingForm.tsx",
        isFolder: false,
        content: `import React, { useState } from 'react';\n\nexport default function BookingForm() {\n  const [date, setDate] = useState('');\n  const [doctor, setDoctor] = useState('');\n\n  const handleBooking = (e: React.FormEvent) => {\n    e.preventDefault();\n    alert(\`Appointment set with Dr. \${doctor} on \${date}\`);\n  };\n\n  return (\n    <form onSubmit={handleBooking} className="form-card">\n      <h3>Book Slot</h3>\n      <select onChange={(e) => setDoctor(e.target.value)}>\n        <option value="Smith">Dr. Smith (Cardiology)</option>\n        <option value="Patel">Dr. Patel (Pediatrics)</option>\n      </select>\n      <input type="date" onChange={(e) => setDate(e.target.value)} />\n      <button type="submit">Submit Appointment</button>\n    </form>\n  );\n}`
      },
      "DoctorCard.tsx": {
        name: "DoctorCard.tsx",
        isFolder: false,
        content: `import React from 'react';\n\ninterface DoctorProps {\n  name: string;\n  specialization: string;\n}\n\nexport default function DoctorCard({ name, specialization }: DoctorProps) {\n  return (\n    <div className="doc-card">\n      <h4>Dr. {name}</h4>\n      <p>{specialization}</p>\n    </div>\n  );\n}`
      },
      "AppContext.tsx": {
        name: "AppContext.tsx",
        isFolder: false,
        content: `import React, { createContext, useContext, useState } from 'react';\n\nconst AppContext = createContext<any>(null);\n\nexport const AppProvider = ({ children }: { children: React.ReactNode }) => {\n  const [user, setUser] = useState({ name: 'Anurag Kumar', role: 'Patient' });\n  return (\n    <AppContext.Provider value={{ user, setUser }}>\n      {children}\n    </AppContext.Provider>\n  );\n};`
      },
      "package.json": {
        name: "package.json",
        isFolder: false,
        content: `{\n  "dependencies": {\n    "react": "^18.2.0",\n    "typescript": "^5.0.0"\n  }\n}`
      }
    },
    defaultFile: "BookingForm.tsx",
    simulationType: "none"
  },
  {
    id: "app-private",
    name: "App",
    description: "Private instant messaging chat mobile application featuring secure websocket architecture, local database message store, and user identity confirmation.",
    visibility: "Private",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 0,
    updatedAt: "on Apr 3",
    stats: { commits: 14, linesOfCode: 850, complexity: "Medium" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["App.tsx", "chatClient.ts", "package.json"] },
      "App.tsx": {
        name: "App.tsx",
        isFolder: false,
        content: `import React, { useState } from 'react';\nimport { chatService } from './chatClient';\n\nexport default function App() {\n  const [msg, setMsg] = useState('');\n  return (\n    <div className="chat-app">\n      <h2>Chat Pvt App</h2>\n      <button onClick={() => chatService.sendMessage("Hello security")}>\n        Send Ping\n      </button>\n    </div>\n  );\n}`
      },
      "chatClient.ts": {
        name: "chatClient.ts",
        isFolder: false,
        content: `export const chatService = {\n  sendMessage: (msg: string) => {\n    console.log("WebSocket secure send: ", msg);\n  }\n};`
      },
      "package.json": {
        name: "package.json",
        isFolder: false,
        content: `{\n  "dependencies": {\n    "react": "^18.0.0",\n    "react-native": "latest"\n  }\n}`
      }
    },
    defaultFile: "App.tsx",
    simulationType: "none"
  },
  {
    id: "application-private",
    name: "Application",
    description: "Private local management utility script for optimizing server processes, log collection, and pipeline tracking.",
    visibility: "Private",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 0,
    updatedAt: "on Apr 3",
    stats: { commits: 8, linesOfCode: 340, complexity: "Low" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["index.ts", "utils.ts"] },
      "index.ts": {
        name: "index.ts",
        isFolder: false,
        content: `import { collectLogs } from './utils';\n\nconsole.log("Starting server audit...");\ncollectLogs();`
      },
      "utils.ts": {
        name: "utils.ts",
        isFolder: false,
        content: `export function collectLogs() {\n  console.log("Aggregating system telemetry logs to SQLite...");\n}`
      }
    },
    defaultFile: "index.ts",
    simulationType: "none"
  },
  {
    id: "nexus-chat",
    name: "NEXUS-CHAT",
    description: "Nexus is a multi-featured chat network designed for high-concurrency group chatrooms, real-time rich media previewers, and direct client encryption.",
    visibility: "Private",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 0,
    updatedAt: "on Mar 15",
    stats: { commits: 52, linesOfCode: 3800, complexity: "High" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["src", "package.json", "tsconfig.json"] },
      "src": { name: "src", isFolder: true, children: ["server.ts", "client.ts", "crypto.ts"] },
      "server.ts": {
        name: "server.ts",
        isFolder: false,
        content: `import { createServer } from "http";\nimport { Server } from "socket.io";\n\nconst httpServer = createServer();\nconst io = new Server(httpServer, {\n  cors: { origin: "*" }\n});\n\nio.on("connection", (socket) => {\n  console.log(\`Client connected: \${socket.id}\`);\n  \n  socket.on("message", (data) => {\n    io.emit("message", { sender: socket.id, content: data });\n  });\n});\n\nhttpServer.listen(4000, () => {\n  console.log("Nexus WebSocket running on port 4000");\n});`
      },
      "client.ts": {
        name: "client.ts",
        isFolder: false,
        content: `import { io } from "socket.io-client";\nconst socket = io("http://localhost:4000");\n\nexport function send(message: string) {\n  socket.emit("message", message);\n}`
      },
      "crypto.ts": {
        name: "crypto.ts",
        isFolder: false,
        content: `// Client-side encryption key management\nexport function encryptAES(text: string, secret: string) {\n  return "Encrypted: " + btoa(text);\n}`
      },
      "package.json": {
        name: "package.json",
        isFolder: false,
        content: `{\n  "dependencies": {\n    "socket.io": "^4.7.2",\n    "socket.io-client": "^4.7.2"\n  }\n}`
      },
      "tsconfig.json": {
        name: "tsconfig.json",
        isFolder: false,
        content: `{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true\n  }\n}`
      }
    },
    defaultFile: "server.ts",
    simulationType: "chat-room"
  },
  {
    id: "aces-furniture",
    name: "Aces_Furniture",
    description: "Ecommerce furniture platform layout showcasing premium grid items, filters, cart sliders, and elegant page design transitions.",
    visibility: "Private",
    language: "HTML",
    languageColor: "#e34c26",
    stars: 0,
    updatedAt: "on Oct 28, 2025",
    stats: { commits: 15, linesOfCode: 650, complexity: "Low" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["index.html", "products.html", "main.css"] },
      "index.html": {
        name: "index.html",
        isFolder: false,
        content: `<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="main.css">\n</head>\n<body>\n  <header>\n    <h1>Aces Furniture Co.</h1>\n  </header>\n  <main class="grid-layout">\n    <!-- Dynamic product listings -->\n  </main>\n</body>\n</html>`
      },
      "products.html": {
        name: "products.html",
        isFolder: false,
        content: `<div>\n  <h3>Elegant Velvet Armchair</h3>\n  <button>Add to Basket</button>\n</div>`
      },
      "main.css": {
        name: "main.css",
        isFolder: false,
        content: `body {\n  font-family: 'Helvetica', sans-serif;\n  background-color: #f7f7f9;\n}`
      }
    },
    defaultFile: "index.html",
    simulationType: "none"
  },
  {
    id: "chat-adv",
    name: "chat.adv",
    description: "Advanced websocket message server orchestration project featuring queue backups, message history search, and rate-limiting middleware features.",
    visibility: "Private",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 0,
    updatedAt: "on Oct 14, 2025",
    stats: { commits: 32, linesOfCode: 2100, complexity: "Medium" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["src", "package.json"] },
      "src": { name: "src", isFolder: true, children: ["server.ts", "limiter.ts"] },
      "server.ts": {
        name: "server.ts",
        isFolder: false,
        content: `import express from "express";\nimport { rateLimiter } from "./limiter";\nconst app = express();\n\napp.use(rateLimiter);\napp.get("/health", (req, res) => res.send("OK"));`
      },
      "limiter.ts": {
        name: "limiter.ts",
        isFolder: false,
        content: `import rateLimit from "express-rate-limit";\nexport const rateLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100\n});`
      },
      "package.json": {
        name: "package.json",
        isFolder: false,
        content: `{\n  "dependencies": {\n    "express": "^4.18.2",\n    "express-rate-limit": "^7.1.0"\n  }\n}`
      }
    },
    defaultFile: "server.ts",
    simulationType: "none"
  },
  {
    id: "aces-chat",
    name: "Aces-chat",
    description: "Chat interface wrapper with support for dynamic background variables, custom themes, responsive mobile sheets, and sidebar sliders.",
    visibility: "Private",
    language: "HTML",
    languageColor: "#e34c26",
    stars: 0,
    updatedAt: "on Oct 14, 2025",
    stats: { commits: 11, linesOfCode: 420, complexity: "Low" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["index.html", "chat.css"] },
      "index.html": {
        name: "index.html",
        isFolder: false,
        content: `<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="chat.css">\n</head>\n<body>\n  <div id="chat-frame">\n     <!-- Theme selector panel -->\n  </div>\n</body>\n</html>`
      },
      "chat.css": {
        name: "chat.css",
        isFolder: false,
        content: `:root {\n  --primary: #4f46e5;\n}`
      }
    },
    defaultFile: "index.html",
    simulationType: "none"
  },
  {
    id: "csv-to-database",
    name: "csv-to-database",
    description: "Python CLI tools for structural assessment, parsing, parsing validation, and importing massive CSV files into PostgreSQL and SQLite database records.",
    visibility: "Public",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    updatedAt: "on Sep 5, 2025",
    stats: { commits: 25, linesOfCode: 1120, complexity: "Medium" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["db_import.py", "parser.py"] },
      "db_import.py": {
        name: "db_import.py",
        isFolder: false,
        content: `import sqlite3\nimport pandas as pd\n\ndef import_csv(csv_path, db_name, table_name):\n    df = pd.read_csv(csv_path)\n    conn = sqlite3.connect(db_name)\n    df.to_sql(table_name, conn, if_exists='replace', index=False)\n    conn.close()\n    print(f"Uploaded {len(df)} records into {table_name}")`
      },
      "parser.py": {
        name: "parser.py",
        isFolder: false,
        content: `import csv\n\ndef validate_columns(csv_path, expected):\n    with open(csv_path, mode='r') as f:\n        reader = csv.reader(f)\n        headers = next(reader)\n        return headers == expected`
      }
    },
    defaultFile: "db_import.py",
    simulationType: "none"
  },
  {
    id: "csv-upload",
    name: "csv-upload",
    description: "Django web client interface facilitating high-throughput CSV data transfers, mapping column indexes, validation feedback, and ingestion logging.",
    visibility: "Public",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    updatedAt: "on Sep 5, 2025",
    stats: { commits: 14, linesOfCode: 1300, complexity: "Medium" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["views.py", "forms.py"] },
      "views.py": {
        name: "views.py",
        isFolder: false,
        content: `from django.shortcuts import render\nfrom .forms import UploadFileForm\n\ndef upload_file(request):\n    if request.method == 'POST':\n        form = UploadFileForm(request.POST, request.FILES)\n        if form.is_valid():\n            # Process file here\n            return render(request, 'success.html')\n    else:\n        form = UploadFileForm()\n    return render(request, 'upload.html', {'form': form})`
      },
      "forms.py": {
        name: "forms.py",
        isFolder: false,
        content: `from django import forms\n\nclass UploadFileForm(forms.Form):\n    title = forms.CharField(max_length=50)\n    file = forms.FileField()`
      }
    },
    defaultFile: "views.py",
    simulationType: "none"
  },
  {
    id: "sql-database-nl",
    name: "SQL-database-natural-Language",
    description: "Advanced system that parses natural language questions, translates them into database-optimized SQL queries using NLP models, and retrieves matching query results.",
    visibility: "Public",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    updatedAt: "on Aug 30, 2025",
    stats: { commits: 45, linesOfCode: 2400, complexity: "High" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["agent.py", "db_utils.py", "prompts.py"] },
      "agent.py": {
        name: "agent.py",
        isFolder: false,
        content: `from langchain.chains import create_sql_query_chain\nfrom langchain_openai import ChatOpenAI\nfrom db_utils import get_db_schema\n\nclass SQLAgent:\n    def __init__(self, db_uri):\n        self.llm = ChatOpenAI(model="gpt-4", temperature=0)\n        self.db_schema = get_db_schema(db_uri)\n        \n    def translate_query(self, user_question):\n        prompt = f"Schema:\\n{self.db_schema}\\n\\nQuestion: {user_question}\\nSQL:"\n        response = self.llm.predict(prompt)\n        return response.strip()`
      },
      "db_utils.py": {
        name: "db_utils.py",
        isFolder: false,
        content: `import sqlite3\n\ndef get_db_schema(db_uri):\n    # Extracts layout schema metadata from sqlite database\n    return "TABLE users (id INT, name TEXT, email TEXT, state TEXT, orders_count INT)"`
      },
      "prompts.py": {
        name: "prompts.py",
        isFolder: false,
        content: `SYSTEM_PROMPT = """You are a postgres SQL compiler. Output ONLY clean executable SQL, no explanation."""`
      }
    },
    defaultFile: "agent.py",
    simulationType: "sql-query"
  },
  {
    id: "hangman-cli",
    name: "hangman-python-cli",
    description: "Engaging terminal-based implementation of the traditional Hangman word game with clean CLI graphic boards and animations.",
    visibility: "Public",
    language: "Python",
    languageColor: "#3572A5",
    stars: 1,
    updatedAt: "on Jul 9, 2025",
    stats: { commits: 9, linesOfCode: 280, complexity: "Low" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["hangman.py", "words.txt"] },
      "hangman.py": {
        name: "hangman.py",
        isFolder: false,
        content: `import random\n\nHANGMAN_PICS = ['''\n  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========''', '''\n  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========''']\n\ndef main():\n    words = open('words.txt').read().split()\n    secret = random.choice(words)\n    print("Welcome to Hangman CLI!")`
      },
      "words.txt": {
        name: "words.txt",
        isFolder: false,
        content: `artificial\nintelligence\ndatabase\nscience\nlearning\nneural`
      }
    },
    defaultFile: "hangman.py",
    simulationType: "none"
  },
  {
    id: "voice-to-text",
    name: "Voice-to-Text",
    description: "Speech-to-text transcription service integrating local neural models, capturing microphone arrays, and outputting transcript tokens in real-time.",
    visibility: "Public",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    updatedAt: "on Jul 8, 2025",
    stats: { commits: 21, linesOfCode: 1560, complexity: "High" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["recognizer.py", "audio_feed.py"] },
      "recognizer.py": {
        name: "recognizer.py",
        isFolder: false,
        content: `import whisper\n\nclass Transcriber:\n    def __init__(self):\n        self.model = whisper.load_model("base")\n        \n    def transcribe_chunk(self, audio_path):\n        result = self.model.transcribe(audio_path)\n        return result["text"]`
      },
      "audio_feed.py": {
        name: "audio_feed.py",
        isFolder: false,
        content: `import pyaudio\n# High speed voice audio input feed config...`
      }
    },
    defaultFile: "recognizer.py",
    simulationType: "text-to-speech"
  },
  {
    id: "trutle",
    name: "Trutle",
    description: "Interactive visual algorithm drawing board and turtle-style shape renderer with vector math utilities and loop routines.",
    visibility: "Public",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    updatedAt: "on Jul 8, 2025",
    stats: { commits: 7, linesOfCode: 420, complexity: "Low" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["drawing.py"] },
      "drawing.py": {
        name: "drawing.py",
        isFolder: false,
        content: `import turtle\n\ndef draw_fractal(t, depth, length):\n    if depth == 0:\n        t.forward(length)\n        return\n    draw_fractal(t, depth-1, length/3)\n    t.left(60)\n    draw_fractal(t, depth-1, length/3)\n    t.right(120)`
      }
    },
    defaultFile: "drawing.py",
    simulationType: "none"
  },
  {
    id: "chatbot",
    name: "chatbot",
    description: "Modular conversational utility framework providing customizable agent states, direct response pipelines, and support for vector knowledge sources.",
    visibility: "Public",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    updatedAt: "on Jul 8, 2025",
    stats: { commits: 15, linesOfCode: 900, complexity: "Medium" },
    fileSystem: {
      "root": { name: "Root", isFolder: true, children: ["bot.py", "responses.json"] },
      "bot.py": {
        name: "bot.py",
        isFolder: false,
        content: `import json\n\nclass Chatbot:\n    def __init__(self):\n        with open('responses.json') as f:\n            self.intents = json.load(f)\n            \n    def reply(self, msg):\n        return self.intents.get(msg.lower(), "I don't understand that query yet.")`
      },
      "responses.json": {
        name: "responses.json",
        isFolder: false,
        content: `{\n  "hello": "Hi there! How can I help you?",\n  "who are you": "I am Anurag's chatbot assistant."\n}`
      }
    },
    defaultFile: "bot.py",
    simulationType: "none"
  }
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedVisibility, setSelectedVisibility] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeProject, setActiveProject] = useState<ProjectItem>(projectsData[1]); // Default to Face Detection (interactive)
  const [selectedFileKey, setSelectedFileKey] = useState<string>("main.py");
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    src: true,
    routes: true,
    models: true,
    components: true,
    context: true
  });

  // Unique Languages helper
  const languages = ["All", "Python", "TypeScript", "JavaScript", "HTML", "CSS"];

  // Sync default file when active project changes
  useEffect(() => {
    setSelectedFileKey(activeProject.defaultFile);
  }, [activeProject]);

  // Filters calculation
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchLanguage =
        selectedLanguage === "All" ||
        project.language.toLowerCase() === selectedLanguage.toLowerCase();

      const matchVisibility =
        selectedVisibility === "All" ||
        project.visibility.toLowerCase() === selectedVisibility.toLowerCase();

      return matchSearch && matchLanguage && matchVisibility;
    });
  }, [searchQuery, selectedLanguage, selectedVisibility]);

  // File explorer toggle
  const toggleFolder = (folderKey: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey]
    }));
  };

  return (
    <main className="portfolio-frame">
      <div className="ambient-glow" />
      <Header />

      <div className="projects-page-wrapper">
        {/* Page Titles */}
        <div className="projects-hero">
          <span className="skill-detail-category">Anurag's Codebase Registry</span>
          <h2 className="hero-title" style={{ fontSize: "3.2rem", fontWeight: "800", marginTop: "4px" }}>
            My Repositories
          </h2>
          <p className="hero-paragraph" style={{ marginLeft: 0, marginTop: "12px", fontSize: "1.05rem", color: "var(--text-grey)", maxWidth: "600px" }}>
            Explore an interactive inventory of my software projects. Filter by language or visibility, browse simulated repository file trees, inspect code files, and run live console simulations.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="toolbar-container glass-card">
          <div className="search-bar-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search repositories by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-row">
            {/* Language filter group */}
            <div className="filter-group">
              <span className="filter-label">Language:</span>
              <div className="filter-tabs">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`filter-tab-btn ${selectedLanguage === lang ? "active" : ""}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility filter group */}
            <div className="filter-group">
              <span className="filter-label">Access:</span>
              <div className="filter-tabs">
                {["All", "Public", "Private"].map((vis) => (
                  <button
                    key={vis}
                    onClick={() => setSelectedVisibility(vis)}
                    className={`filter-tab-btn ${selectedVisibility === vis ? "active" : ""}`}
                  >
                    {vis}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Switcher */}
            <div className="layout-switch-wrapper">
              <button
                onClick={() => setViewMode("grid")}
                className={`layout-switch-btn ${viewMode === "grid" ? "active" : ""}`}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`layout-switch-btn ${viewMode === "list" ? "active" : ""}`}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Projects List + Inspector Panel */}
        <div className="projects-grid-layout">
          {/* Left Panel: Project Cards */}
          <div className="projects-list-panel">
            {filteredProjects.length === 0 ? (
              <div className="no-projects-card glass-card flex-col items-center justify-center p-6 text-center">
                <SearchCode size={40} className="text-orange mb-3" />
                <h4 className="text-white mb-2">No Repositories Found</h4>
                <p className="text-sm text-dim">
                  We couldn't find any projects matching "{searchQuery}" with the selected filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLanguage("All");
                    setSelectedVisibility("All");
                  }}
                  className="tab-btn mt-2 active"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "projects-cards-grid" : "projects-cards-list"}>
                {filteredProjects.map((proj) => {
                  const isActive = activeProject.id === proj.id;
                  return (
                    <div
                      key={proj.id}
                      onClick={() => setActiveProject(proj)}
                      className={`project-display-card glass-card ${isActive ? "active" : ""} ${viewMode === "list" ? "list-item-row" : ""}`}
                    >
                      <div className="proj-card-main-info">
                        <div className="proj-card-header-row">
                          <h3 className="proj-card-title">{proj.name}</h3>
                          <div className="proj-card-badges">
                            <span className={`visibility-badge ${proj.visibility.toLowerCase()}`}>
                              {proj.visibility}
                            </span>
                            {proj.stars > 0 && (
                              <span className="stars-badge">
                                <Star size={12} className="star-icon fill-orange" />
                                {proj.stars}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="proj-card-desc">{proj.description}</p>
                      </div>

                      <div className="proj-card-footer-row">
                        <div className="proj-tech-indicators">
                          <span
                            className="language-dot"
                            style={{ backgroundColor: proj.languageColor }}
                          />
                          <span className="language-name text-sm text-white">{proj.language}</span>
                        </div>
                        <span className="proj-update-time text-xs text-dim">
                          Updated {proj.updatedAt}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Panel: Project Inspector */}
          <div className="project-inspector-panel glass-card">
            <div className="inspector-sticky-content">
              {/* Header Title */}
              <div className="inspector-header">
                <div className="flex-row-between w-full">
                  <div>
                    <span className="skill-detail-category">Inspector Panel</span>
                    <h3 className="inspector-project-title text-white flex-row items-center gap-2">
                      {activeProject.name}
                      <span className={`visibility-badge ${activeProject.visibility.toLowerCase()}`}>
                        {activeProject.visibility}
                      </span>
                    </h3>
                  </div>
                  <a
                    href="https://github.com/anuragkumar012"
                    target="_blank"
                    rel="noreferrer"
                    className="inspector-github-link btn-touch"
                    style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                  >
                    GitHub
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Analytics stats */}
              <div className="inspector-metrics-grid">
                <div className="metric-box">
                  <span className="metric-label flex-row items-center gap-1"><GitCommit size={12} /> Commits</span>
                  <span className="metric-value text-orange">{activeProject.stats.commits}</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label flex-row items-center gap-1"><Code2 size={12} /> Lines of Code</span>
                  <span className="metric-value text-white">{activeProject.stats.linesOfCode.toLocaleString()}</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label flex-row items-center gap-1"><Cpu size={12} /> Complexity</span>
                  <span className="metric-value text-white">{activeProject.stats.complexity}</span>
                </div>
              </div>

              {/* Sub-Layout: Explorer & Editor */}
              <div className="inspector-workspace">
                {/* File Explorer Tree */}
                <div className="file-tree-sidebar">
                  <h4 className="sidebar-section-title">Workspace Files</h4>
                  <div className="file-tree-scroller">
                    {renderFileNode("root", activeProject.fileSystem, 0, selectedFileKey, setSelectedFileKey, expandedFolders, toggleFolder)}
                  </div>
                </div>

                {/* Simulated Editor Code Block */}
                <div className="code-editor-viewport">
                  <div className="editor-tab-header">
                    <div className="window-dots">
                      <span className="dot red" />
                      <span className="dot yellow" />
                      <span className="dot green" />
                    </div>
                    <span className="active-editor-filename flex-row items-center gap-1 text-xs">
                      <FileCode size={12} className="text-orange" />
                      {selectedFileKey}
                    </span>
                  </div>

                  <div className="editor-code-body">
                    <pre className="code-pre">
                      {activeProject.fileSystem[selectedFileKey]?.content ? (
                        activeProject.fileSystem[selectedFileKey].content
                      ) : (
                        <span className="text-dim italic">// Selected item is a directory or has no viewable content.</span>
                      )}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Custom Simulation Sandbox */}
              {activeProject.simulationType !== "none" && (
                <div className="inspector-simulation-container">
                  <h4 className="sidebar-section-title flex-row items-center gap-2">
                    <Sparkles size={14} className="text-orange" />
                    Live System Simulation Sandbox
                  </h4>
                  <div className="simulation-sandbox-box">
                    <ProjectSimulationWidget type={activeProject.simulationType} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ----------------------------------------------------------------------
// Sub-Component: Recursive File System Renderer
// ----------------------------------------------------------------------
function renderFileNode(
  nodeKey: string,
  fileSystem: Record<string, ProjectFile>,
  depth: number,
  selectedFileKey: string,
  setSelectedFileKey: (key: string) => void,
  expandedFolders: Record<string, boolean>,
  toggleFolder: (key: string) => void
): React.ReactNode {
  const node = fileSystem[nodeKey];
  if (!node) return null;

  const isSelected = selectedFileKey === nodeKey;
  const isExpanded = expandedFolders[nodeKey] || false;

  if (node.isFolder) {
    return (
      <div key={nodeKey} className="file-node-folder-wrapper">
        <div
          onClick={() => toggleFolder(nodeKey)}
          className={`file-tree-item folder-item depth-${depth} ${isExpanded ? "expanded" : ""}`}
          style={{ paddingLeft: `${depth * 14 + 10}px` }}
        >
          <ChevronRight size={14} className={`folder-arrow ${isExpanded ? "rotated" : ""}`} />
          <Folder size={14} className="folder-icon" />
          <span className="file-name">{node.name}</span>
        </div>
        {isExpanded && node.children && (
          <div className="folder-children-container">
            {node.children.map((childKey) =>
              renderFileNode(childKey, fileSystem, depth + 1, selectedFileKey, setSelectedFileKey, expandedFolders, toggleFolder)
            )}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div
        key={nodeKey}
        onClick={() => setSelectedFileKey(nodeKey)}
        className={`file-tree-item file-item depth-${depth} ${isSelected ? "active" : ""}`}
        style={{ paddingLeft: `${depth * 14 + 18}px` }}
      >
        <File size={13} className="file-icon" />
        <span className="file-name">{node.name}</span>
      </div>
    );
  }
}

// ----------------------------------------------------------------------
// Sub-Component: Project Live Simulation Sandbox
// ----------------------------------------------------------------------
interface SimulationWidgetProps {
  type: "face-detection" | "sql-query" | "chat-room" | "api-response" | "text-to-speech";
}

function ProjectSimulationWidget({ type }: SimulationWidgetProps) {
  switch (type) {
    case "face-detection":
      return <FaceDetectionSimulator />;
    case "sql-query":
      return <SQLQuerySimulator />;
    case "chat-room":
      return <ChatRoomSimulator />;
    case "api-response":
      return <CateringAPISimulator />;
    case "text-to-speech":
      return <SpeechTranscriptionSimulator />;
    default:
      return null;
  }
}

// 1. Face Detection System Sandbox
function FaceDetectionSimulator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    "[SYS] Loading model weights Yolov8-face...",
    "[SYS] OpenCV video feed mapped to stream device /dev/video0",
    "[SYS] CUDA hardware acceleration verified successfully."
  ]);
  const [facesDetected, setFacesDetected] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const x = Math.floor(Math.random() * 300) + 50;
      const y = Math.floor(Math.random() * 150) + 40;
      const conf = (90 + Math.random() * 9.5).toFixed(2);
      const faceCount = Math.floor(Math.random() * 2) + 1;

      setFacesDetected(faceCount);
      setLogs((prev) => [
        `[DETECTION] Found ${faceCount} target face(s) | coordinates=[x:${x}, y:${y}] | confidence=${conf}%`,
        ...prev.slice(0, 10)
      ]);
    }, 1800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="simulation-widget-body flex-row gap-4">
      {/* Visual Canvas Display */}
      <div className="sim-visual-display flex-1 relative justify-center">
        {isPlaying ? (
          <div className="video-scanline-container w-full h-full relative overflow-hidden">
            <div className="scanline" />
            <div className="live-stream-badge">
              <span className="simulation-dot" /> LIVE STREAM
            </div>
            {/* Simulated target box overlay */}
            <div
              className="face-target-box"
              style={{
                top: facesDetected === 1 ? "35%" : "20%",
                left: facesDetected === 1 ? "40%" : "25%",
                width: facesDetected === 1 ? "75px" : "60px",
                height: facesDetected === 1 ? "75px" : "60px",
                borderColor: "#4cd964"
              }}
            >
              <div className="face-target-label">
                FACE: 98.4%
              </div>
            </div>

            {facesDetected > 1 && (
              <div
                className="face-target-box"
                style={{
                  top: "45%",
                  left: "60%",
                  width: "55px",
                  height: "55px",
                  borderColor: "#4cd964"
                }}
              >
                <div className="face-target-label">
                  FACE: 92.1%
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-dim italic flex-row gap-2 items-center">
            <ShieldAlert size={16} /> Device stream halted.
          </div>
        )}
      </div>

      {/* Control Console */}
      <div className="sim-console-panel flex-1 flex-col">
        <div className="console-title flex-row-between">
          <span className="text-xs text-white">Biometric Log Output</span>
          <button onClick={() => setIsPlaying(!isPlaying)} className="de-btn-run" style={{ padding: "4px 8px", fontSize: "10px" }}>
            {isPlaying ? "Halt Stream" : "Run Stream"}
          </button>
        </div>
        <div className="console-log-area de-terminal">
          {logs.map((log, index) => (
            <div key={index} className={log.includes("[SYS]") ? "de-terminal-success" : ""}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. SQL Query Database natural Language Translator Sandbox
function SQLQuerySimulator() {
  const [queryInput, setQueryInput] = useState("Show all users from NY who bought catering services");
  const [isCompiling, setIsCompiling] = useState(false);
  const [outputQuery, setOutputQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const sampleQueries = [
    "List orders with total above 100 dollars",
    "Show total count of registered doctors",
    "Get messages from chat.adv system last week"
  ];

  const handleQuery = () => {
    setIsCompiling(true);
    setTimeout(() => {
      let sql = "";
      let mockRows = [];

      if (queryInput.toLowerCase().includes("ny")) {
        sql = "SELECT id, name, email, state, orders_count\nFROM users\nWHERE state = 'NY'\nORDER BY orders_count DESC;";
        mockRows = [
          { id: 104, name: "Jessica Miller", email: "jess.m@yahoo.com", state: "NY", orders_count: 5 },
          { id: 201, name: "David Chen", email: "dchen@gmail.com", state: "NY", orders_count: 2 }
        ];
      } else if (queryInput.toLowerCase().includes("100")) {
        sql = "SELECT order_id, customer, total_amount, status\nFROM catering_orders\nWHERE total_amount > 100.00\nLIMIT 5;";
        mockRows = [
          { order_id: "ORD-942", customer: "Amara Woods", total_amount: "$240.00", status: "Paid" },
          { order_id: "ORD-911", customer: "John Doe", total_amount: "$125.50", status: "Completed" }
        ];
      } else if (queryInput.toLowerCase().includes("doctor")) {
        sql = "SELECT COUNT(doctor_id) AS total_doctors, department\nFROM medical_staff\nGROUP BY department;";
        mockRows = [
          { total_doctors: 12, department: "Cardiology" },
          { total_doctors: 8, department: "Pediatrics" },
          { total_doctors: 15, department: "General Medicine" }
        ];
      } else {
        sql = "SELECT message_id, content, sender, timestamp\nFROM telemetry_logs\nWHERE timestamp > NOW() - INTERVAL '7 days'\nORDER BY timestamp DESC;";
        mockRows = [
          { message_id: 8520, content: "Socket connected: node-8", sender: "chat.adv", timestamp: "2026-06-08 14:21" },
          { message_id: 8519, content: "Rate limits cleared for 192.168.1.1", sender: "system", timestamp: "2026-06-08 14:15" }
        ];
      }

      setOutputQuery(sql);
      setResults(mockRows);
      setIsCompiling(false);
    }, 1200);
  };

  return (
    <div className="simulation-widget-body flex-col gap-3">
      {/* Input box */}
      <div className="nl-query-input-row flex-row gap-2">
        <input
          type="text"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          placeholder="Ask database in natural English..."
          className="search-input flex-1"
          style={{ background: "#050507", padding: "8px 12px" }}
        />
        <button onClick={handleQuery} disabled={isCompiling} className="de-btn-run">
          <Play size={12} />
          {isCompiling ? "Translating..." : "Translate"}
        </button>
      </div>

      {/* Suggested prompts list */}
      <div className="flex-row gap-2 items-center">
        <span className="text-xs text-dim">Quick query:</span>
        {sampleQueries.slice(0, 2).map((q) => (
          <button
            key={q}
            onClick={() => setQueryInput(q)}
            className="tab-btn"
            style={{ padding: "4px 10px", fontSize: "10px" }}
          >
            "{q.substring(0, 25)}..."
          </button>
        ))}
      </div>

      {/* SQL translation & result table */}
      {outputQuery && (
        <div className="flex-row gap-4 mt-2" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "10px" }}>
          {/* SQL Block */}
          <div className="flex-1 flex-col">
            <span className="sim-section-label text-orange mb-1">Generated SQL AST</span>
            <pre className="de-terminal" style={{ height: "75px", padding: "6px", margin: 0 }}>
              {outputQuery}
            </pre>
          </div>

          {/* Results Grid Table */}
          <div className="flex-1 flex-col">
            <span className="sim-section-label text-white mb-1">DB Returned Rows ({results.length})</span>
            <div className="de-terminal" style={{ height: "75px", padding: "6px", margin: 0, overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "8px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", textAlign: "left" }}>
                    {results[0] && Object.keys(results[0]).map((key) => (
                      <th key={key} style={{ padding: "2px 4px", color: "var(--orange-accent)" }}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      {Object.values(row).map((val: any, j) => (
                        <td key={j} style={{ padding: "2px 4px" }}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 3. NEXUS-CHAT Socket.io Chatroom Sandbox
function ChatRoomSimulator() {
  const [messages, setMessages] = useState<any[]>([
    { sender: "System", content: "Connected to Socket room #general. Encryption key active.", time: "17:30" },
    { sender: "client_942", content: "Deployment successful on port 4000. Testing endpoints.", time: "17:31" }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleSendMessage = () => {
    if (!inputVal.trim()) return;

    const newMsg = { sender: "You", content: inputVal, time: "17:33" };
    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");

    // Bot Auto responses mock
    setTimeout(() => {
      const responses = [
        "WebSocket broadcast complete to [node_2, node_9].",
        "Acknowledged. Payload decrypted using AES-256.",
        "Ping latency logged: 12ms."
      ];
      const botMsg = {
        sender: "Nexus_Server",
        content: responses[Math.floor(Math.random() * responses.length)],
        time: "17:33"
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="simulation-widget-body flex-col gap-3">
      {/* Messages area */}
      <div className="chat-messages-container de-terminal" style={{ height: "100px", padding: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {messages.map((m, idx) => (
          <div key={idx} className="chat-msg-row flex-row gap-1 text-[9px]">
            <span style={{ color: m.sender === "You" ? "var(--orange-accent)" : m.sender === "System" ? "#4cd964" : "#ff8a65", fontWeight: "bold" }}>
              [{m.sender}]:
            </span>
            <span className="text-white flex-1">{m.content}</span>
            <span className="text-dim text-[8px]">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Input controls */}
      <div className="chat-controls-row flex-row gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Send socket message..."
          className="search-input flex-1"
          style={{ background: "#050507", padding: "6px 12px" }}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="de-btn-run" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Send size={11} />
          Send
        </button>
      </div>
    </div>
  );
}

// 4. Catering Backend API request/response simulator
function CateringAPISimulator() {
  const [selectedRoute, setSelectedRoute] = useState("GET /api/menu");
  const [responseJSON, setResponseJSON] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchAPI = () => {
    setIsLoading(true);
    setTimeout(() => {
      let json = "";
      if (selectedRoute === "GET /api/menu") {
        json = JSON.stringify([
          { id: 1, name: "Premium Buffet Package", price: 45.00, vegetarian: true },
          { id: 2, name: "Corporate Lunch Pack", price: 18.50, vegetarian: false },
          { id: 3, name: "Veggie Feast Selection", price: 22.00, vegetarian: true }
        ], null, 2);
      } else {
        json = JSON.stringify({
          success: true,
          message: "Order queued in Redis pool.",
          payload: {
            order_id: Math.floor(Math.random() * 8000) + 1000,
            items: [{ id: 1, quantity: 20 }],
            total: 900.00,
            status: "Stripe_Intent_Created"
          }
        }, null, 2);
      }
      setResponseJSON(json);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="simulation-widget-body flex-row gap-4">
      {/* Router selector controls */}
      <div className="api-routes-selector flex-col gap-2">
              <span className="sim-section-label text-dim">Endpoints</span>
              {["GET /api/menu", "POST /api/orders"].map((route) => (
                <button
                  key={route}
                  onClick={() => setSelectedRoute(route)}
                  className={`tab-btn text-left ${selectedRoute === route ? "active" : ""}`}
                  style={{ width: "130px", padding: "6px 12px", fontSize: "10px" }}
                >
            {route}
          </button>
        ))}
        <button onClick={handleFetchAPI} className="de-btn-run mt-2">
          {isLoading ? "Fetching..." : "Fetch Request"}
        </button>
      </div>

      {/* JSON Viewer */}
      <div className="api-response-panel flex-1 flex-col">
        <span className="sim-section-label text-white mb-1">Server JSON Response</span>
        <pre className="de-terminal flex-1" style={{ margin: 0, height: "100px", padding: "8px", overflow: "auto" }}>
          {responseJSON ? responseJSON : "// Click 'Fetch Request' to send payload request."}
        </pre>
      </div>
    </div>
  );
}

// 5. Voice to Text speech neural translator simulator
function SpeechTranscriptionSimulator() {
  const [isListening, setIsListening] = useState(false);
  const [waves, setWaves] = useState<number[]>([10, 20, 15, 30, 25, 40, 12, 18, 28, 10]);
  const [transcripts, setTranscripts] = useState<string>("");

  useEffect(() => {
    if (!isListening) return;

    let index = 0;
    const spokenText = [
      "Starting transcription session.",
      "Neural models loaded successfully.",
      "Hello, my name is Anurag Kumar.",
      "I am testing a face detection system built on PyTorch."
    ];

    const animation = setInterval(() => {
      // Animate simulated audio waves
      setWaves(Array.from({ length: 10 }, () => Math.floor(Math.random() * 38) + 4));
    }, 150);

    const textFeed = setInterval(() => {
      if (index < spokenText.length) {
        setTranscripts((prev) => (prev ? prev + " \n" + spokenText[index] : spokenText[index]));
        index++;
      } else {
        clearInterval(textFeed);
      }
    }, 2000);

    return () => {
      clearInterval(animation);
      clearInterval(textFeed);
    };
  }, [isListening]);

  return (
    <div className="simulation-widget-body flex-row gap-4">
      {/* Mic controller & Wave visual */}
      <div className="audio-wave-visualizer flex-col justify-center items-center gap-2" style={{ width: "140px" }}>
        {/* Animated wave bars */}
        <div className="flex-row gap-1 items-end justify-center" style={{ height: "45px", width: "100%", background: "#050507", borderRadius: "6px", border: "1px solid var(--border-subtle)", padding: "4px" }}>
          {waves.map((w, idx) => (
            <div
              key={idx}
              className="bg-orange"
              style={{
                width: "4px",
                height: isListening ? `${w}px` : "4px",
                borderRadius: "2px",
                transition: "height 0.1s ease",
                backgroundColor: "var(--orange-accent)"
              }}
            />
          ))}
        </div>

        <button
          onClick={() => {
            setIsListening(!isListening);
            setTranscripts("");
          }}
          className="de-btn-run"
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
        >
          <Volume2 size={13} />
          {isListening ? "Mute Mic" : "Start Mic"}
        </button>
      </div>

      {/* Transcription outputs */}
      <div className="transcripts-log-panel flex-1 flex-col">
        <span className="sim-section-label text-white mb-1">Whisper Transcription Output</span>
        <div className="de-terminal flex-1" style={{ margin: 0, height: "100px", padding: "8px", overflow: "auto", whiteSpace: "pre-line" }}>
          {transcripts ? transcripts : isListening ? "... Listening to audio stream ..." : "// Click 'Start Mic' and speak to simulate whisper parsing."}
        </div>
      </div>
    </div>
  );
}
