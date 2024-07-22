describe("blog-frontend", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("loginform is shown", function () {
    cy.contains("show login").click();
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
    cy.contains("cancel");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("show login").click();
      cy.get("#username").type("nabina1415");
      cy.get("#password").type("nabina123");
      cy.get("#login-button").click();
      cy.contains("nabina1415 logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("show login").click();
      cy.get("#username").type("nabina14");
      cy.get("#password").type("nabina1");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password");
    });
  });
});
