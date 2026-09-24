const BASE_URL = "/api/products";

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || body.errors?.join(", ") || "Request failed");
  }
  return res.json();
}

export const api = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return fetch(`${BASE_URL}${qs ? `?${qs}` : ""}`).then(handle);
  },
  get: (id) => fetch(`${BASE_URL}/${id}`).then(handle),
  create: (data) =>
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle),
  update: (id, data) =>
    fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle),
  remove: (id) =>
    fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).then(handle),
};
