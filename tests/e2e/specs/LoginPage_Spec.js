// https://docs.cypress.io/api/introduction/api.html

describe("La página de Login", () => {
  it("Carga Correctamente", () => {
    cy.visit("/login");
    cy.get('.col-sm-8').and('be.visible')
    cy.get('.v-app-bar > .v-toolbar__content > .v-toolbar__title').and('be.visible')
  });
  it("Te redirecciona desde cualquier Url", () => {
    cy.visit("/pedidos");
    cy.get('.col-sm-8').and('be.visible')
    cy.visit("/urldeprueba");
    cy.get('.col-sm-8').and('be.visible')
    cy.visit("/manolo");
    cy.get('.col-sm-8').and('be.visible')
  });
  it("La contraseña tiene la propiedad password", () => {
    cy.visit("/login");
    cy.get('#password').type('123456789')
    cy.get('#password').should('have.value', '123456789')
    cy.get('#password').should('have.attr', 'type', 'password')
  });
  it("No te deja iniciar sesión debido a una contraseña o usuario erróneo", () => {
    cy.visit("/login");
    cy.get('#input-19').type('FalseUser@gmail.com')
    cy.get('#input-19').should('have.value', 'FalseUser@gmail.com')
    cy.get('#password').type('123456789')
    cy.get('#password').should('have.value', '123456789')
    cy.get('#password').should('have.attr', 'type', 'password')
    cy.get('.v-card__actions > .v-btn').click()
    cy.get('.v-overlay__content > .v-card').and('be.visible')
    cy.get('.text-center').contains('El usuario o contraseña ingresada no es correcta.Por favor, inténtelo de nuevo.')
    cy.get('.mb-4 > .v-btn__content').click()
    cy.get('.v-overlay__content > .v-card').and('not.be.visible')
    cy.location('pathname').should('not.eq', '/MostrarPedidos')
  });

  it("Puedes iniciar sesión sin problemas", () => {
    cy.visit("/login");
    cy.get('#input-19').type('manolo@gmail.com')
    cy.get('#input-19').should('have.value', 'manolo@gmail.com')
    cy.get('#password').type('123456789')
    cy.get('#password').should('have.value', '123456789')
    cy.get('#password').should('have.attr', 'type', 'password')
    cy.get('.v-card__actions > .v-btn').click()
    cy.location('pathname').should('eq', '/MostrarPedidos')
  });
});
