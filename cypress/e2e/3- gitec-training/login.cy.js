
//https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests
describe('Validar funcionalidades de login', () => {

    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.on('uncaught:exception', (err, runnable) => {
            console.error('Exceção não tratada:', err.message);
            return false;
        })
    })

    context('Criando novo usuário', () => {
        it.only('Validar registo de um novo usuário', () => {
            //acessando tela de novo usuário
            cy.get('.panel > .header > :nth-child(3) > a').click()

            //validando se está na pagina de login
            cy.get('.base').should('have.text', 'Create New Customer Account')

            //preenchendo informações de usuário e salvando
            cy.get('#firstname').type('Marina')
            cy.get('#lastname').type('Santos')
            cy.get('#email_address').type('marina.santos@email.com.eu')
            cy.get('#password').type('Marina-486684')
            cy.get('#password-confirmation').type('Marina-486684')
            cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()

            //validando criação do usuário
            cy.get('.base').should('have.text', 'My Account')
            cy.get('.block-dashboard-info > .block-content > .box > .box-title > span').should('have.text', 'Contact Information')
            cy.get('.box-content > p').should('cotains', 'Marina Santos').and(('cotains', 'marina.santos@email.com.eu'))
        });

        it('Validar registo de um novo usuário com dados dinâmicos', () => {
            //criando usuário utilizando o plugin faker-js
            //https://www.npmjs.com/package/@faker-js/faker
        });
    });

    context('Logando com usuário cadastrado', () => {
        it('Validar loging de usuário cadastrado', () => {
            cy.get('#email').type('')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()
        });

        it('Validar loging de usuário cadastrado utilizando fixtures', () => {
            //https://docs.cypress.io/api/commands/fixture

        });

        it('Logar com um usuário já cadastrado utilizando cypress.env', () => {
            //https://docs.cypress.io/api/cypress-api/env
            //banana
        });
    });
});