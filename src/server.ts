import cors from "cors";
import express from "express";
import { config } from "./config/environment";
import prisma from "./lib/prisma";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

const start = async () => {
  try {
    await prisma.$connect();
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
