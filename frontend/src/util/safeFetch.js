export default async function safeFetch(fetchFn, onErrorFn) {
  try {
    await fetchFn();
  } catch (error) {
    onErrorFn(error);
  }
}
