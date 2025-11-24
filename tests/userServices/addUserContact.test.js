import { jest } from "@jest/globals";

jest.unstable_mockModule("../../models/User.js", () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

const User = (await import("../../models/User.js")).default;
const { addUserContact } = await import("../../services/userServices/addUserContact.js");

describe("Testing addUserContact service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully create a user", async () => {
    const mockDbResponse = {
      id: 33,
      name: "Gunjan",
      phoneNumber: "8359902074",
      address: "marimata",
      label: "Work",
      updatedAt: "2025-11-24T07:04:25.450Z",
      createdAt: "2025-11-24T07:04:25.450Z",
    };

    User.create.mockResolvedValue(mockDbResponse);

    const result = await addUserContact({
      name: "Gunjan",
      phone: "8359902074",
      address: "marimata",
      label: "Work",
    });

    expect(result).toEqual(mockDbResponse);
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
  });

  it("should throw error if contact already exists", async () => {
    User.findOne.mockResolvedValue(true);

    await expect(addUserContact({
      name: "Gunjan",
      phone: "8359902074",
      address: "marimata",
      label: "Work",
    })).rejects.toThrow("Contact already exists.");

    expect(User.create).not.toHaveBeenCalled();
  });
});
