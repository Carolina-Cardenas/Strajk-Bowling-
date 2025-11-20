import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
let apiKey: string | null = null;

export const initializeClient = async () => {
  if (apiKey) return;

  try {
    const keyResp = await axios.get(`${BASE_URL}/key`);
    apiKey = keyResp.data.key;

    client.defaults.headers.common["x-api-key"] = apiKey;
    console.log("API Key successfully fetched and configured (via proxy).");
  } catch (error) {
    console.error("Failed to fetch API Key:", error);
    throw new Error(
      "Cannot initialize the application (API Key not available from proxy)."
    );
  }
};
