import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/",
  realm: "bookstore-realm",
  clientId: "ecommerce-frontend",
});

export default keycloak;
