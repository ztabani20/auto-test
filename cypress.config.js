const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportHeight: 660,
    viewportWidth: 1400,
    baseUrl: "https://www.doctor-staging.eonmfg.com",
    defaultCommandTimeout: 15000,
    env: {
      ENTERPRISE_DOCTOR_EMAIL: "y.mughrabi+doc1adv@eonaligner.com",
      ENTERPRISE_DOCTOR_PASSWORD: "Test@2020",
      ENTERPRISE_BACKEND_URL: "https://core-be-stg.eonmfg.com",
    },
    screenshotOnRunFailure: false,
    video: false,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
