describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("show login").click();
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
    cy.contains("cancel");
  });
});
