import { Card, Checkbox, Group, Input, NumberInput, Text } from "@mantine/core";

export default function SkillRack() {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>SkillRack</Text>
        </Group>
        <Group mt="sm">
          <Checkbox label="Daily Done" />
        </Group>
        <Group mt="sm">
          <NumberInput label="Problems Solved" placeholder="Problems Solved" />
        </Group>
        <Group mt="sm">
          <Input placeholder="Notes" />
        </Group>
      </Card>
    </>
  );
}
