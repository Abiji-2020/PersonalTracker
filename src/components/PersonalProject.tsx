import { Card, Group, Text, Checkbox, Input } from "@mantine/core";

export default function PersonalProject() {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Personal Project</Text>
        </Group>
        <Group mt="sm">
          <Checkbox label="Daily Done" />
        </Group>
        <Group mt="sm">
          <Input placeholder="Notes" />
        </Group>
      </Card>
    </>
  );
}
