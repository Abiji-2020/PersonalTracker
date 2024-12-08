import { Card, Checkbox, Group, Input, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { supabase, formatDateToDDMMYYYY } from "../lib/supabase";
export default function Internship() {
  const [internshipnotes, setInternshipnotes] = useState("");
  const [internshipdailydone, setInternshipdailydone] = useState(false);
  const handleChange = async () => {
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
      const {  error } = await supabase
        .from("Personal Tracking")
        .insert([{ id: formattedDate, date: new Date() }]);
      if (error) {
        console.error("error", error);
        return;
      }
    }
    const {  error: updateError } = await supabase
      .from("Personal Tracking")
      .update({
        internship: { dailydone: !internshipdailydone, notes: internshipnotes },
      })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };
  const handleNotesUpdate = async () => {
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
      const {  error } = await supabase
        .from("Personal Tracking")
        .insert([{ id: formattedDate, date: new Date() }]);
      if (error) {
        console.error("error", error);
        return;
      }
    }
    const {  error: updateError } = await supabase
      .from("Personal Tracking")
      .update({ internship: { notes: internshipnotes, dailydone: true } })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };

  useEffect(() => {
    const fetchvalues = async () => {
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
          .insert([{ id: formattedDate, date: new Date() }]);
        if (error) {
          console.error("error", error);
          return;
        }
        setInternshipdailydone(false);
        return;
      }
      setInternshipdailydone(data[0].internship.dailydone);
    };
    fetchvalues()
      .then()
      .catch((error) => console.error("error", error));
  }, []);
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Internship</Text>
        </Group>
        <Group mt="sm">
          <Checkbox
            label="Daily Done"
            checked={internshipdailydone}
            onChange={async () => {
              setInternshipdailydone(!internshipdailydone);
              await handleChange();
            }}
          />
        </Group>
        <Group mt="sm">
          <Input
            placeholder="Notes"
            onKeyDown={async (event) => {
              if (event.key == "Enter") {
                await handleNotesUpdate();
              }
            }}
            value={internshipnotes}
            onChange={(event) => setInternshipnotes(event.currentTarget.value)}
          />
        </Group>
      </Card>
    </>
  );
}
