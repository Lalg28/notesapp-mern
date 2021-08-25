Cypress.Commands.add("addUser", () => {
  const user = {
    name: "Antonio",
    username: "testUser",
    password: "admin123",
  };

  cy.request("POST", "http://localhost:3001/api/users", user);
});
