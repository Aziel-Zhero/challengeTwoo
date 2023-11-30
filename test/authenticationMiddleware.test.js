const request = require("supertest");
const jwt = require("jsonwebtoken");
const { app } = require("../server/server");
const userModel = require("../src/models/userModel");
const { signup } = require("../src/controllers/authController");

describe("Authentication Middleware", () => {
  it("should authenticate a user with a valid token", async () => {
    const token = "token";

    const response = await request(app)
      .get("/api/user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toBe("john.doe@example.com");
  });
});
