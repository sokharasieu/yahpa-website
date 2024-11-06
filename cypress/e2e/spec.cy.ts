// filename: cypress/integration/test_spec.js
describe('Language Switch Test', () => {
  it('Visits yahapa.org and switches the language to Vietnamese', () => {
    // Visit the website
    cy.visit('https://yahpa.org');

    // Find and click the language switcher (assuming it has an id or class you can target)
    cy.get('.css-1gpsbw3').select('vi'); // Assuming 'vi' is the value for Vietnamese

    // Verify that the language has been switched to Vietnamese
    // This can be done by checking for a specific element that changes with the language
    cy.get('body').should('contain', 'Tiếng Việt'); // Adjust the selector and text as needed
  });
});