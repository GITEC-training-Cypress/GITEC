//import of the plugin faker
import { faker } from "@faker-js/faker";

describe("Validate features of login", () => {
  context("Create a new user", () => {
    beforeEach(() => {
      //accessing the website
      cy.visit("https://magento.softwaretestingboard.com");
      // accessing the website with the "baseUrl" argument
      // of the cypress.config file
      // cy.visit('/')
      //accessing new user page
      cy.get(".panel > .header > :nth-child(3) > a").click();
      //asserting redirect to the login page using "cy.url()"
      cy.url().should("contain", "/customer/account/create/");
      //asserting if redirected to the login page using the header text
      cy.get(".base").should("have.text", "Create New Customer Account");
      //filling in user information and saving
    });
    it("Validate new user registration with static data", () => {
      cy.get("#firstname").type("Marina");
      cy.get("#lastname").type("Santos");
      cy.get("#email_address").type("marina.santos12@email.com");
      cy.get("#password").type("Marina-486684");
      cy.get("#password-confirmation").type("Marina-486684");
      cy.get(
        "#form-validate > .actions-toolbar > div.primary > .action"
      ).click();
      //asserting redirect
      cy.url().should(
        "be.equal",
        `${Cypress.config("baseUrl")}/customer/account/`
      );
      //asserting the create of user
      cy.get(".base").should("have.text", "My Account");
      cy.get(
        ".block-dashboard-info > .block-content > .box > .box-title > span"
      ).should("have.text", "Contact Information");
      cy.get(".box-content > p").should("contain", "Marina Santos");
      cy.get(".box-content > p").should("contain", "marina.santos12@email.com");
    });

    it("Validate new user registration with dynamic data", () => {
      //crate an user using the plugin "faker-js"
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();
      let email = faker.internet.email();
      let password = faker.internet.password();
      //filling user information using faker data and saving
      cy.get("#firstname").type(firstName);
      cy.get("#lastname").type(lastName);
      cy.get("#email_address").type(email);
      cy.get("#password").type(password);
      cy.get("#password-confirmation").type(password);
      cy.get(
        "#form-validate > .actions-toolbar > div.primary > .action"
      ).click();
      //asserting redirect
      cy.url().should(
        "be.equal",
        `${Cypress.config("baseUrl")}/customer/account/`
      );
      //asserting the create of user
      cy.get(".base").should("have.text", "My Account");
      cy.get(
        ".block-dashboard-info > .block-content > .box > .box-title > span"
      ).should("have.text", "Contact Information");
      cy.get(".box-content > p").should("contain", lastName);
      cy.get(".box-content > p").should("contain", email);
    });
  });

  context("Login with an user registered", () => {
    beforeEach(() => {
      cy.visit("/customer/account/login");
    });
    it("Validate login of an user registered with static data using fixtures", () => {
      //login of an user registered using fixtures
      cy.fixture("users").then((user) => {
        cy.get("#email").type(user.email);
        cy.get(
          ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass"
        ).type(user.password);
        cy.get(
          ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2"
        ).click();
        //asserting url redirect
        cy.url().should("contain", "/customer/account/");
        //asserting the user info
        cy.get(".base").should("have.text", "My Account");
        cy.get(
          ".block-dashboard-info > .block-content > .box > .box-title > span"
        ).should("have.text", "Contact Information");
        cy.get(".box-content > p").should("contain.text", user.userName);
        cy.get(".box-content > p").should("contain.text", user.email);
      });
    });

    it("Validate login of an user registered with static data using cypress.env", () => {
      //filling in user information using Cypress.env API and saving
      cy.get("#email").type(Cypress.env("email"));
      cy.get(
        ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass"
      ).type(Cypress.env("password"));
      cy.get(
        ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2"
      ).click();
      //asserting url redirect
      cy.url().should(
        "be.equal",
        `${Cypress.config("baseUrl")}/customer/account/`
      );
      //asserting the user info using Cypress.env API and saving
      cy.get(".base").should("have.text", "My Account");
      cy.get(
        ".block-dashboard-info > .block-content > .box > .box-title > span"
      ).should("have.text", "Contact Information");
      cy.get(".box-content > p").should(
        "contain.text",
        Cypress.env("userName")
      );
      cy.get(".box-content > p").should("contain.text", Cypress.env("email"));
    });

    it("Validate login of an user registered with a custom command", () => {
      //using custom command and Cypress.env API
      cy.login(Cypress.env("email"), Cypress.env("password"));
      //assert url redirect
      cy.url().should(
        "be.equal",
        `${Cypress.config("baseUrl")}/customer/account/`
      );
      //asserting the user info using Cypress.env API and saving
      cy.get(".base").should("have.text", "My Account");
      cy.get(
        ".block-dashboard-info > .block-content > .box > .box-title > span"
      ).should("have.text", "Contact Information");
      cy.get(".box-content > p").should(
        "contain.text",
        Cypress.env("userName")
      );
      cy.get(".box-content > p").should("contain.text", Cypress.env("email"));
    });
  });
});
