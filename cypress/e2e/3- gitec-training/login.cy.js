import { faker } from '@faker-js/faker';
describe('Validate features of login', () => {

    beforeEach(() => {
        //accessing the website
        cy.visit('https://magento.softwaretestingboard.com')
    })

    context('Create a new user', () => {
        beforeEach(() => {
            //accessing new user page
            cy.get('.panel > .header > :nth-child(3) > a').click()

            //asserting redirect to the loggin page
            cy.get('.base').should('have.text', 'Create New Customer Account')

            //accessing the website with the "baseUrl" parameter of the cypress.config file
            cy.visit('/customer/account/create/')

            //asserting the url with cypress.config API
            cy.url().should(
                'be.equal', `${Cypress.config("baseUrl")}/customer/account/create/`
            )
        });
        it('Validate new user registration with static datas', () => {
            //accessing new user page
            cy.get('.panel > .header > :nth-child(3) > a').click()

            //asserting if redirected to the login page using the header text
            cy.get('.base').should('have.text', 'Create New Customer Account')

            //filling in user information and saving
            cy.get('#firstname').type('Marina')
            cy.get('#lastname').type('Santos')
            cy.get('#email_address').type('marina.santos@email.com.eu')
            cy.get('#password').type('Marina-486684')
            cy.get('#password-confirmation').type('Marina-486684')
            cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()

            //asserting redirect
            cy.url().should(
                'be.equal', `${Cypress.config("baseUrl")}/customer/account/`
            )

            //asserting the create of user
            cy.get('.base').should('have.text', 'My Account')
            cy.get('.block-dashboard-info > .block-content > .box > .box-title > span').should('have.text', 'Contact Information')
            cy.get('.box-content > p').should('cotains', 'Marina Santos')
            cy.get('.box-content > p').should('cotains', 'marina.santos@email.com.eu')
        });

        it('Validate new user registration with dinamic datas', () => {
            //crate an user using the plugin "faker-js"
            //https://www.npmjs.com/package/@faker-js/faker

            let firstName = faker.name.firstName()
            let lastName = faker.name.lastName()
            let email = faker.internet.email()
            let password = faker.internet.password()

            cy.get('.panel > .header > :nth-child(3) > a').click()
            cy.get('.base').should('have.text', 'Create New Customer Account')

            cy.get('#firstname').type(firstName)
            cy.get('#lastname').type(lastName)
            cy.get('#email_address').type(email)
            cy.get('#password').type(password)
            cy.get('#password-confirmation').type(password)
            cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()

            cy.url().should(
                'be.equal', `${Cypress.config("baseUrl")}/customer/account/`
            )

            cy.get('.base').should('have.text', 'My Account')
            cy.get('.block-dashboard-info > .block-content > .box > .box-title > span').should('have.text', 'Contact Information')
            cy.get('.box-content > p').should('cotains', firstName + lastName)
            cy.get('.box-content > p').should('cotains', email)
        });
    });

    context('Loging with a user registered', () => {
        it('Validate login of an user registered with static datas', () => {
            cy.get('#email').type('marina.santos@email.com')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('Marina-486684')
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()

            cy.url().should(
                'be.equal', `${Cypress.config("baseUrl")}/customer/account/`
            )

            cy.get('.base').should('have.text', 'My Account')
            cy.get('.block-dashboard-info > .block-content > .box > .box-title > span').should('have.text', 'Contact Information')
            cy.get('.box-content > p').should('cotains', 'Marina Santos')
            cy.get('.box-content > p').should('cotains', 'marina.santos@email.com')
        });

        it('Validate login of an user registered with static datas using fixtures', () => {
            //https://docs.cypress.io/api/commands/fixture
            cy.fixture("users").then((user) => {
                cy.get('#email').type(user.email)
                cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type(user.password)
                cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()

                cy.url().should(
                    'be.equal', `${Cypress.config("baseUrl")}/customer/account/`
                )

                cy.get('.base').should('have.text', 'My Account')
                cy.get('.block-dashboard-info > .block-content > .box > .box-title > span').should('have.text', 'Contact Information')
                cy.get('.box-content > p').should('cotains', user.userName)
                cy.get('.box-content > p').should('cotains', user.email)
            })
        });

        it('Validate login of an user registered with static datas using cypress.env', () => {
            //https://docs.cypress.io/api/cypress-api/env
            cy.get('#email').type(Cypress.env('email'))
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type(Cypress.env('password'))
            cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2').click()

            cy.url().should(
                'be.equal', `${Cypress.config("baseUrl")}/customer/account/`
            )

            cy.get('.base').should('have.text', 'My Account')
            cy.get('.block-dashboard-info > .block-content > .box > .box-title > span').should('have.text', 'Contact Information')
            cy.get('.box-content > p').should('cotains', Cypress.env('userName'))
            cy.get('.box-content > p').should('cotains', Cypress.env('email'))
        });

        it('Validate login of an user registered with a custom commands', () => {
            // https://on.cypress.io/custom-commands
            cy.login(Cypress.env('email'), Cypress.env('password'));

            cy.url().should(
                'be.equal', `${Cypress.config("baseUrl")}/customer/account/`
            )

            cy.get('.base').should('have.text', 'My Account')
            cy.get('.block-dashboard-info > .block-content > .box > .box-title > span').should('have.text', 'Contact Information')
            cy.get('.box-content > p').should('cotains', Cypress.env('userName'))
            cy.get('.box-content > p').should('cotains', Cypress.env('email'))
        });
    });
});