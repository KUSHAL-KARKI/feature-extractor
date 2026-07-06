function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");

  if (cleaned === reversed) {
    return true;
  } else {
    return false;
  }
}
