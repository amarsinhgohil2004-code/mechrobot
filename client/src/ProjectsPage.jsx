import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
    Search,
    ArrowRight,
    FolderKanban,
    Filter,
    ChevronRight,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function ProjectsPage() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = [
        "All",
        "SPM Design & Development",
        "CAD Modeling & Drafting",
        "Material Handling Systems",
        "Pick & Place Automation",
        "Industrial Automation",
        "Machine Modification",
        "Conveyor System"
    ];

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        filterProjects();
    }, [projects, search, activeCategory]);

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/api/projects`);
            const data = await res.json();

            setProjects(data);
            setFilteredProjects(data);
        } catch (error) {
            console.log(error);
        }
    };

    const filterProjects = () => {
        let temp = [...projects];

        if (search.trim() !== "") {
            temp = temp.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (activeCategory !== "All") {
            temp = temp.filter((item) =>
                item.categories?.includes(activeCategory)
            );
        }

        setFilteredProjects(temp);
    };

    // 🔥 REMOVE HTML TAGS FROM DESCRIPTION
    const stripHtml = (html) => {
        if (!html) return "";
        return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-white text-slate-900">

                {/* HERO */}
                <section className="bg-slate-900 text-white pt-32 pb-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">

                        <p className="uppercase tracking-[4px] text-orange-400 text-sm font-semibold mb-4">
                            Portfolio
                        </p>

                        <h1 className="text-3xl md:text-6xl font-bold leading-tight">
                            Our Engineering Projects
                        </h1>

                        <p className="mt-6 max-w-2xl mx-auto text-slate-300 text-base md:text-lg leading-7 md:leading-8">
                            Explore our industrial automation systems, CAD designs,
                            machine development, conveyors and precision engineering work.
                        </p>

                    </div>
                </section>

                {/* FILTER */}
                <section className="bg-white border-b border-slate-200 sticky top-16 md:top-20 z-30">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">

                        <div className="flex flex-col lg:flex-row gap-5 justify-between">

                            <div className="relative w-full lg:w-[400px]">
                                <Search
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />

                                <input
                                    type="text"
                                    placeholder="Search Projects..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-orange-500"
                                />
                            </div>

                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide w-full lg:w-auto">
                                {categories.map((cat, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === cat
                                            ? "bg-orange-500 text-white"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>

                {/* PROJECTS */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">

                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold">
                                {filteredProjects.length} Projects Found
                            </h2>

                            <div className="hidden md:flex items-center gap-2 text-slate-500">
                                <Filter size={18} />
                                <span className="text-sm">Filtered Results</span>
                            </div>
                        </div>

                        {filteredProjects.length === 0 && (
                            <div className="text-center py-20">
                                <FolderKanban
                                    size={55}
                                    className="mx-auto text-slate-300 mb-4"
                                />
                                <h3 className="text-2xl font-semibold mb-2">
                                    No Projects Found
                                </h3>
                                <p className="text-slate-500">
                                    Try another search or category.
                                </p>
                            </div>
                        )}

                        {/* CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.07 }}
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        to={`/project/${project._id}`}
                                        className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-500"
                                    >

                                        {/* IMAGE */}
                                        <div className="overflow-hidden relative">
                                            <img
                                                src={project.coverImage || project.images?.[0]}
                                                className="w-full h-52 md:h-64 object-cover group-hover:scale-110 transition duration-700"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="p-6">

                                            {/* CATEGORY */}
                                            {/* <div className="flex flex-wrap gap-2 mb-4">
                                                {project.categories?.slice(0, 2).map((cat, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold"
                                                    >
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div> */}

                                            {/* TITLE */}
                                            <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition">
                                                {project.title}
                                            </h3>

                                            {/* DESCRIPTION CLEAN */}
                                            <p className="text-slate-600 text-sm leading-7 line-clamp-3 min-h-[84px]">
                                                {stripHtml(project.description)}
                                            </p>

                                            {/* BUTTON */}
                                            <div className="mt-6 flex items-center gap-2 text-orange-500 font-semibold text-sm group-hover:gap-3 transition-all">
                                                View Details
                                                <ChevronRight size={17} />
                                            </div>

                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* CTA */}
                <section className="bg-slate-900 text-white py-20 mt-10">
                    <div className="max-w-5xl mx-auto px-6 text-center">

                        <h2 className="text-4xl font-bold mb-5">
                            Need Similar Industrial Project?
                        </h2>

                        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-8 mb-8">
                            We design custom machinery, CAD models, conveyors,
                            SPM systems and complete industrial automation solutions.
                        </p>

                        <a
                            href="https://wa.me/918347585234"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-semibold transition"
                        >
                            Contact Us
                            <ArrowRight size={18} />
                        </a>

                    </div>
                </section>

            </div>

            <Footer />
        </>
    );
}