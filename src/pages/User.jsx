import { useLocation, useNavigate } from "react-router";
import { Avatar, IconButton, Button, Container } from "rsuite";
import ArowBackIcon from "@rsuite/icons/ArowBack";

const User = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, profile, picture } = location.state;
  return (
    <>
      <IconButton
        icon={<ArowBackIcon />}
        size="lg"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </IconButton>
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
          <h4 style={{ margin: "20px" }}> {name}</h4>
          <Button size="lg" block appearance="primary">
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
          <p style={{ marginTop: "10px" }}>{[profile]}</p>
        </div>
      </Container>
    </>
  );
};

export default User;
