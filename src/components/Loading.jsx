import { Loader, Stack } from "rsuite";

export default function Loading() {
  return (
    <Stack
      style={{ height: "100%" }}
      justifyContent="center"
      alignItems="center"
    >
      <Loader size="lg" />
    </Stack>
  );
}
