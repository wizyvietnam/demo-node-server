import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

let NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  NODE_ENV = 'development';
  process.env.NODE_ENV = 'development';
}

let dotenvFiles = [
  `${process.cwd()}/.env.${NODE_ENV}`,
].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    dotenv.config({
      path: dotenvFile,
    })
  }
});

if(!process.env.END_POINT) {throw new Error('process.env.END_POINT is missing!')}
if(!process.env.PORT) {throw new Error('process.env.PORT is missing!')}
if(!process.env.MONGODB_URI) {throw new Error('process.env.MONGODB_URI is missing!')}