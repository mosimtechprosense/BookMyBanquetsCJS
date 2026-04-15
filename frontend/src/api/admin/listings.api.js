// 📁 src/api/admin/listings.api.js

const BASE_URL = import.meta.env.VITE_API_BASE;

export const getListings = async ({ page, limit, search }) => {
  const skip = (page - 1) * limit;

  const query = new URLSearchParams({
    skip,
    take: limit,
    ...(search ? { search } : {})
  });

  const res = await fetch(`${BASE_URL}/api/listings?${query}`);

  // 🚨 Handle API errors properly
  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ API Error:", res.status, errorText);
    throw new Error(`API Error: ${res.status}`);
  }

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ Invalid JSON:");
    console.log(text);
    throw err;
  }
};



export const createListing = async (data) => {
  console.log("🚀 SENDING DATA TO API:", data); // 👈 ADD THIS

  const res = await fetch(`${BASE_URL}/api/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const text = await res.text();

  console.log("📦 RAW RESPONSE:", text); // 👈 ADD THIS

  if (!res.ok) {
    console.error("❌ Create Error:", res.status, text);

    let errorMessage = "Create failed";

    try {
      const json = JSON.parse(text);
      errorMessage = json.message || errorMessage;
    } catch (e) {
  console.error("❌ JSON PARSE FAILED:", e);
  console.error("❌ RAW RESPONSE WAS:", text);
}

    throw new Error(errorMessage);
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ JSON Parse Error:", text);
    throw err;
  }
};



export const updateListing = async (id, data) => {
  const res = await fetch(`${BASE_URL}/api/listings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Update Error:", res.status, text);
    throw new Error("Update failed");
  }

  return res.json();
};

export const deleteListing = async (id) => {
  const res = await fetch(`${BASE_URL}/api/listings/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Delete Error:", res.status, text);
    throw new Error("Delete failed");
  }

  return res.json();
};

export const getListingById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/listings/${id}`);

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Fetch Error:", res.status, text);
    throw new Error("Failed");
  }

  const json = await res.json();

  return json.data?.data || json.data || json;
};