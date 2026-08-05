import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import AdminPanel from './AdminPanel';
import ServicesPage from "./ServicesPage";
import ServiceDetail from "./ServiceDetail";
import ProjectDetails from "./ProjectDetails"; // NEW
import ProjectsPage from "./ProjectsPage";
import EditProject from "./EditProject";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPanel />} />

        {/* Services */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />

        {/* Projects */}
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/admin/edit-project/:id" element={<EditProject />} />
      </Routes>
    </BrowserRouter>
  );
}