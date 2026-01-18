import functions from "firebase-functions";

export const extractAndSave = functions.https.onRequest((_req, res) => {
  res.status(501).json({ error: "extractAndSave not implemented" });
});
