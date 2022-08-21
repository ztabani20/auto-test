const {
  loginButton,
} = require("../e2e/eonEnterprise/doctorPortal/pageObject/loginPageLocators");

const backendUrl = Cypress.env("ENTERPRISE_BACKEND_URL");
const doctorEmail = Cypress.env("ENTERPRISE_DOCTOR_EMAIL");
const doctorPassword = Cypress.env("ENTERPRISE_DOCTOR_PASSWORD");

/**
 * User Login
 *
 * @param{string} email - user email
 * @param{string} password - user password
 *
 */
Cypress.Commands.add("login", (email, password) => {
  cy.get(email).type(doctorEmail);
  cy.get(password).type(doctorPassword);
  cy.contains(loginButton).click();
  cy.get("button>span").contains("Submit aligner case").should("be.visible");
});

/**
 * Delete Dso Case After each it()
 *
 * @param{object} responseBody - response Data from cy.intercept()
 *
 */
Cypress.Commands.add("deleteDsoCase", (responseBody) => {
  // auth admin user
  cy.request("POST", `${backendUrl}/admin/auth`, {
    username: "y.mughrabi@eonaligner.com",
    password: "Test@2020",
  });

  // Delete dso case
  cy.get(responseBody)
    .its("response.body")
    .then((response) => {
      cy.request(
        "DELETE",
        `${backendUrl}/admin/dso/case/${response.uuid}`
      );
    });
});

// /**
//  * To return the request body after make submit
//  *
//  * @param{string} method - name of the request type
//  * @param{string} url
//  *
//  */
// Cypress.Commands.add("checkRequestBody", (method, url) => {
//   cy.intercept(method, url).as("requestBodyData");
//   cy.get().click();
//   cy.wait("@requestBodyData")
//     .its("request.body")
//     .then((request) => {
//       cy.wrap(request);
//     });
// });
