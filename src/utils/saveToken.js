export default function saveToken(token) {
  try {
    sessionStorage.setItem('accessToken', token);
    return true;
  } catch (err) {
    return err;
  }
}