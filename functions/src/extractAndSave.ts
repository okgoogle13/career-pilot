import functions from "firebase-functions";
import type { Request, Response } from "express";

export const extractAndSave = functions.https.onRequest((_req: Request, res: Response) => {
  res.status(501).json({ error: "extractAndSave not implemented" });
});
