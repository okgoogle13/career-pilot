import functions from "firebase-functions";

export const uploadAndTag = functions.https.onRequest((_req, res) => {
  res.status(501).json({ error: "uploadAndTag not implemented" });
});
