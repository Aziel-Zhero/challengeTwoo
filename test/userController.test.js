const request = require("supertest");
const app = require("../server/server");

describe("User Controller", () => {
  it("should get user information for authenticated user", async () => {
    const token = "token";

    const response = await request(app)
      .get("/api/user")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toBe("john.doe@example.com");
  });
});
