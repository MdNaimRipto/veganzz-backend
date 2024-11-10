export function generateOrderId() {
  const uidLength = 20;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid;
  for (let i = 0; i < uidLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uid = characters.charAt(randomIndex);
  }

  return uid;
}
