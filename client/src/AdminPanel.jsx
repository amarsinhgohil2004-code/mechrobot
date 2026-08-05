import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "quill/dist/quill.snow.css";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  Menu,
  X,
  Trash2,
  Phone,
  Mail,
  Building2,
  UploadCloud,
  ShieldCheck,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminPanel() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [activeTab, setActiveTab] = useState("inquiries");

  const [inquiries, setInquiries] = useState([]);
  const [projects, setProjects] = useState([]);

  const [settingsData, setSettingsData] = useState({
    phone: "",
    email: "",
    whatsapp: "",
  });

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [coverPreview, setCoverPreview] = useState("");
  const [galleryCount, setGalleryCount] = useState(0);
  const [videoPreview, setVideoPreview] = useState("");
  const [description, setDescription] = useState("");
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ];
  const serviceOptions = [
    "SPM Design & Development",
    "CAD Modeling & Drafting",
    "Material Handling Systems",
    "Pick & Place Automation",
    "Industrial Automation",
    "Machine Modification",
    "Conveyor System",
  ];

  useEffect(() => {
    const token = localStorage.getItem("mechrobot_admin_token");

    if (token) {
      setIsAuthenticated(true);
      loadInquiries();
      loadProjects();
      loadSettings();
    }
  }, []);

  const getToken = () => localStorage.getItem("mechrobot_admin_token");

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "admin",
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("mechrobot_admin_token", data.token);

        setIsAuthenticated(true);
        setError("");

        loadInquiries();
        loadProjects();
        loadSettings();
      } else {
        setError(data.message);
      }
    } catch {
      setError("Cannot connect backend");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("mechrobot_admin_token");
    setIsAuthenticated(false);
    navigate("/");
  };

  // INQUIRIES
  const loadInquiries = async () => {
    try {
      const res = await fetch(`${API_URL}/api/inquiries`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      // token expired or invalid
      if (res.status === 401) {
        localStorage.removeItem("mechrobot_admin_token");
        setIsAuthenticated(false);
        return;
      }

      const data = await res.json();

      // always keep array
      setInquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Load inquiry error:", error);
      setInquiries([]);
    }
  };

  const deleteInquiry = async (id) => {
    await fetch(`${API_URL}/api/inquiries/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    loadInquiries();
  };

  const markContacted = async (id) => {
    await fetch(`${API_URL}/api/inquiries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        status: "contacted",
      }),
    });

    loadInquiries();
  };

  // PROJECTS
  const loadProjects = async () => {
    const res = await fetch(`${API_URL}/api/projects`);
    const data = await res.json();
    setProjects(data);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    if (uploading) return;

    setUploading(true);

    try {
      const formData = new FormData(e.target);

      selectedCategories.forEach((cat) => {
        formData.append("categories", cat);
      });

      const res = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Upload Failed");
        setUploading(false);
        return;
      }

      alert("Project Added Successfully");
      setDescription("");
      e.target.reset();
      setSelectedCategories([]);
      setCoverPreview("");
      setGalleryCount(0);

      loadProjects();
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }

    setUploading(false);
  };

  const deleteProject = async (id) => {
    await fetch(`${API_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    loadProjects();
  };

  // SETTINGS
  const loadSettings = async () => {
    const res = await fetch(`${API_URL}/api/settings`);
    const data = await res.json();
    setSettingsData(data || {});
  };

  const updateSettings = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/api/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(settingsData),
    });

    alert("Settings Updated");
  };

  // STATS
  const totalInquiry = inquiries.length;

  const contactedInquiry = Array.isArray(inquiries)
    ? inquiries.filter((item) => item.status === "contacted").length
    : 0;

  const pendingInquiry = Array.isArray(inquiries)
    ? inquiries.filter((item) => item.status !== "contacted").length
    : 0;

  const totalProjects = projects.length;
  const stripHtml = (html) => {
    if (!html) return "";

    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
  };
  // LOGIN UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-2xl p-8">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center">
              <ShieldCheck className="text-white" size={30} />
            </div>
          </div>

          <h1 className="text-3xl font-black text-center text-slate-900">
            MECHROBOT
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Secure Admin Access
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold transition">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const menu = [
    {
      key: "inquiries",
      label: "Inquiries",
      icon: LayoutDashboard,
    },
    {
      key: "projects",
      label: "Projects",
      icon: FolderKanban,
    },
    {
      key: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* MOBILE TOPBAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center">
        <h2 className="font-black text-slate-900 text-lg">GB CAD MAC</h2>

        <button onClick={() => setSidebarOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-slate-950 border-r border-slate-800 text-white flex flex-col transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black">MECHROBOT</h2>
            <p className="text-xs text-slate-400 mt-1">Admin Dashboard</p>
          </div>

          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition
                ${
                  activeTab === item.key
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-slate-800 text-slate-300 hover:bg-slate-900"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-semibold flex justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 pt-20 lg:pt-0 p-4 md:p-6 lg:p-8">
        {/* STATS */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <StatCard title="Total Inquiry" value={totalInquiry} />
          <StatCard
            title="Pending"
            value={pendingInquiry}
            color="text-red-500"
          />
          <StatCard
            title="Contacted"
            value={contactedInquiry}
            color="text-green-500"
          />
          <StatCard
            title="Projects"
            value={totalProjects}
            color="text-blue-500"
          />
        </div>

        {/* INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="space-y-5">
            {inquiries.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex flex-col xl:flex-row justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold flex gap-2 items-center">
                      <Building2 size={18} />
                      {item.companyName}
                    </h3>

                    <p>{item.personName}</p>

                    <p className="flex gap-2 items-center text-gray-700">
                      <Phone size={15} />
                      {item.phone}
                    </p>

                    <p className="flex gap-2 items-center text-gray-700">
                      <Mail size={15} />
                      {item.email}
                    </p>

                    <p>{item.service}</p>

                    <p className="text-gray-600">{item.message}</p>

                    <span
                      className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${
                        item.status === "contacted"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status === "contacted"
                        ? "Client Contacted"
                        : "Pending Inquiry"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => markContacted(item._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl font-semibold"
                    >
                      Contacted
                    </button>

                    <button
                      onClick={() => deleteInquiry(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === "projects" && (
          <div>
            {/* PROJECT FORM */}
            <form
              onSubmit={handleAddProject}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm mb-8"
            >
              <h2 className="text-xl font-bold mb-5">Add New Project</h2>

              {/* TITLE */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Project Title
                </label>

                <input
                  name="title"
                  placeholder="Enter Project Title"
                  className="w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Project Description
                </label>

                <div className="rounded-2xl overflow-hidden border border-gray-300 bg-white">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write detailed project description..."
                    className="bg-white min-h-[220px]"
                  />
                </div>

                <input type="hidden" name="description" value={description} />
              </div>

              {/* VIDEO */}
              <div className="mt-5">
                <label className="border-2 border-dashed border-purple-300 rounded-2xl p-5 cursor-pointer hover:border-purple-500 bg-purple-50 transition text-center block">
                  <p className="font-semibold text-purple-700">
                    Upload Project Video
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    MP4 / WebM (Max 1 file)
                  </p>

                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setVideoPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>

                {/* VIDEO PREVIEW */}
                {/* {videoPreview && (
                  <div className="mt-3 border rounded-2xl overflow-hidden">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full h-60 object-cover"
                    />
                  </div>
                )} */}
              </div>

              {/* COVER + GALLERY */}
              <div className="grid md:grid-cols-2 gap-4 mt-5">
                {/* COVER */}
                <label className="border-2 border-dashed border-orange-300 rounded-2xl p-5 cursor-pointer hover:border-orange-500 bg-orange-50 transition text-center">
                  <UploadCloud className="mx-auto text-orange-500 mb-2" />
                  <p className="font-semibold">Upload Cover Image</p>

                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    className="hidden"
                    required
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setCoverPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>

                {/* GALLERY */}
                <label className="border-2 border-dashed border-gray-300 rounded-2xl p-5 cursor-pointer hover:border-orange-500 transition text-center">
                  <ImageIcon className="mx-auto text-gray-500 mb-2" />
                  <p className="font-semibold">Upload Gallery Images</p>

                  <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setGalleryCount(e.target.files.length)}
                  />
                </label>
              </div>

              {/* PREVIEW */}
              {(coverPreview || galleryCount > 0 || videoPreview) && (
                <div className="grid md:grid-cols-3 gap-4 mt-5">
                  {coverPreview && (
                    <div className="border rounded-2xl p-3">
                      <p className="text-sm font-semibold mb-2">Cover</p>
                      <img
                        src={coverPreview}
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    </div>
                  )}

                  {galleryCount > 0 && (
                    <div className="border rounded-2xl p-3 flex items-center justify-center">
                      <p className="font-semibold text-gray-700">
                        {galleryCount} Images Selected
                      </p>
                    </div>
                  )}

                  {videoPreview && (
                    <div className="border rounded-2xl p-3">
                      <p className="text-sm font-semibold mb-2">Video</p>
                      <video
                        src={videoPreview}
                        controls
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* CATEGORIES */}
              <div className="grid md:grid-cols-2 gap-3 mt-5">
                {serviceOptions.map((item, i) => (
                  <label
                    key={i}
                    className="border border-gray-200 rounded-xl px-4 py-3 flex gap-2 cursor-pointer hover:border-orange-400"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(item)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, item]);
                        } else {
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== item),
                          );
                        }
                      }}
                    />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>

              {/* SUBMIT */}
              <button
                disabled={uploading}
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold"
              >
                {uploading ? "Uploading..." : "Add Project"}
              </button>
            </form>

            {/* Project Cards */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm"
                >
                  <img
                    src={p.coverImage || p.images?.[0]}
                    alt={p.title}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="font-bold text-xl">{p.title}</h3>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-6">
                      {stripHtml(p.description)}
                    </p>

                    <div className="flex gap-3 mt-5">
                      <Link
                        to={`/admin/edit-project/${p._id}`}
                        className="flex-1 bg-slate-900 text-white py-3 rounded-2xl text-center font-semibold"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProject(p._id)}
                        className="flex-1 bg-red-500 text-white py-3 rounded-2xl font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "settings" && (
          <form
            onSubmit={updateSettings}
            className="bg-white rounded-3xl border border-gray-200 p-6 max-w-xl shadow-sm"
          >
            <div className="space-y-4">
              <input
                value={settingsData.phone}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    phone: e.target.value,
                  })
                }
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />

              <input
                value={settingsData.email}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />

              <input
                value={settingsData.whatsapp}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    whatsapp: e.target.value,
                  })
                }
                placeholder="WhatsApp"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              />
            </div>

            <button className="mt-5 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold">
              Save Settings
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, color = "text-slate-900" }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className={`text-3xl font-black mt-2 ${color}`}>{value}</h3>
    </div>
  );
}
