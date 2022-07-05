import { useState } from "react";
import { Input } from "rsuite";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

import Loading from "../components/Loading";
import Header from "../components/Header";
import Button from "../components/Button";

const Introduce = () => {
  const navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      await fetch("http://localhost:3001/api/user/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profile, email: user.email }),
      });
      setLoading(false);
      navigate("/home");
    } catch (e) {
      // something wrong happened
    }
  };

  return (
    <>
      <Header>Introduce Yourself.</Header>
      <Input
        as="textarea"
        rows={10}
        placeholder="Ea aliqua proident anim esse irure eu proident officia dolore cupidatat est proident ad officia pariatur. Ut sit culpa velit et aute officia. Fugiat fugiat cillum mollit deserunt irure officia fugiat duis voluptate. Nostrud enim minim reprehenderit sunt. Qui cillum non esse officia ut eiusmod anim ipsum sit nisi et tempor commodo magna officia. Incididunt ipsum velit veniam nostrud culpa anim consectetur. Voluptate laboris ea ullamco esse. Velit id sunt irure in aliquip. Velit est exercitation sunt nulla duis commodo elit exercitation eu fugiat veniam cupidatat reprehenderit in laboris. Magna deserunt "
        onChange={setProfile}
      />
      <Button
        appearance="primary"
        style={{ marginTop: "30px" }}
        loading={loading}
        onClick={submitForm}
        block
      >
        Next
      </Button>
    </>
  );
};

export default withAuthenticationRequired(Introduce, {
  onRedirecting: () => <Loading />,
});
