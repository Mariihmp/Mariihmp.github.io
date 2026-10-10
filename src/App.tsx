import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { Blog } from "@/pages/Blog";
import { BlogPost } from "@/pages/BlogPost";
import { Projects } from "@/pages/Projects";
import { ProjectDetail } from "@/pages/ProjectDetail";
import { TIL } from "@/pages/TIL";
import { About } from "@/pages/About";

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/til" element={<TIL />} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <div className="max-w-2xl mx-auto px-6 py-12 text-center">
                <h1 className="text-xl font-bold text-nano-text mb-2">404</h1>
                <p className="text-sm text-nano-text-secondary">Page not found.</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
