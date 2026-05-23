const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Library API",
    description: "API for managing books and authors",
  },
  host: "cse-341-project2-live.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc);