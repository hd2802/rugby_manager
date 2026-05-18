import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/index";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(router);

export default app;