"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Алдаа гарлаа");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Алдаа гарлаа");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-primary/40 bg-surface-container-low p-6">
        <p className="font-body-lg text-on-surface">
          Баярлалаа! Таны хүсэлтийг хүлээж авлаа, тун удахгүй холбогдох болно.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
          Нэр *
        </label>
        <input
          name="name"
          required
          className="w-full border border-outline-variant bg-surface px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
            Утас
          </label>
          <input
            name="phone"
            type="tel"
            className="w-full border border-outline-variant bg-surface px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
            И-мэйл
          </label>
          <input
            name="email"
            type="email"
            className="w-full border border-outline-variant bg-surface px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div>
        <label className="font-label-sm text-label-sm text-secondary uppercase mb-2 block">
          Мессеж *
        </label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full border border-outline-variant bg-surface px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary"
        />
      </div>
      {status === "error" && (
        <p className="font-body-md text-error">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-block border border-primary text-primary px-10 py-4 font-label-sm text-label-sm hover:bg-primary hover:text-on-primary transition-all duration-400 disabled:opacity-50"
      >
        {status === "sending" ? "Илгээж байна..." : "Захиалга илгээх"}
      </button>
    </form>
  );
}
