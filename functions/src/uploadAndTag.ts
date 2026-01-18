import functions from "firebase-functions";
import type { Request, Response } from "express";

export const uploadAndTag = functions.https.onRequest((_req: Request, res: Response) => {
  res.status(501).json({ error: "uploadAndTag not implemented" });
});
