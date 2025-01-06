
describe('Language Switch Test', () => {
  it('Visits yahapa.org and switches the language to Vietnamese', () => {

    // Visit the website
    cy.visit('https://yahpa.org');

    // Find the language switcher element and select Vietnamese
    cy.get('.css-1gpsbw3').select('vi');

    // Verify that the language has been switched to Vietnamese
    cy.get('body').should('contain', 'Tiếng Việt'); 
  });
});
//