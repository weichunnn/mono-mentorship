import { Button } from "rsuite";

export default function AppButton({ children, style, ...props }) {
  return (
    <Button {...props} style={{ ...style, height: "40px" }}>
      {children}
    </Button>
  );
}
