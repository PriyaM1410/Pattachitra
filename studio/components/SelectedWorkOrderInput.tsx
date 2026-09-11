// components/SelectedWorkOrderInput.tsx
"use client";

import { useEffect, useState } from "react";
import { Select, Spinner, Flex } from "@sanity/ui";
import { NumberInputProps, set, unset, useClient, useFormValue } from "sanity";

const MAX_SLOTS = 8;

type TakenSlot = {
  order: number;
  artName: string;
};

export function SelectedWorkOrderInput(props: NumberInputProps) {
  const { onChange, value, elementProps } = props;

  // The _id of the document currently being edited
  const currentId = useFormValue(["_id"]) as string | undefined;
  // Drafts in Sanity are prefixed with "drafts." — normalize to compare with published ids
  const normalizedCurrentId = currentId?.replace(/^drafts\./, "");

  const client = useClient({ apiVersion: "2024-01-01" });
  const [taken, setTaken] = useState<TakenSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchTaken() {
      setLoading(true);
      try {
        // Fetch every other selectedWork document that already has an order,
        // excluding the document currently being edited (draft or published).
        const results: TakenSlot[] = await client.fetch(
          `*[_type == "selectedWork" && defined(displayOrder) && !(_id in [$id, $draftId])]{
            "order": displayOrder,
            artName
          }`,
          {
            id: normalizedCurrentId ?? "",
            draftId: `drafts.${normalizedCurrentId ?? ""}`,
          },
        );
        if (!cancelled) setTaken(results);
      } catch (err) {
        console.error("Failed to fetch existing display orders:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTaken();
    return () => {
      cancelled = true;
    };
  }, [client, normalizedCurrentId]);

  if (loading) {
    return (
      <Flex align="center" gap={2} padding={2}>
        <Spinner muted />
        <span style={{ fontSize: 13, color: "#7a6a5c" }}>
          Checking available slots…
        </span>
      </Flex>
    );
  }

  const takenMap = new Map(taken.map((t) => [t.order, t.artName]));

  return (
    <Select
      {...elementProps}
      value={value !== undefined ? String(value) : ""}
      onChange={(event) => {
        const num = Number(event.currentTarget.value);
        onChange(num ? set(num) : unset());
      }}
    >
      <option value="">Select a position…</option>
      {Array.from({ length: MAX_SLOTS }, (_, i) => i + 1).map((num) => {
        const isTaken = takenMap.has(num);
        return (
          <option key={num} value={num} disabled={isTaken}>
            {isTaken ? `${num} — taken (${takenMap.get(num)})` : `${num}`}
          </option>
        );
      })}
    </Select>
  );
}
