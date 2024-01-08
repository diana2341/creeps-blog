// Import the 'express' library for creating a web server
const express = require("express");

// Import the 'ApolloServer' class from the 'apollo-server-express' library
const { ApolloServer } = require("apollo-server-express");

// Import the 'mongoose' library for MongoDB integration
const mongoose = require("mongoose");

// Import the GraphQL schema definition
const typeDefs = require("./schema");

// Import the GraphQL resolvers
const resolvers = require("./resolvers");

// Import the 'punycode' library (not used in the code)
const punycode = require("punycode");

// Define an asynchronous function to start the server
const startServer = async () => {
  // Create an instance of the Express application
  const app = express();

  // Connect to MongoDB using the 'mongoose' library
  await mongoose.connect(
    `mongodb+srv://dianaponce:Oh3F0AGzG9Z2Y0SH@cluster0.dplol97.mongodb.net/creepypastas`,
    {}
  );

  // Get the connection to MongoDB
  const connection = mongoose.connection;

  // Handle MongoDB connection errors
  connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  // Log a message when successfully connected to MongoDB
  connection.once("open", () => {
    console.log("Connected to MongoDB");
  });

  // Create an instance of ApolloServer with type definitions, resolvers, and cache control configuration
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cacheControl: {
      defaultMaxAge: 0, // Disable caching
    },
  });

  // Start the ApolloServer
  await server.start();

  // Apply the ApolloServer middleware to the Express app
  server.applyMiddleware({ app });

  // Set the port for the server to run on, default to 4000
  const PORT = process.env.APOLLO_SERVER_PORT || 4000;

  // Start the Express app to listen on the specified port
  app.listen(PORT, () => {
    console.log(`Apollo Server is running at http://localhost:${PORT}/graphql`);
  });
};

// Call the startServer function and handle errors
startServer().catch((error) => {
  console.error("Error starting Apollo Server:", error);
});

