import "@mantine/core/styles.css";
import { MantineProvider, Grid, Button } from "@mantine/core";
import PTOD from "./PTOD";
import Striver from "./Striver";
import PersonalProject from "./PersonalProject";
import Internship from "./Internship";
import SkillRack from "./SkillRack";
import { supabase, formatDateToDDMMYYYY } from "../lib/supabase";
export default function Dev() {
  const handleUpdateDate = async () => {
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
  };
  return (
    <MantineProvider defaultColorScheme="dark">
      <Button onClick={handleUpdateDate}>Update Date</Button>
      <Grid>
        <Grid.Col span={4}>
          <PTOD />
        </Grid.Col>
        <Grid.Col span={4}>
          <Striver />
        </Grid.Col>
        <Grid.Col span={4}>
          <PersonalProject />
        </Grid.Col>
        <Grid.Col span={4}>
          <Internship />
        </Grid.Col>
        <Grid.Col span={4}>
          <SkillRack />
        </Grid.Col>
      </Grid>
    </MantineProvider>
  );
}
