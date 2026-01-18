import functions from "firebase-functions";
import type { Request, Response } from "express";

export const healthCheck = functions.https.onRequest((_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});
