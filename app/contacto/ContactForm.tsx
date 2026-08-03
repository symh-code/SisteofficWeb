"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { sendEmail } from "../lib/emailjs";

type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  city: string;
  state: string;
  phone: string;
  message: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: ContactFormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  city: "",
  state: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submittedName, setSubmittedName] = useState("");

  const isSubmitting = status === "submitting";
  const submitted = status === "success";

  function handleChange(field: keyof ContactFormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      await sendEmail("contact", {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        company: form.company,
        city: form.city,
        state: form.state,
        phone: form.phone,
        message: form.message,
      });

      setSubmittedName(form.firstName);
      setForm(EMPTY_FORM);
      setStatus("success");
    } catch (error) {
      console.error("Error enviando formulario de contacto:", error);
      setStatus("error");
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-2xl shadow-slate-900/[0.02]">
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7A1E2B]/10 text-[#7A1E2B]">
            <Check className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-light text-slate-900">Mensaje enviado con éxito</h3>
            <p className="mx-auto max-w-sm text-xs text-slate-500 font-light leading-relaxed">
              Gracias por contactarnos, <strong className="font-medium text-slate-800">{submittedName}</strong>. Nuestro equipo se comunicará contigo en breve.
            </p>
          </div>
          <button
            onClick={() => {
              setStatus("idle");
              setForm(EMPTY_FORM);
            }}
            className="mt-4 rounded-xl bg-[#7A1E2B] px-6 py-3 text-[10px] uppercase tracking-widest font-medium text-white transition-all hover:bg-[#A02838]"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Nombre *
              </label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full rounded-xl border border-slate-200/80 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none transition-all focus:border-[#7A1E2B] focus:bg-white"
                placeholder="Tu nombre"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Apellido *
              </label>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full rounded-xl border border-slate-200/80 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none transition-all focus:border-[#7A1E2B] focus:bg-white"
                placeholder="Tu apellido"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Correo Electrónico *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-xl border border-slate-200/80 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none transition-all focus:border-[#7A1E2B] focus:bg-white"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Empresa
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className="w-full rounded-xl border border-slate-200/80 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none transition-all focus:border-[#7A1E2B] focus:bg-white"
              placeholder="Nombre de tu empresa (opcional)"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Ciudad
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full rounded-xl border border-slate-200/80 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none transition-all focus:border-[#7A1E2B] focus:bg-white"
                placeholder="Barranquilla"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Departamento / Provincia
              </label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="w-full rounded-xl border border-slate-200/80 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none transition-all focus:border-[#7A1E2B] focus:bg-white"
                placeholder="Atlántico"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Número de Teléfono *
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full rounded-xl border border-slate-200/80 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none transition-all focus:border-[#7A1E2B] focus:bg-white"
              placeholder="+57 300 000 0000"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Mensaje *
            </label>
            <textarea
              rows={4}
              required
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full resize-none rounded-xl border border-slate-200/80 bg-slate-50/30 px-4 py-3 text-xs text-slate-900 outline-none transition-all focus:border-[#7A1E2B] focus:bg-white"
              placeholder="¿En qué podemos ayudarte?"
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-red-500 font-light">
              Ocurrió un error al enviar tu mensaje. Por favor intenta nuevamente.
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#7A1E2B] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#A02838] disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
