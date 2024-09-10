// Function to retry API request until it succeeds
export function retryRequest(url, method = 'GET', failOnStatusCode = false) {
    function makeRequest() {
        cy.request({
            method,
            url,
            failOnStatusCode
        }).then((response) => {
            if (response.status !== 200) {
                // Retry the request if the status is not 200
                cy.log(`Retrying request to ${url}...`);
                cy.wait(1000);  // Wait 1 second before retrying
                makeRequest();  // Recursive retry
            } else {
                cy.wrap(response).should('have.property', 'status', 200);
            }
        });
    }

    // Call the request function
    makeRequest();
}