/// <reference types="cypress" />

const {
  passwordInput,
  emailInput,
} = require("../pageObject/loginPageLocators");

const {
  activeStep,
  firstNameInput,
  lastNameInput,
  shippingAddressDropDown,
  submitButton,
  photoRecords,
  impressionRecords,
  chiefComplaintTextArea,
  archOptions,
  shippingAddressValue,
} = require("../pageObject/caseSubmissionPageLocators");

describe("Doctor Portal Case Submission", { tags: "@regression" }, () => {
  beforeEach(() => {
    cy.visit("/authentication/login");
    cy.login(emailInput, passwordInput);
  });

  // we can use the cleanup function inside each it, to avoid failing of all test blocks when a test failed
  afterEach(() => {
    cy.deleteDsoCase("@responseBodyData");
  });

  it("Verify user can submit a case.", () => {
    // click on submit case button
    cy.get("button>span").contains("Submit aligner case").click();

    ///// Spy Network Calls
    cy.intercept("POST", "https://dso-stg-be.eonmfg.com/api/v1/doctor/case").as(
      "responseBodyData"
    );

    // Patient Information screen
    cy.get(activeStep).should("have.text", "Patient Information");
    cy.get(firstNameInput).type("yazan");
    cy.get(lastNameInput).type("automation123");
    cy.get(shippingAddressDropDown).click();
    cy.get(shippingAddressValue).click();
    cy.get(submitButton).contains("Save").click();

    // Photos & X-rays screen
    cy.get(activeStep).should("have.text", "Photos & X-rays");
    cy.get(photoRecords)
      .eq(0)
      .selectFile("cypress/fixtures/testimage.jpg", { force: true });
    cy.get(".overlay-loader").should("not.exist");
    cy.get(photoRecords)
      .eq(1)
      .selectFile("cypress/fixtures/testimage.jpg", { force: true });
    cy.get(".overlay-loader").should("not.exist");
    cy.get(photoRecords)
      .eq(2)
      .selectFile("cypress/fixtures/testimage.jpg", { force: true });
    cy.get(".overlay-loader").should("not.exist");
    cy.get(submitButton).eq(1).click();

    // Impressions screen
    cy.get(activeStep).should("have.text", "Impressions");
    cy.get(impressionRecords)
      .eq(0)
      .selectFile("cypress/fixtures/lowerImpression.stl", { force: true });
    cy.get(".overlay-loader").eq(0).should("not.exist");
    cy.get(impressionRecords)
      .eq(1)
      .selectFile("cypress/fixtures/lowerImpression.stl", { force: true });
    cy.get(".overlay-loader").eq(2).should("not.exist");
    cy.get(submitButton).eq(1).click();

    // Prescription
    cy.get(activeStep).should("have.text", "Prescription");
    cy.get(chiefComplaintTextArea).type("automation test");
    cy.get(archOptions).check({ force: true });
    cy.get(submitButton).eq(1).click();

    // Summary prescription
    cy.get(activeStep).should("have.text", "Summary");
    cy.get(submitButton).click();

    //Submission Complete
    cy.get(activeStep).should("have.text", "Submission Complete");
    cy.contains("Case submitted successfully").should("be.visible");
  });
});
