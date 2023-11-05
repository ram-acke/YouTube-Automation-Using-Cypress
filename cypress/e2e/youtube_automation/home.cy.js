describe("Youtube Search Suite",()=>{

    before(()=>{
        cy.viewport(1920,1080)
        cy.visit("https://www.youtube.com/")
    })

    it("Playing Youtube Video From Playlist",()=>{
    
        cy.get('input[id="search"]').type('Cypress.io')
        cy.get("#search-icon-legacy").click()
        cy.url().should("include","Cypress")

        //--------------------------Targeting Specific element and performing click operation-----------------------------
        // cy.get(".ytd-channel-renderer").find("#main-link").each((ele,index,list)=>{
        //     cy.log(ele)
        //     cy.wrap(ele).click()
        // })

        cy.wait(2000)
        cy.get(".ytd-channel-renderer").find("#main-link").click()
        cy.url().should("include","Cypressio")
        cy.get("#tabsContainer").find("tp-yt-paper-tab").find(".tab-title").each((ele,index,list)=>{
            cy.log(ele.text())
            if(ele.text().includes("Playlists")){
                cy.wrap(ele).click()
            }
        })
        cy.url().should("include","playlists")

        cy.get("ytd-grid-playlist-renderer").find("h3").find("a").each((ele,index,list)=>{
            cy.wrap(ele).invoke("attr","title").then(title=>{
                cy.log(title)
                if(title.includes("Demos")){
                    cy.wrap(ele).click()
                }
            })
        })
        cy.url().should("include","watch")




        // cy.get('.ytd-channel-renderer').find("#main-link").then($elements => {
        //     const elementCount = $elements.length;
        //     if (elementCount > 0) {
        //       cy.log(`Found ${elementCount} elements with class 'example-class'`);
        //       cy.log()
        //       // Perform some action based on the count
        //     } else {
        //       cy.log('No elements with class "example-class" found');
        //     }
        //   });

        
    })


    it.only("Scrolling Shorts Video in Youtube",()=>{
        cy.get("ytd-guide-entry-renderer").find("#endpoint").each((ele,index,list)=>{
            cy.wrap(ele).invoke("attr","title").then(title=>{
                if(title.includes("Shorts")){
                    cy.wrap(ele).click()
                }
            })
        })
        cy.wait(5000)
        cy.get("#shorts-container:visible").scrollTo("bottom")

    })
})