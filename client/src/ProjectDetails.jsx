import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  CalendarDays,
  Building2,
  FolderKanban,
  PhoneCall,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useSettings from "./useSettings";

export default function ProjectDetails() {
  const settings = useSettings();
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [project, setProject] = useState(null);
  const [mainMedia, setMainMedia] = useState({
    type: "image",
    src: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`);
      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setProject(data);

      setMainMedia({
        type: "image",
        src: data.coverImage || data.images?.[0] || "",
      });
    } catch (error) {
      console.log(error);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Project Not Found
      </div>
    );
  }

  const mediaList = [
    project.coverImage && {
      type: "image",
      src: project.coverImage,
      label: "Cover",
    },
    project.video && {
      type: "video",
      src: project.video,
      label: "Video",
    },
    ...(project.images || []).map((img, i) => ({
      type: "image",
      src: img,
      label: `Image ${i + 1}`,
    })),
  ].filter(Boolean);

  return (
    <>
      <Navbar />

      <div className="bg-white text-slate-900 min-h-screen pt-20">
        {/* HEADER */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-slate-600"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-semibold uppercase">
                Featured Project
              </span>

              <h1 className="text-4xl lg:text-5xl font-bold mt-4">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.categories?.map((cat, i) => (
                  <span
                    key={i}
                    className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 mt-6 text-sm text-slate-600 flex-wrap">
                <span className="flex items-center gap-2">
                  <FolderKanban size={16} />
                  Industrial Project
                </span>

                <span className="flex items-center gap-2">
                  <Building2 size={16} />
                  MECHROBOT
                </span>

                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  Engineering
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BODY */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
          {/* IMPORTANT FIX */}
          <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
            {/* LEFT SIDE */}
            <div className="min-w-0">
              {/* MAIN IMAGE / VIDEO */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl overflow-hidden bg-slate-100
  h-[260px] sm:h-[380px] md:h-[480px] lg:h-[560px]"
              >
                {mainMedia.type === "video" ? (
                  <video
                    src={mainMedia.src}
                    controls
                    className="w-full h-full object-cover lg:object-contain"
                  />
                ) : (
                  <img
                    src={mainMedia.src || "/no-image.png"}
                    alt={project.title}
                    className="w-full h-full object-cover lg:object-contain"
                  />
                )}
              </motion.div>

              {/* THUMBNAILS */}
              <div className="flex gap-3 mt-5 overflow-x-auto pb-2">
                {mediaList.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setMainMedia(item)}
                    className="shrink-0"
                  >
                    {item.type === "video" ? (
                      <div className="w-24 h-24 rounded-lg overflow-hidden relative bg-slate-200">
                        <video
                          src={item.src}
                          className="w-full h-full object-cover"
                          muted
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <PlayCircle className="text-white w-6 h-6" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.src}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* DESCRIPTION */}
              <div className="mt-14 max-w-full overflow-hidden">
                <h2 className="text-2xl font-bold mb-6">Project Overview</h2>

                <div
                  className="prose prose-lg prose-slate max-w-none break-words
                  prose-headings:text-slate-900
                  prose-headings:font-bold
                  prose-p:leading-8
                  prose-p:mb-5
                  prose-ul:list-disc
                  prose-ul:pl-6
                  prose-li:mb-2
                  prose-strong:text-slate-900
                  prose-a:text-orange-500"
                  dangerouslySetInnerHTML={{
                    __html: project.description,
                  }}
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold mb-8">Project Details</h3>

                  <div className="space-y-6 text-sm">
                    <div>
                      <p className="text-slate-500 mb-1">Categories</p>
                      <div className="flex flex-wrap gap-2">
                        {project.categories?.map((cat, i) => (
                          <span
                            key={i}
                            className="bg-slate-200 px-2 py-1 rounded text-xs"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-500 mb-1">Company</p>
                      <p className="font-semibold">MECHROBOT</p>
                    </div>

                    <div>
                      <p className="text-slate-500 mb-1">Location</p>
                      <p className="font-semibold">Ahmedabad</p>
                    </div>
                  </div>

                  <a
                    href={`https://api.whatsapp.com/send?phone=${settings.whatsapp}`}
                    className="mt-10 w-full bg-orange-500 text-white py-4 rounded-xl font-semibold flex justify-center gap-2"
                  >
                    <PhoneCall size={18} />
                    Request Similar Project
                  </a>
                  <Link
                    to="/projects"
                    className="mt-4 w-full border border-slate-300 py-4 rounded-xl font-semibold flex justify-center gap-2"
                  >
                    View More
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-5">
              Need Custom Industrial Machinery?
            </h2>

            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              We develop SPM machines, conveyors, CAD solutions and industrial
              automation systems for manufacturers.
            </p>

            <a
              href={`https://api.whatsapp.com/send?phone=${settings.whatsapp}&text=Hello MECHROBOT`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-semibold transition"
            >
              Start Your Project
              <ChevronRight size={18} />
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
