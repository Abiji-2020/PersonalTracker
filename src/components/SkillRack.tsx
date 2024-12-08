import { Card, Checkbox, Group, Input, NumberInput, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { supabase, formatDateToDDMMYYYY } from "../lib/supabase";
export default function SkillRack() {
  const [skillRackNotes, setSkillRackNotes] = useState("");
  const [skillRackDailyDone, setSkillRackDailyDone] = useState(false);
  const [skillRackProblemsSolved, setSkillRackProblemsSolved] = useState(0);
  const handleSkillRackNotesUpdate = async () => {
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
        skill_rack: {
          notes: skillRackNotes,
          dailyDone: skillRackDailyDone,
          problemsSolved: skillRackProblemsSolved,
        },
      })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };
  const handleSkillRackDailyDone = async () => {
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
        skill_rack: {
          dailyDone: !skillRackDailyDone,
          notes: skillRackNotes,
          problemsSolved: skillRackProblemsSolved,
        },
      })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };
  const handleSkillRackProblemsSolved = async () => {
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
        skill_rack: {
          problemsSolved: skillRackProblemsSolved,
          dailyDone: skillRackDailyDone,
          notes: skillRackNotes,
        },
      })
      .eq("id", formattedDate);
    if (updateError) {
      console.error("error", updateError);
      return;
    }
  };
  useEffect(() => {
    const formattedDate = formatDateToDDMMYYYY(new Date());
    const fetchSkillRackData = async () => {
      const { data, error } = await supabase
        .from("Personal Tracking")
        .select("skill_rack")
        .eq("id", formattedDate);
      if (error) {
        console.error("error", error);
        return;
      }
      if (data.length === 0) {
        return;
      }
      if (data[0].skill_rack === null || data[0].skill_rack === undefined)
        return;
      setSkillRackNotes(data[0].skill_rack.notes);
      setSkillRackDailyDone(data[0].skill_rack.dailyDone);
      setSkillRackProblemsSolved(data[0].skill_rack.problemsSolved);
    };
    fetchSkillRackData();
  }, []);
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>SkillRack</Text>
        </Group>
        <Group mt="sm">
          <Checkbox
            label="Daily Done"
            checked={skillRackDailyDone}
            onChange={() => {
              setSkillRackDailyDone(!skillRackDailyDone);
              handleSkillRackDailyDone();
            }}
          />
        </Group>
        <Group mt="sm">
          <NumberInput
            label="Problems Solved"
            placeholder="Problems Solved"
            value={skillRackProblemsSolved}
            onChange={(value) => {
              const valueString = parseInt(value.toString());
              setSkillRackProblemsSolved(valueString);
              handleSkillRackProblemsSolved();
            }}
          />
        </Group>
        <Group mt="sm">
          <Input
            placeholder="Notes"
            value={skillRackNotes}
            onChange={(event) => {
              setSkillRackNotes(event.currentTarget.value);
              handleSkillRackNotesUpdate();
            }}
          />
        </Group>
      </Card>
    </>
  );
}
