// Validate domain with regexp.
export default function isValidDomain(domain) {
  const regexp = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/i;
  return regexp.test(domain);
}
