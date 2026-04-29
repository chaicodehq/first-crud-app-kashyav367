export default {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.js"],
  verbose: true,
  transform: {}, 
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js" 
  ]
};
