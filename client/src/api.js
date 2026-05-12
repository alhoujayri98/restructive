//const BASE_URL = "http://localhost/restructive/server/";
const BASE_URL = "http://api.restructive.com";


export const getPhrases = async () => {
  const res = await fetch(`${BASE_URL}/get.php`);
  return res.json();
};

export const addPhrase = async (text, token) => {
  await fetch(`${BASE_URL}/insert.php`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify({ text }),
  });
};

export const deletePhrase = async (id, token) => {
  await fetch(`${BASE_URL}/delete.php`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ id }),
  });
};


export const registerUser = async (username, email, password, role, secret) => {
  const res = await fetch(`${BASE_URL}/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, role, secret }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};

export const loginUser = async (email, password, role) => {
  const res = await fetch(`${BASE_URL}/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};