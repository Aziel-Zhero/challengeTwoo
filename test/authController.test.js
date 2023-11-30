const request = require("supertest");
const { app } = require("../server/server");

describe("Auth Controller", () => {
  // Teste para Sign Up
  it("should create a new user on sign up", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        nome: "John Doe",
        email: "john.doe@example.com",
        senha: "testpassword",
        telefones: [{ numero: "123456789", ddd: "12" }],
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });

  // Teste para Sign In
  it("should authenticate a user on sign in", async () => {
    const response = await request(app).post("/api/auth/signin").send({
      email: "john.doe@example.com",
      senha: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });
});
