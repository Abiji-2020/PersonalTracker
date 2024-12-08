import "@mantine/core/styles.css";
import { MantineProvider, Grid, Button } from "@mantine/core";
import PTOD from "./PTOD";
export default function Dev() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Button>Update Date</Button>
      <Grid>
        <Grid.Col span={4}>
          <PTOD />
        </Grid.Col>
        <Grid.Col span={4}>2</Grid.Col>
        <Grid.Col span={4}>3</Grid.Col>
        <Grid.Col span={4}>4</Grid.Col>
        <Grid.Col span={4}>5</Grid.Col>
        <Grid.Col span={4}>6</Grid.Col>
      </Grid>
    </MantineProvider>
  );
}
