import "reflect-metadata";

import { dataSource } from "./datasource";
import { buildSchema } from "type-graphql";
import { TagsResolver } from "./resolvers/Tags";
import { AdsResolver } from "./resolvers/Ads";
import { CategorysResolver } from "./resolvers/Categories";
import { UsersResolver } from "./resolvers/Users";
import { ContextType, customAuthChecker } from "./auth";
// npm install @apollo/server express graphql cors
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";

import bodyParser from "body-parser";

async function start() {
  const schema = await buildSchema({
    resolvers: [TagsResolver, AdsResolver, CategorysResolver, UsersResolver],
    authChecker: customAuthChecker,
  });
  await dataSource.initialize();
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer<ContextType>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: "http://localhost:3000",
      credentials: true,
    }),
    // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
    express.json({ limit: "50mb" }),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async (args) => {
        return {
          req: args.req,
          res: args.res,
        };
      },
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 5000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:5000/`);
}

start();
