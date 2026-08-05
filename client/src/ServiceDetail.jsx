import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useSettings from "./useSettings";
import servicesData from "./data/servicesData";

export default function ServiceDetail() {
  const { slug } = useParams();
  const settings = useSettings();
  const API_URL = import.meta.env.VITE_API_URL;

  const [projects, setProjects] = useState([]);

  const service = servicesData[slug];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!service) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-24 text-2xl font-bold text-[#001f3f]">
          Service Not Found
        </div>
        <Footer />
      </>
    );
  }

  const relatedProjects = projects.filter((project) =>
    project.categories?.includes(service.title),
  );

  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
  };
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white text-[#001f3f]">
        {/* HERO */}
        <section className="bg-[#001f3f] text-white pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-orange-500 font-semibold uppercase tracking-[3px] mb-4">
                Our Services
              </p>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight mb-6">
                {service.title}
              </h1>

              <p className="text-gray-300 text-lg leading-8 max-w-2xl mb-8">
                {service.desc}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://api.whatsapp.com/send?phone=${settings.whatsapp}&text=Hello MECHROBOT`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 px-7 py-3 rounded-xl font-semibold transition"
                >
                  Get Quote
                </a>

                <Link
                  to="/projects"
                  className="border border-white/20 hover:bg-white hover:text-[#001f3f] px-7 py-3 rounded-xl font-semibold transition"
                >
                  View Projects
                </Link>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6">
                Why Businesses Choose Us
              </h3>

              <div className="space-y-4">
                {[
                  "Custom-built engineering solutions",
                  "Industrial-grade execution quality",
                  "Productivity-focused systems",
                  "Timely delivery & support",
                  "Cost-effective implementation",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle className="text-orange-500 w-5 h-5 mt-1" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <p className="text-orange-500 font-semibold uppercase tracking-[3px] mb-3">
                Service Overview
              </p>

              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Precision Solutions for Modern Manufacturing
              </h2>

              <p className="text-gray-700 text-lg leading-9">
                {service.overview}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold mb-6">Key Benefits</h3>

              <div className="space-y-4">
                {[
                  "Higher Productivity",
                  "Reduced Downtime",
                  "Improved Accuracy",
                  "Safer Operations",
                  "Scalable Systems",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <ChevronRight className="text-orange-500 mt-1 w-5 h-5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <p className="text-orange-500 font-semibold uppercase tracking-[3px] mb-3">
              What We Offer
            </p>

            <h2 className="text-3xl md:text-4xl font-black mb-12">
              Complete End-to-End Service Capabilities
            </h2>

            <div className="grid gap-8">
              {service.offers.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center text-xl font-black">
                      {index + 1}
                    </div>

                    <div className="w-full">
                      <h3 className="text-2xl font-bold mb-5">{item.title}</h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        {item.points.map((point, i) => (
                          <div key={i} className="flex gap-3">
                            <CheckCircle className="text-orange-500 w-5 h-5 mt-1 shrink-0" />
                            <p className="text-gray-700 leading-7">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED PROJECTS */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
              <div>
                <p className="text-orange-500 font-semibold uppercase tracking-[3px] mb-2">
                  Portfolio
                </p>

                <h2 className="text-3xl md:text-4xl font-black">
                  Related Projects
                </h2>
              </div>

              <Link
                to="/projects"
                className="text-orange-500 font-semibold inline-flex items-center gap-2"
              >
                View All Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {relatedProjects.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-10 text-center text-gray-500">
                Projects will be updated soon.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map((project) => (
                  <div
                    key={project._id}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={project.coverImage || project.images?.[0]}
                        alt={project.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-7 line-clamp-3">
                        {stripHtml(project.description)}
                      </p>

                      <Link
                        to={`/project/${project._id}`}
                        className="mt-5 inline-flex items-center gap-2 text-orange-500 font-semibold"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#001f3f] text-white py-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-orange-500 font-semibold uppercase tracking-[3px] mb-3">
                Start Your Project
              </p>

              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6">
                Need {service.title} For Your Factory?
              </h2>

              <p className="text-gray-300 text-lg leading-8">
                Talk with our engineering team for a customized solution
                designed around your production goals.
              </p>
            </div>

            <div className="flex lg:justify-end">
              <a
                href={`https://api.whatsapp.com/send?phone=${settings.whatsapp}&text=Hello MECHROBOT`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-2xl font-bold inline-flex items-center gap-3 transition"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Now
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
