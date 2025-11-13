// common.js
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxU4W9dnlDlBb4fdgYot8Ix795QICw76MqVzu8Hl6ulzfdm6eubdBhz3FMEFkiQshOLrw/exec";

/**
 * Universal API POST helper
 * payload = { action: "someAction", ...params }
 */
async function postData(action, data = {}) {
  try {
    const formData = new FormData();
    formData.append("action", action);
    for (const key in data) formData.append(key, data[key]);

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (err) {
    console.error("❌ API fetch failed:", err);
    alert("Server connection failed. Please check deployment URL or permissions.");
    throw err;
  }
}





