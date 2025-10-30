// const API = import.meta.env.VITE_API_URL || '';

// async function handleResponse(res) {
//   const content = await res.json().catch(() => ({}));
//   if (!res.ok) {
//     const message = content?.message || res.statusText || 'Error';
//     const error = new Error(message);
//     error.status = res.status;
//     error.body = content;
//     throw error;
//   }
//   return content;
// }

// async function login({ usuario, contraseña }) {
//   const res = await fetch(`${API}/api/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ usuario, contraseña }),
//   });
//   return handleResponse(res);
// }

// async function register(payload) {
//   const res = await fetch(`${API}/api/auth/register`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });
//   return handleResponse(res);
// }

// // Logout local (sin backend)
// function logout() {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
// }

// export default {
//   login,
//   register,
//   logout,
// };
