// components/ArtworkIdInput.tsx

import { useEffect, useState } from "react";
import { StringInputProps, set, useFormValue, useClient } from "sanity";

export function ArtworkIdInput(props: StringInputProps) {
  const { onChange, value, elementProps } = props;
  const [loading, setLoading] = useState(false);

  // Watch category field in same document
  const category = useFormValue(["category"]) as { _ref: string } | undefined;
  const client = useClient({ apiVersion: "2026-04-14" });

  useEffect(() => {
    // Only run if category selected and ID not yet set
    if (!category?._ref || value) return;

    async function generateId() {
      setLoading(true);
      try {
        // 1. Get category prefix
        const cat = await client.fetch(
          `*[_type == "category" && _id == $id][0]{ prefix }`,
          { id: category!._ref },
        );

        if (!cat?.prefix) return;

        const prefix = cat.prefix.toUpperCase();

        // 2. Count existing artworks in this category
        const count = await client.fetch(
          `count(*[_type == "artwork" && category._ref == $id])`,
          { id: category!._ref },
        );

        // 3. Generate next ID — JP001, JP002...
        const nextNumber = String(count + 1).padStart(3, "0");
        const newId = `${prefix}${nextNumber}`;

        onChange(set(newId));
      } catch (err) {
        console.error("Artwork ID generation failed:", err);
      } finally {
        setLoading(false);
      }
    }

    generateId();
  }, [category?._ref]); // Fires when category changes

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <input
        {...elementProps}
        value={loading ? "Generating..." : (value ?? "")}
        readOnly
        style={{
          background: "#111",
          border: "1px solid #333",
          borderRadius: "4px",
          color: value ? "#f59e0b" : "#666",
          fontSize: "16px",
          fontWeight: "bold",
          letterSpacing: "2px",
          padding: "10px 14px",
          width: "140px",
          cursor: "not-allowed",
        }}
      />
      {!value && !loading && (
        <span style={{ fontSize: "12px", color: "#666" }}>
          ← Select a category first
        </span>
      )}
      {loading && (
        <span style={{ fontSize: "12px", color: "#f59e0b" }}>
          ⏳ Generating ID...
        </span>
      )}
      {value && (
        <span style={{ fontSize: "12px", color: "#22c55e" }}>
          ✅ Auto generated
        </span>
      )}
    </div>
  );
}
