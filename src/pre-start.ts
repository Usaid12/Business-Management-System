/**
 * Pre-start is where we want to place things that must run BEFORE the express 
 * server is started. This is useful for environment variables, command-line 
 * arguments, and cron-jobs.
 */

// NOTE: DO NOT IMPORT ANY SOURCE CODE HERE
import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'ts-command-line-args';
import fs from 'fs';
import logger from 'jet-logger';

// **** Types **** //

interface IArgs {
  env: string;
}


// **** Setup **** //

// Command line arguments
const args = parse<IArgs>({
  env: {
    type: String,
    defaultValue: 'development',
    alias: 'e',
  },
});

let envFiles = args.env === 'development' ? ['.env', '.env.local', '.env.development'] : [`.env.${args.env}`];
envFiles = envFiles.map((fileName) => {
  return path.resolve(process.cwd(), fileName);
});

// check if the env file exists
const envFile = envFiles.find((file) => {
  return fs.existsSync(file);
});

if (!envFile) {
  const error = new Error(`No env file found for environment: ${args.env}`);
  logger.err(error);
  throw error;
}

// Set the env file
const result = dotenv.config({
  path: envFile,
});

if (result.error) {
  const { error } = result;
  logger.err(error);
  throw error;
}
