describe('Tickets', () => {
    beforeEach(() => 
        cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html'));

        it("fills all the text input field", () => {
            const firstName = "Felipe";
            const lastName = "Daniel";
            cy.get("#first-name").type(firstName);
            cy.get("#last-name").type(lastName);
            cy.get("#email").type("felipedanielsousa@gmail.com");
            cy.get("#requests").type("Vegetarian");
            cy.get("#signature").type(`${firstName} ${lastName}`);
        });

        it("Select two tickets", () =>{
            cy.get("#ticket-quantity").select("2");
        });

        it("Select 'vip' ticket type", () => {
            cy.get("#vip").check();
        });

        it("Selects social media checkbox", () => {
            cy.get("#social-media").check();
        });
        
        it("Selects 'friend' and 'publication' then uncheck 'friend'", () => {
            cy.get("#friend").check();
            cy.get("#publication").check();
            cy.get("#friend").uncheck();
        });
        it("has 'TICKETBOX' header's heading", () => {
            cy.get("header h1").should("contain", "TICKETBOX");
        });

        it("Alerts on invalid email", () => {
            cy.get("#email")
            .as("email") //alias
            .type("felipedanielsousa-gmail.com");
            //path do elemento email com a class invalid
            cy.get("#email.invalid").should("exist"); 

            cy.get("@email") //@ chama o alias, o alias guarda o estado do elemento
            .clear()
            .type("felipedanielsousa@gmail.com");

            cy.get("#email.invalid").should("not.exist");
        })

        it("fills and reset before", () => {
            const firstName = "Felipe";
            const lastName = "Daniel";
            const fullName = `${firstName} ${lastName}`;

            cy.get("#first-name").type(firstName);
            cy.get("#last-name").type(lastName);
            cy.get("#email").type("felipedanielsousa@gmail.com");
            cy.get("#ticket-quantity").select("2");
            cy.get("#vip").check();
            cy.get("#publication").check();
            cy.get("#requests").type("IPA beer");
            cy.get("#agree").check();
            cy.get(".agreement p").should(
                "contain",
                `I, ${fullName}, wish to buy 2 VIP tickets.`);

            cy.get("#agree").check();
            cy.get("#signature").type(fullName);

            cy.get("button[type='submit']")
                .as("submitButton")
                .should("not.be.disabled"); //validar que o confirm button não está desabilitado

            cy.get("button[type='reset']").click();

            cy.get("@submitButton").should("be.disabled");
        });

        it("fills mandatory fields using support command", () =>{
            const customer = {
                firstName: "João",
                lastName: "Silva",
                email: "joaosilva@example.com"
            };

            cy.fillsMandatoryFields(customer);

            cy.get("button[type='submit']")
                .as("submitButton")
                .should("not.be.disabled");

            cy.get("#agree").uncheck();

            cy.get("@submitButton").should("be.disabled");
            

            
        });
});