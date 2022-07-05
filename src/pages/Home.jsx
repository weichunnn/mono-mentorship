import { useState, useEffect } from "react";
import { Input, Loader, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

import Loading from "../components/Loading";
import UserCard from "../components/UserCard";

const Introduce = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState({});

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
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <InputGroup inside>
        <InputGroup.Button>
          <SearchIcon />
        </InputGroup.Button>
        <Input size="lg" placeholder="Search" />
      </InputGroup>
      <h4 style={{ margin: "20px 0px" }}>Mentors for you.</h4>
      {loading ? (
        <div
          style={{
            display: "flex",
            flex: "1",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader size="lg" />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {mentors.length &&
            mentors.map((user, index) => {
              return (
                <div
                  style={{
                    marginBottom: "15px",
                    padding: "5px",
                  }}
                  key={index}
                >
                  <UserCard user={user} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default withAuthenticationRequired(Introduce, {
  onRedirecting: () => <Loading />,
});
