"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ContactMessageRow } from "@/lib/supabase/types";

export default function MessagesPanel() {
  const supabase = createClient();
  const [messages, setMessages] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string) {
    if (!confirm("Энэ зурвасыг устгах уу?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-primary mb-8">
        Захиалга / Зурвасууд ({messages.length})
      </h1>

      {loading ? (
        <p className="font-body-md text-on-surface-variant">Ачаалж байна...</p>
      ) : messages.length === 0 ? (
        <p className="font-body-md text-on-surface-variant">Одоогоор зурвас алга.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="border border-outline-variant bg-surface-container-low p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-body-lg text-on-surface font-medium">{m.name}</p>
                  <p className="font-body-md text-on-surface-variant text-sm">
                    {[m.phone, m.email].filter(Boolean).join(" · ") || "—"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-label-sm text-label-sm text-secondary">
                    {new Date(m.created_at).toLocaleString("mn-MN")}
                  </p>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="font-label-sm text-label-sm text-error hover:underline mt-1"
                  >
                    Устгах
                  </button>
                </div>
              </div>
              <p className="font-body-md text-on-surface whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
