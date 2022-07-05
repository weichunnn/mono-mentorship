import { useEffect } from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";

const AuthCheck = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const userCheck = async () => {
      const token = await getAccessTokenSilently();
      const response = await fetch("http://localhost:3001/api/user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const { registrationStatus } = await response.json();
      if (registrationStatus) navigate("/home");
      else navigate("/introduce");
    };
    userCheck();
  }, []);
  return <></>;
};

export default withAuthenticationRequired(AuthCheck, {
  onRedirecting: () => <Loading />,
});
