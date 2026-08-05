import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
    Settings,
    PenTool,
    Layers,
    Cpu,
    Wrench,
    Activity,
    ChevronRight,
    Truck
} from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 1️Import your PNG icons at top with other imports
import spmIcon from "./assets/spm.png";
import cadIcon from "./assets/cad.png";
import materialIcon from "./assets/material.png";
import pickplaceIcon from "./assets/pickplace.png";
import automationIcon from "./assets/industrial.png";
import machineIcon from "./assets/machine.png";
import conveyorIcon from "./assets/conveyour.png";

export default function ServicesPage() {

    const services = [
        {
            title: "SPM Design & Development",
            slug: "spm-design",
            desc: "Custom-built special purpose machines designed to optimize your unique manufacturing processes.",
            icon: spmIcon,
        },
        {
            title: "CAD Modeling & Drafting",
            slug: "cad-modeling",
            desc: "Precision CAD Modeling & Manufacturing-Ready Drafting Solutions.",
            icon: cadIcon,
        },
        {
            title: "Material Handling Systems",
            slug: "material-handling",
            desc: "Reduce Manpower with Safe, Fast & Efficient Material Handling Systems.",
            icon: materialIcon,
        },
        {
            title: "Pick & Place Automation",
            slug: "pick-place",
            desc: "Pick & Place Systems for Fast, Accurate & Efficient Production.",
            icon: pickplaceIcon,
        },
        {
            title: "Industrial Automation",
            slug: "industrial-automation",
            desc: "Smart Industrial Automation for Higher Productivity, Efficiency & Speed.",
            icon: automationIcon,
        },
        {
            title: "Machine Modification",
            slug: "machine-modification",
            desc: "Machine Modifications to Improve Efficiency & Reduce Downtime.",
            icon: machineIcon,
        },
        {
            title: "Conveyor System",
            slug: "conveyor-system",
            desc: "Efficient Conveyor Systems for Smooth & Continuous Material Flow.",
            icon: conveyorIcon,
        },
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-white text-[#001f3f]">

                {/* HERO */}
                <section className="bg-[#001f3f] text-white pt-28 pb-16 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Our Services
                        </h1>
                        <p className="text-gray-300 max-w-2xl">
                            Complete engineering & automation solutions for industrial needs.
                        </p>
                    </div>
                </section>

                {/* GRID */}
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {services.map((service, index) => (
                            <motion.div
                                key={service.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 border border-gray-100 group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                            >

                                {/* top bar */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-orange-500 transition-colors"></div>

                                {/* icon */}
                                <div className="w-14 h-14 bg-gray-50 rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors p-2">
                                    <img
                                        src={service.icon}
                                        alt={service.title}
                                        className="w-8 h-8 object-contain"
                                    />
                                </div>

                                {/* title */}
                                <h4 className="text-xl font-bold text-[#001f3f] mb-4 group-hover:text-orange-500 transition-colors">
                                    {service.title}
                                </h4>

                                {/* desc */}
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {service.desc}
                                </p>

                                {/* link */}
                                <Link
                                    to={`/services/${service.slug}`}
                                    className="mt-8 pt-6 border-t border-gray-100 flex items-center text-sm font-semibold text-[#001f3f] group-hover:text-orange-500 transition-colors"
                                >
                                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>

                            </motion.div>
                        ))}

                    </div>
                </section>

            </div>

            <Footer />
        </>
    );
}