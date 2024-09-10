Cypress.Commands.add('login', (username, password) => {
    const csrfToken = '84b1677c3d85f8529e5c673d2ac77dfc51f9596d94a566a14c990d6b8595edef'
    cy.setCookie('__Host-next-auth.csrf-token', csrfToken)

    cy.request({
        method: 'POST',
        url: 'client-api/login',
        body: {
            email: username,
            password: password,
            rememberMe: false,
        },
    }).then((resp) => {
        const cookies = resp.headers['set-cookie']
        const sessionToken = cookies.find(cookie => cookie.startsWith('amega=')).split(';')[0].split('=')[1]

        // Set the token as a cookie for subsequent requests
        cy.setCookie('amega', sessionToken)

        // session
        cy.request({
            method: 'GET',
            url: 'api/auth/session',
        }).then((resp) => {
            expect(resp.status).to.eq(304)

            // providers
            cy.request({
                method: 'GET',
                url: 'api/auth/providers',
            }).then((resp) => {
                expect(resp.status).to.eq(200)

                // csrf
                cy.request({
                    method: 'GET',
                    url: 'api/auth/csrf',
                }).then((resp) => {
                    expect(resp.status).to.eq(200)

                    // login callback
                    cy.request({
                        method: 'POST',
                        url: 'api/auth/callback/login',
                        body: {
                            "exp": 1725990821,
                            "expDate": "2024-09-10T20:53:41+03:00",
                            "accessToken": "" /* an access token which I do not know where it comes from */,
                            "id": 215595,
                            "isVerified": false,
                            "firstDepositId": null,
                            "registrationDate": "2024-09-08T18:51:47+03:00",
                            "emailVerified": false,
                            "status": "login",
                            "callbackUrl": "/",
                            "csrfToken": `${csrfToken}`
                        }
                    }).then((resp) => {
                        expect(resp.status).to.eq(200)
                        cy.setCookie('__Secure-next-auth.session-token', "") // an encrypted token using AES Galois/Counter Mode (AES-GCM), with a key size of 256 bits, which is a symmetric encryption algorithm
                    })
                })
            })
        })
    })
})
