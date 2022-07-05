import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import authConfig from "../auth-config.json";

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    console.log(appState);
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientID}
      audience={authConfig.audience}
      redirectUri={"http://localhost:3000/auth"}
      //onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
