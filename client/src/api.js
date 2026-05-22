const BASE_URL = "http://localhost:5000/api"; // local
// const BASE_URL = "https://yourdomain.com/api"; // production

export const getPhrases = async () => {
  const res = await fetch(`${BASE_URL}/phrases`);
  return res.json();
};

export const addPhrase = async (phraseData, token) => {
  const res = await fetch(`${BASE_URL}/phrases/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(phraseData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const deletePhrase = async (id, token) => {
  const res = await fetch(`${BASE_URL}/phrases/delete/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

export const registerUser = async (username, email, phone_number, password, role, secret) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, phone_number, password, role, secret }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};