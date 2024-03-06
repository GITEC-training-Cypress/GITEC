//https://docs.cypress.io/api/cypress-api/config
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://magento.softwaretestingboard.com',
    // testIsolation: false
  },
});
