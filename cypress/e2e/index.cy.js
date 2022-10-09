describe("Main", () => {
  it("should render a table that includes the correct headers", () => {
    cy.visit("http://localhost:3000/")
    cy.get("table").contains("th", /etherscan/i)
  })

  it("should render an input and allow text to be changed", () => {
    cy.get("input")
      .first()
      .type("0x0000000000000000000000000000000000000000")
      .should("have.value", "0x0000000000000000000000000000000000000000")
  })

  it("should have a button that changes direction of finger when clicked", () => {
    cy.get("button").first().click().contains("👆")
  })
})
