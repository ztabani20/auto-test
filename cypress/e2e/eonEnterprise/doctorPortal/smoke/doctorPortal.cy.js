/// <reference types="cypress" />

const {
  loginButton,
  passwordInput,
  emailInput,
  loginForm,
} = require("../pageObject/loginPageLocators");

const {
  logoutButton,
  profileButton,
} = require("../pageObject/homepagePageLocators");

describe(
  "Eon Enterprise Doctor Portal - Verify login and logout functionality",
  { tags: "@smoke" },
  () => {

    it("Verify user can login to doctor portal", () => {
      cy.visit("/authentication/login");
      cy.login(emailInput, passwordInput);
    });

    it("Verify user can logout from doctor portal", () => {
      cy.visit("/authentication/login");
      cy.login(emailInput, passwordInput);

      // logout
      cy.get(profileButton).click();
      cy.contains(logoutButton).click({ force: true });
      cy.get("button").contains("Yes").click();
      cy.get(loginForm).should("be.visible");
    });
  }
);
