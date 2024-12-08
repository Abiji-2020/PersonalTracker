import { Card, Checkbox, Group, Input, NumberInput, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { supabase, formatDateToDDMMYYYY } from "../lib/supabase";
export default function Striver() {
  const [striverNotes, setStriverNotes] = useState("");
  const [striverDailyDone, setStriverDailyDone] = useState(false);
  const [striverProblemsSolved, setStriverProblemsSolved] = useState(0);
  const handleStriverNotesUpdate = async () => {
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
      const {  error } = await supabase
        .from("Personal Tracking")
        .insert([{ id: formattedDate, date: new Date() }]);
      if (error) {
        console.error("error", error);
        return;
      }
    }
    const { error: updateError } = await supabase
      .from("Personal Tracking")
      .update({
        striver_sheet: {
          notes: striverNotes,
          dailyDone: striverDailyDone,
          problemsSolved: striverProblemsSolved,
        },
      })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };
  const handleStriverDailyDone = async () => {
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
        striver_sheet: {
          dailyDone: !striverDailyDone,
          notes: striverNotes,
          problemsSolved: striverProblemsSolved,
        },
      })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };
  const handleStriverProblemsSolved = async () => {
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
        striver_sheet: {
          problemsSolved: striverProblemsSolved,
          dailyDone: striverDailyDone,
          notes: striverNotes,
        },
      })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };
  useEffect(() => {
    const fetchStriverData = async () => {
      const formattedDate = formatDateToDDMMYYYY(new Date());
      const { data, error } = await supabase
        .from("Personal Tracking")
        .select("striver_sheet")
        .eq("id", formattedDate);
      if (error) {
        console.error("error", error);
        return;
      }
      if (data === undefined || data.length === 0) {
        return;
      }
      if (data[0].striver_sheet === undefined || data[0].striver_sheet === null)
        return;
      setStriverNotes(data[0].striver_sheet.notes);
      setStriverDailyDone(data[0].striver_sheet.dailyDone);
      setStriverProblemsSolved(data[0].striver_sheet.problemsSolved);
    };
    fetchStriverData();
  }, []);
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Striver</Text>
        </Group>
        <Group mt="sm">
          <Checkbox
            label="Daily Done"
            checked={striverDailyDone}
            onChange={() => {
              setStriverDailyDone(!striverDailyDone);
              handleStriverDailyDone();
            }}
          />
        </Group>
        <Group mt="sm">
          <NumberInput
            label="Problems Solved"
            placeholder="Problems Solved"
            value={striverProblemsSolved}
            onChange={(value) => {
              const valueString = parseInt(value.toString());
              setStriverProblemsSolved(valueString);
              handleStriverProblemsSolved();
            }}
          />
        </Group>
        <Group mt="sm">
          <Input
            placeholder="Notes"
            value={striverNotes}
            onChange={(event) => {
              setStriverNotes(event.currentTarget.value);
              handleStriverNotesUpdate();
            }}
          />
        </Group>
      </Card>
    </>
  );
}
