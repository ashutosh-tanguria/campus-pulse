const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(res) {
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Something went wrong");
  }
  return res.json();
}

export async function fetchNotices({ search = "", category = "" } = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await fetch(`${BASE_URL}/notices?${params.toString()}`);
  return handleResponse(res);
}

export async function fetchNoticeById(id) {
  const res = await fetch(`${BASE_URL}/notices/${id}`);
  return handleResponse(res);
}

export async function fetchEvents({ search = "", category = "" } = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await fetch(`${BASE_URL}/events?${params.toString()}`);
  return handleResponse(res);
}

export async function fetchEventById(id) {
  const res = await fetch(`${BASE_URL}/events/${id}`);
  return handleResponse(res);
}