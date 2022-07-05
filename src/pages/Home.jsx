import { useState } from "react";
import { Stack, Container, Input, Avatar, Loader } from "rsuite";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Introduce = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getMentors = async () => {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch("http://localhost:3001/api/mentors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setMentors(data);
        setLoading(false);
      } catch (e) {
        // something wrong happened
      }
    };

    getMentors();
  }, []);

  return (
    <Container
      style={{
        height: "100%",
        marginTop: "20px",
      }}
    >
      <Input placeholder="Default Input" style={{ marginTop: "10px" }} />
      <h4 style={{ marginTop: "10px", marginBottom: "20px" }}>
        Mentors for you.
      </h4>
      {loading ? (
        <Stack
          style={{
            display: "flex",
            flex: "1",
            justifyContent: "center",
          }}
        >
          <Loader size="lg" />
        </Stack>
      ) : (
        <div
          style={{ padding: "10px", display: "flex", flexDirection: "column" }}
        >
          {mentors.length &&
            mentors.map((user, index) => {
              return (
                <Stack
                  style={{
                    marginBottom: "15px",
                    padding: "5px",
                  }}
                  direction="row"
                  spacing={20}
                  justifyContent="flex-start"
                  onClick={() => {
                    navigate("/user", { state: user });
                  }}
                >
                  <Avatar
                    key={index}
                    size="lg"
                    circle
                    src={user.picture}
                    alt={`image of user ${user.name}`}
                  />
                  <p style={{ fontWeight: "bold" }}> {user.name}</p>
                </Stack>
              );
            })}
        </div>
      )}
    </Container>
  );
};

export default withAuthenticationRequired(Introduce, {
  onRedirecting: () => <Loading />,
});
