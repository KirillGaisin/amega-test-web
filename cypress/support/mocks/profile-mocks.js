export const mockProfileAPI = () => {

    cy.intercept('OPTIONS', '**/profile', (req) => {
        console.log('Profile OPTIONS request:', req)
        req.reply({
            statusCode: 204,
            body: {},
        })
    }).as('optionsProfile')

    cy.fixture('profile/profile_get.json').then((profile) => {
        cy.intercept('GET', '**/profile', (req) => {
            console.log('Profile GET request:', req)
            req.reply({
                statusCode: 200,
                body: profile,
            })
        }).as('getProfile')
    })

    cy.fixture('profile/profile_put.json').then((profileUpdate) => {
        cy.intercept('PUT', '**/profile', (req) => {
            console.log('Profile PUT request:', req)
            req.reply({
                statusCode: 200,
                body: profileUpdate,
            })
        }).as('putProfile')
    })

    cy.fixture('profile/accounts.json').then((accounts) => {
        cy.intercept('POST', '**/accounts', (req) => {
            console.log('Accounts POST request:', req)
            req.reply({
                statusCode: 200,
                body: accounts,
            })
        }).as('postAccounts')
    })

    cy.fixture('profile/transactions.json').then((transactions) => {
        cy.intercept('POST', '**/transactions', req => {
            console.log('Transactions POST request:', req)
            req.reply({
                statusCode: 200,
                body: transactions,
            })
        }).as('postTransactions')
    })

    cy.fixture('profile/applications_configs.json').then((applicationsConfigs) => {
      cy.intercept('GET', '**/applications', req => {
          console.log('Applications configs GET request:', req)
          req.reply({
              statusCode: 200,
              body: applicationsConfigs,
          })
      }).as('getApplicationsConfigs')
    })
}