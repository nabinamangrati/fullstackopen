describe("blog-frontend", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
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
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
      cy.contains("mluukkai logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("show login").click();
      cy.get("#username").type("nabina14");
      cy.get("#password").type("nabina1");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password");
    });
    describe("When logged in", function () {
      beforeEach(function () {
        cy.contains("show login").click();
        cy.get("#username").type("mluukkai");
        cy.get("#password").type("salainen");
        cy.get("#login-button").click();
      });

      it("A blog can be created", function () {
        cy.contains("new blog").click();
        cy.get("#title").type("title cypress");
        cy.get("#author").type("author cypress");
        cy.get("#url").type("url cypress");
        cy.get("#submit").click();

        cy.contains("title cypress");
        cy.contains("author cypress");
      });
      it("A blog can be liked", function () {
        cy.contains("new blog").click();
        const newBlog = {
          title: "New Blog",
          author: "Cypress tester",
          url: "www.example.com",
        };
        cy.wait(1000);
        cy.supportCreateBlog(newBlog);

        cy.wait(500);
        cy.get("#view").click();
        cy.contains("0");

        cy.get("#like-button").click();
        cy.contains("1");
      });
    });
  });
});
