import { useLocation, useNavigate } from "react-router";
import { Avatar, Container } from "rsuite";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Button from "../components/Button";
import Loading from "../components/Loading";
import PageHeaderWithButton from "../components/PageHeaderWithButton";

const User = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, profile, picture, email } = location.state;
  const handleClick = () =>
    navigate("/schedule", { state: { mentorEmail: email } });

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PageHeaderWithButton>Back</PageHeaderWithButton>
      <Container style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: "1",
          }}
        >
          <Avatar
            size="lg"
            circle
            src={picture}
            alt={`image of user ${name}`}
          />
          <h3 style={{ margin: "20px" }}> {name}</h3>
          <Button size="lg" block appearance="primary" onClick={handleClick}>
            Schedule a call
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: "2",
          }}
        >
          <h4>About Me</h4>
          <p style={{ marginTop: "10px", fontSize: "20px" }}>{[profile]}</p>
        </div>
      </Container>
    </div>
  );
};

export default withAuthenticationRequired(User, {
  onRedirecting: () => <Loading />,
});
