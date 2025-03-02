const request = require("supertest");
const app = require("../server");
const UserModel = require("../model/userModel");

jest.mock("../model/userModel");

describe("User Routes", () => {
  test("POST /api/user/userssignup - should register a new user", async () => {
    UserModel.createUser.mockResolvedValue({
      id: 1,
      name: "John Doe",
      contact: "1234567890",
      email: "john@example.com",
    });

    const res = await request(app).post("/api/user/userssignup").send({
      name: "John Doe",
      contact: "1234567890",
      email: "john@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
  });

  test("GET /api/user/allusers - should return all users", async () => {
    UserModel.getAllUsers.mockResolvedValue([
      { id: 1, name: "John Doe", email: "john@example.com" },
    ]);

    const res = await request(app).get("/api/user/allusers");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: "John Doe", email: "john@example.com" }]);
  });
});
