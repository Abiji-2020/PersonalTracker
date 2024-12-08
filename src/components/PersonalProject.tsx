import { Card, Group, Text, Checkbox, Input } from "@mantine/core";
import { useState, useEffect } from "react";
import { supabase, formatDateToDDMMYYYY } from "../lib/supabase";

export default function PersonalProject() {
  const [personalProjectNotes, setPersonalProjectNotes] = useState("");
  const [personalProjectDailyDone, setPersonalProjectDailyDone] =
    useState(false);
  const handleProjectNotesUpdate = async () => {
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
      const { data, error } = await supabase
        .from("Personal Tracking")
        .insert([{ id: formattedDate, date: new Date() }]);
      if (error) {
        console.error("error", error);
        return;
      }
    }
    const { data: updatedData, error: updateError } = await supabase
      .from("Personal Tracking")
      .update({
        personal: { notes: personalProjectNotes, dailyDone: true },
      })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };
  const handleProjectDailyDone = async () => {
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
      const { data, error } = await supabase
        .from("Personal Tracking")
        .insert([{ id: formattedDate, date: new Date() }]);
      if (error) {
        console.error("error", error);
        return;
      }
    }
    const { data: updatedData, error: updateError } = await supabase
      .from("Personal Tracking")
      .update({
        personal: { notes: personalProjectNotes, dailyDone: true },
      })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };
  useEffect(() => {
    const fetchValues = async () => {
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
        const { data, error } = await supabase
          .from("Personal Tracking")
          .insert([{ id: formattedDate, date: new Date() }]);
        if (error) {
          console.error("error", error);
          return;
        }
        setPersonalProjectDailyDone(false);
        return;
      }
      setPersonalProjectDailyDone(data[0].personal.dailyDone);
    };
    fetchValues()
      .then()
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Personal Project</Text>
        </Group>
        <Group mt="sm">
          <Checkbox
            label="Daily Done"
            checked={personalProjectDailyDone}
            onChange={async () => {
              setPersonalProjectDailyDone(!personalProjectDailyDone);
              await handleProjectDailyDone();
            }}
          />
        </Group>
        <Group mt="sm">
          <Input
            placeholder="Notes"
            onKeyDown={async (event) => {
              if (event.key === "Enter") {
                await handleProjectNotesUpdate();
              }
            }}
            value={personalProjectNotes}
            onChange={(event) => {
              setPersonalProjectNotes(event.currentTarget.value);
            }}
          />
        </Group>
      </Card>
    </>
  );
}
