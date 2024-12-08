import { Card, Checkbox, Group, Input, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { supabase, formatDateToDDMMYYYY } from "../lib/supabase";

export default function PTOD() {
  const [ptodNotes, setPtodNotes] = useState("");
  const [ptodDailyDone, setPtodDailyDone] = useState(false);
  const handlePtodNotesUpdate = async () => {
    const formattedDate = formatDateToDDMMYYYY(new Date());
    const { data, error } = await supabase
      .from("Personal Tracking")
      .select()
      .eq("id", formattedDate);
    if (error) {
      console.error("error", error);
      return;
    }
    if (data === undefined || data.length === 0) {
      const { error } = await supabase
        .from("Personal Tracking")
        .insert([
          {
            id: formattedDate,
            date: new Date(),
            potd: { notes: "", dailyDone: false },
            striver_sheet: { problemsSolved: 0, dailyDone: false, notes: "" },
            personal: { notes: "", dailyDone: false },
            internship: { notes: "", dailydone: false },
            skill_rack: { notes: "", dailyDone: false, problemsSolved: 0 },
          },
        ]);
      if (error) {
        console.error("error", error);
        return;
      }
    }
    const { error: updateError } = await supabase
      .from("Personal Tracking")
      .update({
        potd: { notes: ptodNotes, dailyDone: true },
      })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };
  const handlePtodDailyDone = async () => {
    const formattedDate = formatDateToDDMMYYYY(new Date());
    const { data, error } = await supabase
      .from("Personal Tracking")
      .select()
      .eq("id", formattedDate);
    if (error) {
      console.error("error", error);
      return;
    }
    if (data.length === 0) {
      const { error } = await supabase
        .from("Personal Tracking")
        .insert([
          {
            id: formattedDate,
            date: new Date(),
            potd: { notes: "", dailyDone: false },
            striver_sheet: { problemsSolved: 0, dailyDone: false, notes: "" },
            personal: { notes: "", dailyDone: false },
            internship: { notes: "", dailydone: false },
            skill_rack: { notes: "", dailyDone: false, problemsSolved: 0 },
          },
        ]);
      if (error) {
        console.error("error", error);
        return;
      }
    }
    const { error: updateError } = await supabase
      .from("Personal Tracking")
      .update({
        potd: { dailyDone: !ptodDailyDone, notes: ptodNotes },
      })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };
  useEffect(() => {
    const formattedDate = formatDateToDDMMYYYY(new Date());
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("Personal Tracking")
        .select()
        .eq("id", formattedDate);
      if (error) {
        console.error("error", error);
        return;
      }
      if (data.length === 0 || data === undefined || data === null) {
        const { error } = await supabase
          .from("Personal Tracking")
          .insert([
            {
              id: formattedDate,
              date: new Date(),
              potd: { notes: "", dailyDone: false },
              striver_sheet: { problemsSolved: 0, dailyDone: false, notes: "" },
              personal: { notes: "", dailyDone: false },
              internship: { notes: "", dailydone: false },
              skill_rack: { notes: "", dailyDone: false, problemsSolved: 0 },
            },
          ]);
        if (error) {
          console.error("error", error);
          return;
        }
        return;
      }
      if (data[0].potd === undefined || data[0].potd === null) return;
      setPtodNotes(data[0].potd.notes);
      setPtodDailyDone(data[0].potd.dailyDone);
    };
    fetchData()
      .then()
      .catch((error) => console.error("error", error));
  }, []);

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Leetcode PTOD</Text>
        </Group>

        <Group mt="sm">
          <Checkbox
            label="Daily Done"
            checked={ptodDailyDone}
            onChange={async () => {
              setPtodDailyDone(!ptodDailyDone);
              await handlePtodDailyDone();
            }}
          />
        </Group>
        <Group mt="sm">
          <Input
            placeholder="Notes"
            onKeyDown={async (event) => {
              if (event.key === "Enter") {
                await handlePtodNotesUpdate();
              }
            }}
            value={ptodNotes}
            onChange={(event) => setPtodNotes(event.currentTarget.value)}
          />
        </Group>
      </Card>
    </>
  );
}
