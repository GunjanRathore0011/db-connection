
export default {
  testEnvironment: "node",
  transform: {},
  coveragePathIgnorePatterns: [
    "/node_modules/",
  ],
  testMatch: [
    "**/__tests__/**/*.js?(x)",
    "**/?(*.)+(spec|test).js?(x)",
  ]
};
