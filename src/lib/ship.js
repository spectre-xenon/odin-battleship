export default function Ship(length) {
  let hits = 0;

  const hit = () => (hits += 1);

  const isSunk = () => {
    if (hits < length) return false;
    return true;
  };

  return { hit, isSunk };
}
