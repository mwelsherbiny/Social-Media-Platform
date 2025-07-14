export default function getStoredValue(key) {
  try {
    const value = localStorage.getItem(key);

    if (value) return JSON.parse(value);
    else return null;
  } catch (error) {
    return localStorage.getItem(key);
  }
}
