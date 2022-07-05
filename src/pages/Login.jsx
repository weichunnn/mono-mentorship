import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container } from "rsuite";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <h1>Getting Started</h1>
        <p>Esse tempor velit sit.</p>
        <Container style={{ marginTop: "20px" }}>
          <Button
            appearance="primary"
            size="lg"
            block
            onClick={() => loginWithRedirect()}
          >
            Sign In
          </Button>
          <p style={{ marginTop: "20px", textAlign: "center" }}>
            By creating an account, you agree to Futurelab's{" "}
            <a href="https://futurelab.global/terms" target="_blank">
              terms and condition
            </a>
          </p>
        </Container>
      </Container>
    </div>
  );
}
