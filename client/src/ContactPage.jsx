// ===============================
// FRONTEND - ContactPage.jsx
// ===============================

import { useState } from "react";

export default function ContactPage() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [form, setForm] = useState({
        companyName: "",
        personName: "",
        phone: "",
        email: "",
        service: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const res = await fetch(`${API_URL}/api/inquiries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        alert(data.message);

        setForm({
            companyName: "",
            personName: "",
            phone: "",
            email: "",
            service: "",
            message: ""
        });

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto py-20 px-6">

            <h1 className="text-4xl font-bold mb-8">
                Send Inquiry
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    name="companyName"
                    placeholder="Company Name"
                    value={form.companyName}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    name="personName"
                    placeholder="Person Name"
                    value={form.personName}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                />

                <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="border p-3 w-full rounded"
                >

                    <option value="">Select Service</option>
                    <option>SPM Design & Development</option>
                    <option>CAD Modeling & Drafting</option>
                    <option>Material Handling Systems</option>
                    <option>Pick & Place Automation</option>
                    <option>Industrial Automation</option>
                    <option>Machine Modification</option>
                    <option>Conveyor System</option>

                </select>

                <textarea
                    name="message"
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange}
                    className="border p-3 w-full rounded h-32"
                />

                <button
                    disabled={loading}
                    className="bg-orange-500 text-white px-6 py-3 rounded"
                >
                    {loading ? "Sending..." : "Submit Inquiry"}
                </button>

            </form>
        </div>
    );
}