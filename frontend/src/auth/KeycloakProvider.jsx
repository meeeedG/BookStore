import { useState, useEffect } from "react";
import keycloak from "./keycloak";

function KeycloakProvider({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    keycloak
      .init({ onLoad: "check-sso", pkceMethod: "S256" })
      .then((authenticated) => {
        if (!authenticated) keycloak.login();
        else setReady(true);
      })
      .catch((error) => {
        setReady(true);
        console.error("Failed to initialize Keycloak", error);
      });
  }, []);

  if (!ready) return <div>Loading...</div>;
  return children;
}

export default KeycloakProvider;
