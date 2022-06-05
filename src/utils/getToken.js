export default function getToken() {
  if (sessionStorage.getItem('accessToken')) {
    return sessionStorage.getItem('accessToken');
  }
  return null;
}