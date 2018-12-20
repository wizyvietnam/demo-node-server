import * as env from './env';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { httpStatus } from "./server/middleware/httpStatus";
import { noCache } from "./server/middleware/nocache";
import path from "path";
import routes from "./server/routes";

export const app = express();

app.use(bodyParser.json());
app.use(httpStatus);
app.use(cors());
app.use(noCache);

// Router
app.use("/api", routes); // Handle API routes. For testing: /api/result


// Routing for client static requests
// app.use(
//   "/static",
//   express.static(path.join(__dirname, "client", "build", "static"))
// );
// app.use("/images", express.static(path.join(__dirname, "client", "build", "images")));
// app.get("*", (request, response, next) => {
//   const data = fs.readFileSync(
//     path.join(__dirname, "client", "build", "index.html"),
//     "utf8"
//   );
//   response.send(data);
//   next();
// });

let port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server is running on port", port);
});
