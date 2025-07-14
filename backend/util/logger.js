import { request } from "express";

export default {
  info: (message) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  },
  request: (message) => {
    console.log(`[REQUEST] ${new Date().toISOString()} - ${message}`);
  },
  error: (message) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
  },
};
