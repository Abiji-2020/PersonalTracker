import { Card, Checkbox, Group, Input, Text } from "@mantine/core";

export default function PTOD() {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Leetcode PTOD</Text>
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
