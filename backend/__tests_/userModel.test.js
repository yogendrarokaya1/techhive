const pool = require("../database/db");
const UserModel = require("../model/userModel");

jest.mock("../database/db", () => ({
  query: jest.fn(),
}));

describe("UserModel", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new user", async () => {
    const mockUser = { id: 1, name: "John Doe", email: "john@example.com", contact: "1234567890" };
    pool.query.mockResolvedValue({ rows: [mockUser] });

    const result = await UserModel.createUser("John Doe", "1234567890", "john@example.com", "hashedPassword");

    expect(pool.query).toHaveBeenCalledWith(
      `INSERT INTO users (name, contact, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      ["John Doe", "1234567890", "john@example.com", "hashedPassword"]
    );
    expect(result).toEqual(mockUser);
  });

  test("should find a user by email", async () => {
    const mockUser = { id: 1, email: "john@example.com" };
    pool.query.mockResolvedValue({ rows: [mockUser] });

    const result = await UserModel.findUserByEmail("john@example.com");

    expect(pool.query).toHaveBeenCalledWith(`SELECT * FROM users WHERE email = $1`, ["john@example.com"]);
    expect(result).toEqual(mockUser);
  });
});
