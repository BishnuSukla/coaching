import http from "http";
import cors from "cors";
import {} from "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import path from "path";

import Routes from "./routes/main";

//An express app created.
const app = express();

//Extarcted PORT from .env variables
let { PORT } = process.env;

if (!PORT) {
  console.error("app:agds:app.js", `FATAL ERROR: PORT is not defined.`);
  process.exit(1);
}

app.use(cors());
app.use(bodyParser({ limit: "50mb" }));
app.use("/api", Routes);

//HTTP server created.
const httpServer = http.createServer(app);

httpServer.listen(PORT, err => {
  return err
    ? console.error("app:agds:app.js", `Failed to start server instance`, err)
    : console.log("app:server", `HTTP is listening on port ${PORT}`);
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/test.jpg"));
});
