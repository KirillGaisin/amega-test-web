# Cypress E2E Tests for Amega App

This project contains end-to-end (E2E) tests for the Amega app using Cypress. These tests ensure that core functionalities 
such as login, position opening, and logout work as expected.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* Node.js (v16+)
* npm (v7+)
* Installed Cypress (npm install cypress --save-dev)

## Installation

1. CLone the repository:
    ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. Install dependencies:
    ```bash
   npm-install
   ```
## Running Tests
Run All Tests:
```bash
npx cypress run
```
Run Specific Test File:
```bash
npx cypress run --spec cypress/integration/<your-test-file>.cy.js
```
Run in Cypress UI (Interactive Mode):
```bash
npx cypress open
```
### CUstom Environment Variables:
As of now, these variables are mandatory and must be passed like so:
```bash
npx cypress run --env email=myemail@example.com,password=mypassword
```
Inside the tests, variables are located in the beginning of `login-tests.cy.js` file:
```js
const email = Cypress.env('email')
const password = Cypress.env('password')
cy.login(email, password)
```

## Cypress Configuration
The main Cypress config file is `cypress.config.js`, where you can set base URLs and custom environment variables:
```js
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://client.amega.finance/',
    env: {
      email: 'default-email@example.com',
      password: 'defaultpassword'
    }
  }
})
```
## Folder Structure
```bash
cypress/
  ├── fixtures/            # Test data
  ├── integration/         # Test specs
  ├── support/             # Custom commands & hooks
  └── plugins/             # Plugins for Cypress
```
* `cypress/integration/`: Contains all test files.
* `cypress/fixtures/`: Holds mock data for tests.
* `cypress/support/commands.js`: Custom commands used in tests (e.g., cy.login()).
* `cypress/support/index.js`: Global configuration and hooks.

## Example Test
```js
describe('Login and Logout Flow', () => {
  it('should log in and log out successfully', () => {
    cy.visit('/login')
    cy.login(Cypress.env('email'), Cypress.env('password'))
    cy.contains('Welcome back').should('be.visible')
    cy.get('button.logout').click()
    cy.url().should('include', '/login')
  })
})
```

## Running Headless Tests
To run tests in headless mode (faster, no GUI):
```bash
npx cypress run --headless
```

## Reporting

To generate and view test reports, consider using plugins such as [Allure](https://allurereport.org/docs/cypress/).