const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://client.amega.finance/',
    specPattern: 'cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/index.js',
    pluginFile: 'cypress/plugins/index.js',
    chromeWebSecurity: false
  },
})
