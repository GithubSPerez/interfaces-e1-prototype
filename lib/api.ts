export function getOrCreateUserId(): string {
  // Funcion que crea el user-id y lo asigna a la cookie.
  if (typeof document === 'undefined') {
    return '';
  }

  const match = document.cookie.split('; ').find(row => row.startsWith('user-id='));
  if (match) {
    return match.split('=')[1];
  }

  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const aa = String(now.getFullYear()).slice(-2);
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const userId = `${dd}${mm}${aa}${hh}${min}${ss}`;

  document.cookie = `user-id=${userId}; path=/; max-age=31536000`;
  return userId;
}

// Funcion para conseguir la cookie, 
// retorna user-id o null si no existe. 
// Sirve para asignar a una variable al hacer la consulta.

export function getUserId(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  const match = document.cookie.split('; ').find(row => row.startsWith('user-id='));
  return match ? match.split('=')[1] : null;
}
