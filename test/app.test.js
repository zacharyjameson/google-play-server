const supertest = require("supertest");
const app = require("../app");
const { expect } = require("chai");

describe("GET /googleplay", () => {
  it("should return an array of games", () => {
    return supertest(app)
      .get("/googleplay")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        const game = res.body[0];
        expect(game).to.include.all.keys(
          "App",
          "Category",
          "Type",
          "Price",
          "Genres",
          "Rating"
        );
      });
  });

  it("should be 400 if sort is incorrect", () => {
    return supertest(app)
      .get("/googleplay")
      .query({ sort: "MISTAKE" })
      .expect(400, "Must sort by either rating or app");
  });
});
