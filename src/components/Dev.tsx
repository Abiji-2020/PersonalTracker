import "@mantine/core/styles.css";
import { MantineProvider, Grid, Button } from "@mantine/core";
import PTOD from "./PTOD";
import Striver from "./Striver";
import PersonalProject from "./PersonalProject";
import Internship from "./Internship";
import SkillRack from "./SkillRack";
export default function Dev() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Button>Update Date</Button>
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
