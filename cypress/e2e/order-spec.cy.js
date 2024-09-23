describe("order-spec", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'getOrders'
    }).as('getOrders');

    cy.visit('http://localhost:3000/');
  });

  it("Should display the landing page, with title, form and orders", () => {
    cy.get('body').should('be.visible');
    cy.get('input').should('have.value', '');
    cy.get('[name="beans"]').contains('beans');
    cy.get('[name="steak"]').contains('steak');
    cy.get('[name="carnitas"]').contains('carnitas');
    cy.get('[name="sofritas"]').contains('sofritas');
    cy.get('[name="lettuce"]').contains('lettuce');
    cy.get('[name="queso fresco"]').contains('fresco');
    cy.get('[name="pico de gallo"]').contains('pico de gallo');
    cy.get('[name="hot sauce"]').contains('hot sauce');
    cy.get('[name="guacamole"]').contains('guacamole');
    cy.get('[name="jalapenos"]').contains('jalapenos');
    cy.get('[name="cilantro"]').contains('cilantro');
    cy.get('[name="sour cream"]').contains('sour cream');

    cy.get('form > p').contains('Order: Nothing selected');
    cy.get('[type="submit"]').should('exist');

    cy.get('section').children().should('have.length', 3);
    cy.get('section > :nth-child(1)').should('be.visible');
    cy.get(':nth-child(1) > h3').contains('Pat');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(1)').contains('bean');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(2)').contains('lettuce');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(3)').contains('carnitas');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(4)').contains('queso fresco');
    cy.get(':nth-child(1) > .ingredient-list > :nth-child(5)').contains('jalapeno');
  });

  it('Should be able to fill out a name and add a new order', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      fixture: 'newOrder'
    }).as('POSTorder');

    cy.get('input').type('Carissa');
    cy.get('[name="beans"]').click();
    cy.get('[name="lettuce"]').click();
    cy.get('[type="submit"]').should('be.visible').click();

    cy.get('section').children().should('have.length', 4);
    cy.get('section > :nth-child(4)').should('be.visible');
  });

  it('Should not POST an order if the name input is not filled out', () => {
    cy.get('[name="beans"]').click();
    cy.get('[name="lettuce"]').click();
    cy.get('[type="submit"]').should('be.disabled');
    cy.get('[type="submit"]').click({ force: true }); 

    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      fixture: 'badNoName'
    }).as('badPOSTorder');

    cy.on('window:alert', (alertMessage) => {
      expect(alertMessage).to.equal('Please enter a name and select at least one ingredient.')
    });
  })

  it('Should not Post an order , and display a message if the Name input is filled out but no intreginets are selected', () => {
    cy.get('input').type('Carissa');
    cy.get('[type="submit"]').click();
    cy.on('window:alert', (alertMessage) => {
      expect(alertMessage).to.equal('Please enter a name and select at least one ingredient.')
    });
  })
});
