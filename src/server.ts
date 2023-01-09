import express, { NextFunction, Request, Response, json } from "express";
import "express-async-errors";
import { routes } from "./models/routes";

const app = express();

app.use(json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      return response.status(400).json({ message: error.message });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(3000, () => console.log("Server is running at port 3000"));
