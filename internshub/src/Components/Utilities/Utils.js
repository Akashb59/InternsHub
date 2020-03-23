export const formatInput = e => {
  // Prevent characters that are not numbers ("e", ".", "+" & "-") ✨
  let checkIfNum;
  if (
    e.key !== undefined &&
    e.keyCode !== 8 &&
    e.keyCode !== 37 &&
    e.keyCode !== 39 &&
    e.keyCode !== 46
  ) {
    checkIfNum = e.key.match(/\D/);
  }
  return checkIfNum && e.preventDefault();
};
