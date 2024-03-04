/// <reference types="cypress" />


describe ('Page Products - Swag Labs', () => {
    
    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.on('uncaught:exception', (err, runnable) => {
            console.error('Exceção não tratada:', err.message);
            // Retorne false para evitar que o erro interrompa o teste
            return false;
          });
    })
   

    
// Adicionar Item no carrinho 

// Adicionar Item no carrinho validações

// Finalizar comprar e preencher formulário de envio.

// Create Account

// Sair da conta
  
    it('Add Item to Cart', () => {
        cy.get('#ui-id-8 > span').click()
        cy.get('.sale-main > .content > .more').click()
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
        cy.get('#option-label-size-143-item-171').click()
        cy.get('#option-label-color-93-item-60').click()    
        cy.get('#product-addtocart-button').click()
        cy.get('.showcart > .counter').should('be.visible')  

    })

    it('Add Item to Cart - no size and color', () => {
        cy.get('#ui-id-8 > span').click()
        cy.get('.sale-main > .content > .more').click()
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
        cy.get('#product-addtocart-button').click()
        cy.get('#super_attribute\\[143\\]-error').should('exist').and('be.visible').and('have.text', 'This is a required field.')
        cy.get('#super_attribute\\[93\\]-error').should('exist').and('be.visible').and('have.text', 'This is a required field.') 
        cy.get('.showcart > .counter').should('not.be.visible')  
     
    })


    it.only('Validate Titles and Price Inicial Page', () => { 
        cy.get('#ui-id-8 > span').click()
        cy.get('.sale-main > .content > .more').click()
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
        cy.get('.base').should('have.text', 'Bess Yoga Short').invoke('text').as("title")  
        cy.get('#product-price-1983 > .price').should('have.text', '$28.00' ).invoke('text').as("price")  
        cy.get('#option-label-size-143-item-171').click()
        cy.get('#option-label-color-93-item-60').click()    
        cy.get('#product-addtocart-button').click()
        cy.get('.showcart > .counter').should('be.visible')            
     
    })

    it('Validate Title And Price Cart', function () {
        cy.get('#ui-id-8 > span').click()
        cy.get('.sale-main > .content > .more').click()
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
        cy.get('#option-label-size-143-item-171').click()
        cy.get('#option-label-color-93-item-60').click()    
        cy.get('#product-addtocart-button').click()
        cy.get('.showcart > .counter').should('be.visible')  
        cy.get('.message-success > div > a').click()
        cy.get('.base').contains('Shopping Cart')        
        cy.get('.item > .product-item-details > .product-item-name > a').invoke("text").should('contains', this.title)
        cy.get('.col.price > .price-excluding-tax > .cart-price > .price').invoke("text").should('contains', this.price)
     
    })

    it.only('Stimate Tax', function () {
        cy.get('#ui-id-8 > span').click()
        cy.get('.sale-main > .content > .more').click()
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
        cy.get('#option-label-size-143-item-171').click()
        cy.get('#option-label-color-93-item-60').click()    
        cy.get('#product-addtocart-button').click()
        cy.get('.showcart > .counter').should('be.visible')  
        cy.get('.message-success > div > a').click()
        cy.get('.base').contains('Shopping Cart')        
        cy.get('.item > .product-item-details > .product-item-name > a').invoke("text").should('contains', this.title)
        cy.get('.col.price > .price-excluding-tax > .cart-price > .price').invoke("text").should('contains', this.price)
        cy.get('#block-shipping > .title').click()
        cy.get('#KBFD9SY').select('United States')
        cy.get('#VVCSEWV').select('California', {timeout: 5000})
        cy.get('#SL97IPP').type('12345-6789')

    })



})  