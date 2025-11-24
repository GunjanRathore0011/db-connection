import { expect, jest } from "@jest/globals";

jest.unstable_mockModule("../../models/User.js", () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

const User = (await import("../../models/User.js")).default;
const { addUserContact } = await import("../../services/userServices/addUserContact.js");
const { getUserContact } = await import("../../services/userServices/getUserContact.js");

test("Testing getUserContact service", async() => {

    const mockDbResponse= [
        {
            "id": 33,
            "name": "Gunjan Rathore",
            "phoneNumber": "8359902073",
            "address": "marimata",
            "label": "Work",
            "createdAt": "2025-11-24T07:04:25.450Z",
            "updatedAt": "2025-11-24T07:04:25.450Z"
        },
        {
            "id": 34,
            "name": "Gunjan",
            "phoneNumber": "8359902074",
            "address": "marimata",
            "label": "Work",
            "createdAt": "2025-11-24T07:43:57.526Z",
            "updatedAt": "2025-11-24T07:43:57.526Z"
        }
    ]

    User.findAll.mockResolvedValue(mockDbResponse);

    const result = await addUserContact({
      name: "Gunjan Rathore",
      phone: "8359902073",
      address: "marimata",
      label: "Work",
    });

    const result2 = await addUserContact({
      name: "Gunjan",
      phone: "8359902074",
      address: "marimata",
      label: "Work",
    });
    const result3 = await addUserContact({
      name: "Gunjan",
      phone: "8359902076",
      address: "marimata",
      label: "Work",
    });
    const response= await getUserContact();
    console.log(response)
    expect(response).toEqual(mockDbResponse);
});
