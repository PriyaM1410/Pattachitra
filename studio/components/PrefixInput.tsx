// sanity/components/PrefixInput.tsx
// Auto generates prefix from category name as artist types

"use client";

import { useEffect } from "react";
import { StringInputProps, set, useFormValue } from "sanity";

function suggestPrefix(name: string): string {
  const stopWords = ["and", "or", "the", "of", "a", "an"];
  const words = name
    .trim()
    .split(" ")
    .filter((w) => w && !stopWords.includes(w.toLowerCase()));

  if (words.length === 0) return "";
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();

  return words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function PrefixInput(props: StringInputProps) {
  const { onChange, value, elementProps } = props;

  // Watch the title field in the same document
  const title = useFormValue(["title"]) as string | undefined;

  useEffect(() => {
    // Only auto-fill if prefix is empty
    if (!value && title && title.length > 1) {
      const suggested = suggestPrefix(title);
      onChange(set(suggested));
    }
  }, [title]); // Runs every time title changes

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <input
        {...elementProps}
        value={value ?? ""}
        onChange={(e) => onChange(set(e.target.value.toUpperCase()))}
        maxLength={3}
        placeholder="e.g. JP"
        style={{
          background: "#1a1a1a",
          border: "1px solid #333",
          borderRadius: "4px",
          color: "#fff",
          fontSize: "14px",
          padding: "8px 12px",
          width: "100px",
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontWeight: "bold",
        }}
      />
      {title && (
        <span style={{ fontSize: "12px", color: "#888" }}>
          Suggested:{" "}
          <strong style={{ color: "#f59e0b" }}>{suggestPrefix(title)}</strong> —
          type over to change
        </span>
      )}
    </div>
  );
}
