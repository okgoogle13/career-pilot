import functions from "firebase-functions";

export const healthCheck = functions.https.onRequest((_req, res) => {
  res.status(200).json({ status: "ok" });
});
