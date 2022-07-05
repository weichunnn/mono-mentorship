import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container } from "rsuite";
import Header from "../components/Header";

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
        <Header subtitle={"Esse tempor velit sit."}>Getting Started.</Header>
        <Container>
          <Button
            appearance="primary"
            size="lg"
            block
            onClick={async () => {
              await loginWithRedirect();
            }}
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
