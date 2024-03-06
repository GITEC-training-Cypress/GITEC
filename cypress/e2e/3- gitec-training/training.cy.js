describe('Page Products - Swag Labs', () => {

    beforeEach(() => {
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.on('uncaught:exception', (err, runnable) => {
            console.error('Exceção não tratada:', err.message);
            return false;
        })
    })

    afterEach(() => {
        cy.clearAllLocalStorage();
    });

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
        //\ para identificar o "[]" do seletor
        cy.get('#super_attribute\\[143\\]-error').should('exist').and('be.visible').and('have.text', 'This is a required field.')
        cy.get('#super_attribute\\[93\\]-error').should('exist').and('be.visible').and('have.text', 'This is a required field.')
        cy.get('.showcart > .counter').should('not.be.visible')
    })

    it('Validate Titles and Price Inicial Page', () => {
        cy.get('#ui-id-8 > span').click()
        cy.get('.sale-main > .content > .more').click()
        cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
        cy.get('.base').should('have.text', 'Bess Yoga Short').invoke('text').as("title")
        cy.get('#product-price-1983 > .price').should('have.text', '$28.00').invoke('text').as("price")
        cy.get('#option-label-size-143-item-171').click()
        cy.get('#option-label-color-93-item-60').click()
        cy.get('#product-addtocart-button').click()
        cy.get('.showcart > .counter').should('be.visible')
    })

    // Diferenciar a arrow function do Function e mostrar as opções de varariavel global
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
})  