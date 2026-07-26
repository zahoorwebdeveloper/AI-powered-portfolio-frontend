import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/project.service";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  ImageOff,
  Upload,
  Loader2,
  FolderKanban,
  AlertCircle,
} from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import resizeImage from "../services/resizeImage";

const emptyForm = {
  title: "",
  description: "",
  tech: [],
  live: "",
  github: "",
  image: "",
};

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [techInput, setTechInput] = useState("");
  const [saveError, setSaveError] = useState("");
  const [imgError, setImgError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const queryClient = useQueryClient();

  const {
    data: projects = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const createMutation = useMutation({
    mutationFn: (formData) => createProject(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => updateProject({ id, formData }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      setDeleteId(null);
    },
  });

  function openCreate() {
    setEditingId(null);

    setSelectedImage(null);

    setForm(emptyForm);

    setTechInput("");

    setModalOpen(true);
  }

  function openEdit(project) {
    setEditingId(project._id);

    setSelectedImage(null);

    setForm({
      title: project.title,
      description: project.description,
      tech: project.tech,
      live: project.live,
      github: project.github,
      image: project.image?.url,
    });

    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);

    setEditingId(null);

    setSelectedImage(null);

    setForm(emptyForm);

    setTechInput("");

    setSaveError("");

    setImgError("");
  }

  function addTech() {
    const val = techInput.trim();
    if (!val) return;
    if (!form.tech.includes(val)) {
      setForm((f) => ({ ...f, tech: [...f.tech, val] }));
    }
    setTechInput("");
  }

  function removeTech(idx) {
    setForm((f) => ({ ...f, tech: f.tech.filter((_, i) => i !== idx) }));
  }

  function handleTechKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTech();
    } else if (e.key === "Backspace" && !techInput && form.tech.length) {
      removeTech(form.tech.length - 1);
    }
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImgError("Choose an image.");
      return;
    }

    setSelectedImage(file);

    try {
      const preview = await resizeImage(file);

      setForm((prev) => ({
        ...prev,
        image: preview,
      }));

      setImgError("");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaveError("");

    const formData = new FormData();

    formData.append("title", form.title);

    formData.append("description", form.description);

    form.tech.forEach((item) => {
      formData.append("tech", item);
    });

    formData.append("live", form.live);

    formData.append("github", form.github);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }

      closeModal();
    } catch (err) {
      setSaveError(err.response?.data?.error || err.message);
    }
  }

  async function confirmDelete() {
    try {
      await deleteMutation.mutateAsync(deleteId);
    } catch (err) {
      console.log(err);
    }
  }

  function normalizeUrl(url) {
    if (!url) return "";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Projects
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {isLoading
                ? "Loading..."
                : projects.length === 0
                  ? "No projects yet"
                  : `${projects.length} project${projects.length === 1 ? "" : "s"}`}
            </p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 active:scale-[0.98] transition"
          >
            <Plus size={16} strokeWidth={2.5} />
            New project
          </button>
        </div>

        {/* Load error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />

            <div className="flex-1">
              <p>
                {error?.response?.data?.message ||
                  error?.message ||
                  "Something went wrong"}
              </p>

              <p className="mt-0.5 text-red-500">
                Make sure your API server is running.
              </p>
            </div>

            <button onClick={refetch} className="font-medium underline">
              Retry
            </button>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-24 text-slate-400">
            <Loader2 size={22} className="animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <FolderKanban size={22} />
            </div>
            <h3 className="text-base font-medium text-slate-900">
              Start your first project
            </h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Add a title, description, tech stack, links, and a preview image
              to build out your portfolio.
            </p>
            <button
              onClick={openCreate}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              <Plus size={16} strokeWidth={2.5} />
              Create project
            </button>
          </div>
        )}

        {/* Grid */}
        {!isLoading && projects.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  {project.image ? (
                    <img
                      src={project.image.url}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                      <ImageOff size={28} />
                    </div>
                  )}
                  <div className="absolute right-2 top-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(project)}
                      aria-label="Edit project"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-slate-700 shadow hover:bg-white"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteId(project._id)}
                      aria-label="Delete project"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-red-600 shadow hover:bg-white"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-base font-semibold text-slate-900 line-clamp-1">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {project.tech?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-3 pt-3 border-t border-slate-100">
                    {project.live ? (
                      <a
                        href={normalizeUrl(project.live)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600"
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    ) : null}
                    {project.github ? (
                      <a
                        href={normalizeUrl(project.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600"
                      >
                        <FaGithub size={14} />
                        Code
                      </a>
                    ) : null}
                    {!project.live && !project.github && (
                      <span className="text-sm text-slate-300">
                        No links added
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <h2 className="text-base font-semibold text-slate-900">
                  {editingId ? "Edit project" : "New project"}
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <FaTwitter size={18} />
                </button>
              </div>

              <div className="space-y-5 px-6 py-5">
                {saveError && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                    <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                    <span>{saveError}</span>
                  </div>
                )}

                {/* Image upload */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Image
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-slate-300 p-3 hover:border-indigo-400"
                  >
                    <div className="flex h-16 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                      {form.image ? (
                        <img
                          src={
                            typeof form.image === "string"
                              ? form.image
                              : form.image?.url
                          }
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Upload size={18} className="text-slate-400" />
                      )}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-indigo-600">
                        {form.image ? "Replace image" : "Upload an image"}
                      </span>
                      <p className="text-slate-400">JPG or PNG, up to 8MB</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  {imgError && (
                    <p className="mt-1.5 text-xs text-red-600">{imgError}</p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    placeholder="Project name"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="What does this project do?"
                    className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Tech stack */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Tech stack
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                    {form.tech.map((t, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700"
                      >
                        {t}
                        <button
                          type="button"
                          onClick={() => removeTech(i)}
                          className="text-indigo-400 hover:text-indigo-700"
                        >
                          <FaTwitter size={11} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={handleTechKeyDown}
                      onBlur={addTech}
                      placeholder={
                        form.tech.length ? "" : "React, Node.js, ..."
                      }
                      className="min-w-[100px] flex-1 border-none px-1 py-1 text-sm outline-none"
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Press Enter or comma to add each technology.
                  </p>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Live link
                    </label>
                    <input
                      type="text"
                      value={form.live}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, live: e.target.value }))
                      }
                      placeholder="myproject.com"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      GitHub link
                    </label>
                    <input
                      type="text"
                      value={form.github}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, github: e.target.value }))
                      }
                      placeholder="github.com/you/repo"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 size={14} className="animate-spin" />
                  )}
                  {editingId ? "Save changes" : "Create project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">
              Delete this project?
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">
              This can't be undone.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleteMutation.isPending}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleteMutation.isPending && (
                  <Loader2 size={14} className="animate-spin" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
