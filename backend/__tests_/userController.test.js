const UserController = require("../controller/userController");
const UserModel = require("../model/userModel");

jest.mock("../model/userModel");

describe("userController", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("should register a new user", async () => {
    req.body = {
      name: "John Doe",
      contact: "1234567890",
      email: "john@example.com",
      password: "password123",
    };

    const mockUser = { id: 1, ...req.body };
    UserModel.createUser.mockResolvedValue(mockUser);

    await UserController.usersignup(req, res, next);

    expect(UserModel.createUser).toHaveBeenCalledWith(
      "John Doe",
      "1234567890",
      "john@example.com",
      expect.any(String) // Hashed password
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "User registered successfully", user: mockUser });
  });

  test("should return error if email already exists", async () => {
    req.body.email = "john@example.com";
    UserModel.findUserByEmail.mockResolvedValue({ email: "john@example.com" });

    await UserController.usersignup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "User already exists" });
  });
});
