import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Menu,
  X,
  Settings,
  PenTool,
  Layers,
  Cpu,
  Wrench,
  Activity,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight,
  Cog,
  MessageCircle,
} from "lucide-react";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import heroFactory from "./assets/hero-factory1.png";

import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
// 1️Import your PNG icons at top with other imports

import spmIcon from "./assets/spm.png";
import cadIcon from "./assets/cad.png";
import materialIcon from "./assets/material.png";
import pickplaceIcon from "./assets/pickplace.png";
import automationIcon from "./assets/industrial.png";
import machineIcon from "./assets/machine.png";
import conveyorIcon from "./assets/conveyour.png";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    personName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [flash, setFlash] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [settings, setSettings] = useState({
    phone: "",
    email: "",
    whatsapp: "",
    address: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    fetchProjects();
    fetchSettings();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings`);
      const data = await res.json();

      setSettings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.log("Fetch Error:", error);
      setProjects([]);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setFlash({
          show: true,
          type: "success",
          message: "Inquiry Submitted Successfully",
        });

        setTimeout(() => {
          setFlash({ show: false, type: "", message: "" });
        }, 3000);

        setFormData({
          companyName: "",
          personName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setFlash({
          show: true,
          type: "error",
          message: data.message || "Something went wrong",
        });

        setTimeout(() => {
          setFlash({ show: false, type: "", message: "" });
        }, 3000);
      }
    } catch (error) {
      alert("Server Error");
    }

    setLoading(false);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    {
      title: "SPM Design & Development",
      slug: "spm-design",
      description:
        "Custom-built special purpose machines designed to optimize your unique manufacturing processes.",
      icon: spmIcon,
    },
    {
      title: "CAD Modeling & Drafting",
      slug: "cad-modeling",
      description:
        "Precision CAD Modeling & Manufacturing-Ready Drafting Solutions.",
      icon: cadIcon,
    },
    {
      title: "Material Handling Systems",
      slug: "material-handling",
      description:
        "Reduce Manpower with Safe, Fast & Efficient Material Handling Systems.",
      icon: materialIcon,
    },
    {
      title: "Pick & Place Automation",
      slug: "pick-place",
      description:
        "Pick & Place Systems for Fast, Accurate & Efficient Production.",
      icon: pickplaceIcon,
    },
    {
      title: "Industrial Automation",
      slug: "industrial-automation",
      description:
        "Smart Industrial Automation for Higher Productivity, Efficiency & Speed.",
      icon: automationIcon,
    },
    {
      title: "Machine Modification",
      slug: "machine-modification",
      description:
        "Machine Modifications to Improve Efficiency & Reduce Downtime.",
      icon: machineIcon,
    },
    {
      title: "Conveyor System",
      slug: "conveyor-system",
      description:
        "Efficient Conveyor Systems for Smooth & Continuous Material Flow.",
      icon: conveyorIcon,
    },
  ];

  const features = [
    {
      title: "Precision Engineering",
      description: "Exacting tolerances for critical applications.",
      icon: Activity,
    },
    {
      title: "On-time Delivery",
      description: "Strict adherence to project timelines.",
      icon: CheckCircle,
    },
    {
      title: "Custom Design",
      description: "Tailored solutions for unique problems.",
      icon: Cog,
    },
    {
      title: "Industrial Expertise",
      description: "Decades of combined manufacturing knowledge.",
      icon: Wrench,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-navy font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-navy/95 backdrop-blur-md shadow-lg py-3"
            : "bg-navy/80 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="MECHROBOT Logo"
              className="h-12 w-12.5 object-contain rounded-full bg-white"
            />
            <span className="text-xl font-bold text-white tracking-wide">
              MECHROBOT
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-gray-200 hover:text-primary transition-colors tracking-wide uppercase"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="bg-primary hover:bg-orange-600 text-white px-6 py-2.5 rounded-sm font-semibold text-sm tracking-wide transition-all hover-lift"
            >
              Get a Quote
            </a>
          </nav>

          {/* Mobile Nav Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-navy border-t border-navy-light shadow-xl">
            <ul className="flex flex-col py-4 px-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="block py-3 text-gray-200 font-medium hover:text-primary border-b border-navy-light/50 uppercase text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href="#contact"
                  className="block w-full text-center bg-primary text-white px-6 py-3 rounded-sm font-semibold hover:bg-orange-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get a Quote
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
      {flash.show && (
        <div
          className={`fixed top-24 right-6 z-[9999] px-5 py-3 rounded-lg shadow-lg text-sm font-semibold transition-all
    ${
      flash.type === "success"
        ? "bg-green-100 text-green-700 border border-green-300"
        : "bg-red-100 text-red-700 border border-red-300"
    }`}
        >
          {flash.message}
        </div>
      )}
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen min-h-[600px] flex items-center bg-navy overflow-hidden pt-24 md:pt-0"
      >
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroFactory}
            alt="Industrial Factory Background"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-semibold text-gray-200 tracking-wider uppercase">
                Ahmedabad, India
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Engineering Precision for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                Industrial Automation
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light mb-8 md:mb-10 max-w-2xl leading-relaxed px-1 sm:px-0">
              CAD Design | SPM Development | Automation Systems
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-2 sm:mt-0">
                Reduce Manpower & Increase Productivity with Custom Automation
                Solutions.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-4 text-center bg-transparent border-2 border-white/80 text-white font-semibold rounded-sm hover:bg-white hover:text-navy transition-all"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 text-center bg-primary text-white font-semibold rounded-sm hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-industrial">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-16">
            {/* Left Side */}
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
                Our Core Expertise
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-navy">
                Comprehensive Smart Engineering Solutions
              </h3>
            </div>

            {/* Right Side Button (same style as Projects) */}
            <Link
              to="/services"
              className="inline-flex md:flex items-center gap-2 font-semibold text-primary hover:text-orange-700 transition-colors"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 border border-gray-100 hover-lift group relative overflow-hidden"
              >
                {/* Decorative border top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-primary transition-colors"></div>
                <div className="w-14 h-14 bg-gray-50 rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors p-2">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-8 h-8 object-contain"
                  />
                </div>

                <h4 className="text-xl font-bold text-navy mb-4">
                  {service.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>

                <Link
                  to={`/services/${service.slug}`}
                  className="mt-8 pt-6 border-t border-gray-50 flex items-center text-sm font-semibold text-navy group-hover:text-primary transition-colors"
                >
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
                Portfolio
              </h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-navy">
                Featured Engineering Projects
              </h3>
            </div>
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-2 font-semibold text-primary hover:text-orange-700 transition-colors"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <Link key={project._id} to={`/project/${project._id}`}>
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 mb-6 rounded-sm">
                    <img
                      src={project.coverImage || project.images?.[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <h4 className="text-xl font-bold text-navy mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <span className="text-primary font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
                    View Details <ChevronRight className="w-4 h-4" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <a
              href="/projects"
              className="inline-flex items-center gap-2 font-semibold text-primary py-2 px-4 border border-primary hover:bg-primary hover:text-white transition-all rounded-sm"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* About Us & Stats */}
      <section
        id="about"
        className="relative py-20 md:py-28 bg-gradient-to-b from-navy via-navy to-[#06111f] text-white overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-56 md:w-72 h-56 md:h-72 bg-primary/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-64 md:w-80 h-64 md:h-80 bg-primary/10 blur-3xl rounded-full"></div>

        <div className="container mx-auto px-5 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Header */}
              <div className="text-center mb-12 md:mb-16">
                <p className="text-primary text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-4">
                  About MECHROBOT
                </p>

                {/* WHITE TITLE */}
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-5">
                  Precision Mechanical Design <br className="hidden sm:block" />
                  & Smart Automation
                </h2>

                {/* PRIMARY COLOR SUBTITLE */}
                <p className="text-primary text-base sm:text-lg md:text-xl font-semibold max-w-3xl mx-auto leading-relaxed px-2">
                  Innovative Engineering Solutions for Efficient Manufacturing
                </p>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
                {/* Left Side */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-5">
                    MECHROBOT is a mechanical design and industrial automation
                    solutions provider based in Ahmedabad, Gujarat. We
                    specialize in delivering precision-driven engineering
                    solutions that help industries improve productivity, reduce
                    manpower, and achieve faster, more efficient manufacturing
                    processes.
                  </p>

                  <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-5">
                    With strong expertise in CAD modeling, drafting, and Special
                    Purpose Machine (SPM) design, we develop customized systems
                    tailored to real industrial needs.
                  </p>

                  <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                    Our focus includes pick-and-place systems, conveyor material
                    handling, and machine modifications that enhance speed,
                    accuracy, and operational safety.
                  </p>
                </div>

                {/* Right Side */}
                <div className="grid gap-6">
                  <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6 sm:p-7 backdrop-blur-md">
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
                      Our Mission
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      To deliver high-quality mechanical design and automation
                      solutions that enhance productivity, reduce operational
                      costs, and create long-term value for clients.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-md">
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
                      Our Vision
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      To become a trusted partner in industrial engineering by
                      providing smart, efficient, and future-ready automation
                      solutions.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-md">
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
                      Why Choose Us
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300 text-sm sm:text-base">
                      <p>✔ Precision-focused engineering</p>
                      <p>✔ Customized automation</p>
                      <p>✔ Strong CAD expertise</p>
                      <p>✔ Safety & efficiency focus</p>
                      <p>✔ Timely project delivery</p>
                      <p>✔ Cost-effective solutions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10 md:mt-14">
                <div className="text-center bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
                  <h4 className="text-3xl sm:text-4xl font-black text-primary mb-2">
                    2+
                  </h4>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400">
                    Years Experience
                  </p>
                </div>

                <div className="text-center bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
                  <h4 className="text-3xl sm:text-4xl font-black text-primary mb-2">
                    12+
                  </h4>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400">
                    Projects Completed
                  </p>
                </div>

                <div className="text-center bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
                  <h4 className="text-3xl sm:text-4xl font-black text-primary mb-2">
                    5+
                  </h4>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400">
                    Happy Clients
                  </p>
                </div>

                <div className="text-center bg-primary/10 rounded-2xl p-5 sm:p-6 border border-primary/20">
                  <h4 className="text-3xl sm:text-4xl font-black text-primary mb-2">
                    100%
                  </h4>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-300">
                    Quality Focused
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-industrial border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-5 border border-gray-100">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-navy mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section id="contact" className="bg-white pt-24 pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          {/* CTA Banner */}
          <div className="bg-navy rounded-sm overflow-hidden mb-24 relative shadow-2xl">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/20 to-transparent"></div>
            <div className="px-8 py-16 md:p-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                  Have an Industrial Project?
                </h3>
                <p className="text-gray-300 text-lg">
                  Let’s build it together. Our engineers are ready to analyze
                  your requirements and propose the optimal automated solution.
                </p>
              </div>
              <a
                href={`https://api.whatsapp.com/send?phone=${settings.whatsapp}&text=Hello MECHROBOT`}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 bg-[#25D366] hover:bg-[#1ebd59] text-white px-8 py-4 rounded-sm font-bold flex items-center gap-3 transition-colors shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-6 h-6" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
            {/* Contact Info */}
            <div>
              <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
                Get In Touch
              </h2>

              <h3 className="text-3xl font-extrabold text-navy mb-8">
                Contact Our Office
              </h3>

              <div className="space-y-6">
                {/* OFFICE */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl relative flex items-center justify-center shrink-0 overflow-hidden border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-md transition"></div>

                    <MapPin className="w-5 h-5 text-primary relative z-10" />
                  </div>

                  <div>
                    <h4 className="font-bold text-navy mb-1">Office</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      82 Rashmi Karnavati Ind, Near Sharnam Estate, Kathwada
                      <br />
                      Ahmedabad, Gujarat 382430, India
                    </p>
                  </div>
                </div>

                {/* PHONE */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl relative flex items-center justify-center shrink-0 overflow-hidden border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-md transition"></div>

                    <Phone className="w-5 h-5 text-primary relative z-10" />
                  </div>

                  <div>
                    <h4 className="font-bold text-navy mb-1">
                      Call Us Directly
                    </h4>
                    <p className="text-gray-600 text-sm">8347585234</p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl relative flex items-center justify-center shrink-0 overflow-hidden border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-md transition"></div>

                    <Mail className="w-5 h-5 text-primary relative z-10" />
                  </div>

                  <div>
                    <h4 className="font-bold text-navy mb-1">Email Us</h4>
                    <p className="text-gray-600 text-sm">info@mechrobot.in</p>
                    <p className="text-gray-600 text-sm">sales@mechrobot.in</p>
                  </div>
                </div>
              </div>

              {/* SOCIAL SECTION */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-navy mb-4">Connect With Us</h4>

                <div className="flex gap-3">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/mechrobot_technologies/?hl=en"
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-pink-400 hover:bg-pink-50 transition group"
                  >
                    <Instagram className="w-5 h-5 text-gray-600 group-hover:text-pink-500 transition" />
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61593643400179"
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-blue-500 hover:bg-blue-50 transition group"
                  >
                    <Facebook className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition" />
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/channel/UC6pYClJAlmjNVzEiNLeDyRA"
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-red-500 hover:bg-red-50 transition group"
                  >
                    <Youtube className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/gohil-dineshsinh-885397180/"
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-blue-700 hover:bg-blue-50 transition group"
                  >
                    <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-blue-700 transition" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-industrial p-8 md:p-10 border border-gray-200 shadow-sm relative self-start">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <h3 className="text-2xl font-bold text-navy mb-6">
                Request a Technical Quote
              </h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                      placeholder="e.g. Shah Industries"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="personName"
                      value={formData.personName}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                      placeholder="Rajesh Patel"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                      placeholder="rajeshpatel@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                      placeholder="+91"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                    Select Service
                  </label>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-sm"
                    required
                  >
                    <option value="">Choose Service</option>
                    <option value="SPM Design & Development">
                      SPM Design & Development
                    </option>
                    <option value="CAD Modeling & Drafting">
                      CAD Modeling & Drafting
                    </option>
                    <option value="Material Handling Systems">
                      Material Handling Systems
                    </option>
                    <option value="Pick & Place Automation">
                      Pick & Place Automation
                    </option>
                    <option value="Industrial Automation">
                      Industrial Automation
                    </option>
                    <option value="Machine Modification">
                      Machine Modification
                    </option>
                    <option value="Conveyor System">Conveyor System</option>
                    <option value="Conveyor System">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                    Project Requirements
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm resize-none"
                    placeholder="Describe the machine or CAD service you require..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-navy text-white font-bold py-4"
                >
                  {loading ? "Submitting..." : "Submit Inquiry"}
                </button>
                {/* <button type="submit" className="w-full bg-navy text-white font-bold py-4 text-sm tracking-wide uppercase hover:bg-navy-light transition-colors shadow-md">
                  Submit Inquiry
                </button> */}
              </form>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="MECHROBOT Logo"
                className="h-12 w-auto object-contain"
              />
              <span className="font-bold text-gray-800 tracking-tight">
                MECHROBOT
              </span>
            </div>
            <p>
              &copy; {new Date().getFullYear()} MECHROBOT. All rights reserved.
            </p>
            <div className="flex gap-4 font-medium">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
