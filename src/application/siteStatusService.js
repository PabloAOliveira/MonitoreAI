import fetch from "node-fetch";

export async function checkSiteStatus(url) {
  try {
    const response = await fetch(url, { method: "GET", timeout: 10000 });
    if (response.ok) {
      return "Online";
    }
    return "error";
  } catch (error) {
    return "Offline";
  }
}
