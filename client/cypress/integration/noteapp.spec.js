describe("Note app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    cy.request("POST", "http://localhost:3001/api/testing/reset");

    cy.addUser()
  });

  it("Frontpage can be opened", () => {
    cy.contains("Bienvenido");
  });

    it("User fails with wrong password", () => {
      cy.get('[placeholder="Username"]').type("testUser");
      cy.get('[placeholder="Password"]').type("prueba");
      cy.get("#form-login").contains("Iniciar sesión").click();
      cy.contains("Usuario o contraseña incorrecta");
    });
});

describe("When logged in", () => {
  beforeEach(() => {
    cy.get('[placeholder="Username"]').type("testUser");
    cy.get('[placeholder="Password"]').type("admin123");
    cy.get("#form-login").contains("Iniciar sesión").click();
  });

  it("A new note can be created", () => {
    cy.get("textarea").type("A new note created by Cypress prueba");
    cy.contains("Agregar Nota").click();
    cy.contains("A new note created by Cypress");
  });
});
