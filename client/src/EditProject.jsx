import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader2,
  UploadCloud,
  ImageIcon,
  Video,
} from "lucide-react";

export default function EditProject() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    categories: [],
    coverImage: null,
    images: [],
  });

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  const serviceOptions = [
    "SPM Design & Development",
    "CAD Modeling & Drafting",
    "Material Handling Systems",
    "Pick & Place Automation",
    "Industrial Automation",
    "Machine Modification",
    "Conveyor System",
  ];

  // ================= FETCH =================
  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`${API_URL}/api/projects/${id}`);
      const data = await res.json();

      setForm({
        title: data.title || "",
        description: data.description || "",
        categories: data.categories || [],
        coverImage: null,
        images: [],
      });

      setVideoPreview(data.video || "");
    };

    fetchProject();
  }, [id]);

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleCategory = (cat) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);

      form.categories.forEach((c) => formData.append("categories", c));

      if (form.coverImage) formData.append("coverImage", form.coverImage);

      if (form.images.length > 0)
        form.images.forEach((img) => formData.append("images", img));

      if (videoFile) formData.append("video", videoFile);

      const token = localStorage.getItem("mechrobot_admin_token");

      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) navigate("/admin");
      else alert("Update Failed");
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Edit Project</h1>
            <p className="text-gray-500 text-sm">
              Update project details, media & categories
            </p>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="bg-slate-900 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white mt-6 p-6 rounded-3xl shadow-sm border space-y-6"
        >
          {/* TITLE */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-2xl"
            placeholder="Project Title"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded-2xl"
            placeholder="Project Description"
          />

          {/* COVER */}
          <div className="space-y-2">
            <p className="font-semibold">Cover Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, coverImage: e.target.files[0] })
              }
            />
          </div>

          {/* VIDEO (SMALL CARD PREVIEW) */}
          <div className="space-y-2">
            <p className="font-semibold flex items-center gap-2">
              <Video size={18} />
              Project Video
            </p>

            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setVideoFile(file);
                  setVideoPreview(URL.createObjectURL(file));
                }
              }}
            />

            {/* SMALL VIDEO PREVIEW CARD */}
            {videoPreview && (
              <div className="mt-3 w-64">
                <div className="border rounded-2xl overflow-hidden shadow-sm bg-white">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-36 object-cover"
                  />
                  <p className="text-xs text-gray-500 p-2">
                    Project Video Preview
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* GALLERY */}
          <div className="space-y-2">
            <p className="font-semibold">Gallery Images</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  images: Array.from(e.target.files),
                })
              }
            />
          </div>

          {/* CATEGORIES */}
          <div>
            <p className="font-semibold mb-2">Categories</p>

            <div className="grid sm:grid-cols-2 gap-3">
              {serviceOptions.map((cat, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => toggleCategory(cat)}
                  className={`p-3 rounded-2xl border text-sm font-medium transition
                  ${
                    form.categories.includes(cat)
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="flex-1 bg-gray-200 p-3 rounded-2xl"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="flex-1 bg-orange-500 text-white p-3 rounded-2xl flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Updating
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
