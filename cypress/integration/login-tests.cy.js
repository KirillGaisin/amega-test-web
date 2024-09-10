import {mockProfileAPI} from "../support/mocks/profile-mocks";

describe('Login functionality', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')
    const user = Cypress.env('user')

    it('Logs in with valid credentials', () => {
        mockProfileAPI()

        cy.visit('/login')

        // Enter the credentials
        cy.get('[name="email"]')
            .should('be.visible')
            .and('not.be.disabled')
            .type(email)
        cy.get('[name="password"]')
            .should('be.visible')
            .and('not.be.disabled')
            .type(password)

        // Submit the form
        cy.get('[data-testid="test-submit"]')
            .should('be.visible')
            .and('not.be.disabled')
            .click()

        cy.get('#section-welcome h3')
            .should('be.visible')
            .should('have.text', 'Welcome to Amega!')

        cy.get('#button-hub')
            .should('be.enabled')
            .click()

        cy.get('.sc-7f34fe10-2.kaRyzS')
            .should('be.visible')
            .should('have.text', user)
    })

    it('Fails login with invalid credentials', () => {
        cy.visit('/login')

        // Enter the credentials
        cy.get('[name="email"]')
            .should('be.visible')
            .and('not.be.disabled')
            .type('invaliduser@amega.com')
        cy.get('[name="password"]')
            .should('be.visible')
            .and('not.be.disabled')
            .type('invalidpassword')

        // Submit the form
        cy.get('[data-testid="test-submit"]')
            .should('be.visible')
            .and('not.be.disabled')
            .click()

        cy.get('.sc-bfc70f84-0.kHA-DiP > .sc-4b72d8c5-8.eQCRWS')
            .should('have.text', 'Incorrect email or password')
        cy.get('.sc-4b72d8c5-8.eQCRWS ~ button')
            .should('be.visible')
            .and('be.enabled')
    })

    it('Opens the position', () => {
        cy.visit('/login')
        cy.login('arcticnetherwind@gmail.com', 'T8mv7n9wyj')
        cy.wait(10_000)

        cy.get('a[href="/deposit"]')
            .should('be.visible')
            .and('not.be.disabled')
            .and('have.text', '"Deposit"')
            .click()
        cy.get('.sc-4b72d8c5-0.bwKUOK.sc-f7a5625a-9.ivITHh')
            .should('be.visible')
            .and('have.text', 'Make a Deposit')
    })
})