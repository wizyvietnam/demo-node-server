import fs from "fs";
import dotenv from "dotenv";

let NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  NODE_ENV = "development";
  process.env.NODE_ENV = "development";
}

let dotenvFiles = [`${process.cwd()}/.env.${NODE_ENV}`].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    dotenv.config({
      path: dotenvFile
    });
  }
});

if (process.env.NODE_ENV !== 'production' && !process.env.API_END_POINT) {
  // require API_END_POINT for running tests
  throw new Error("process.env.API_END_POINT is missing!");
}
