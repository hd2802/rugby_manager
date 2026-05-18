import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./data-source";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  });