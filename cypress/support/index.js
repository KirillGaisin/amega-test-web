import './commands'

const urlsToBlock = [
    '**/cdn.cookielaw.org/**',
    '**/geolocation.onetrust.com/**'
]

beforeEach(() => {
    // Clear cookies and local storage to avoid cached responses
    cy.clearCookies()
    cy.clearLocalStorage()

    // Intercept and block the cookie popups
    urlsToBlock.forEach((url) => {
        cy.intercept({
            method: 'GET',
            url: url
        }, (req) => {
            console.log(`Blocking request to: ${req.url}`)
            req.reply({
                statusCode: 404,
                body: ''
            })
        }).as('blockCookieLawPopup')
    })

    // Block Pushwoosh Web Notifications
    cy.intercept('GET', '**/pushwoosh-web-notifications.js', (req) => {
        req.reply({
            statusCode: 404,
            body: {}
        })
    }).as('blockPushwoosh')

    // Mock manifest.json
    cy.intercept('GET', '**/manifest.json', (req) => {
        req.reply({
            statusCode: 200,
            body: {}
        })
    }).as('mockManifest')

    // Optionally, block third-party services like Facebook tracking
    cy.intercept('GET', '**facebook.com/**', (req) => {
        req.reply({
            statusCode: 200,
            body: {}
        })
    }).as('blockFacebookTracking')
})