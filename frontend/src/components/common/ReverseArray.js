export default function reverseArray(data) {
  let newReverseArray = [];

  for (let i = data.length - 1; i >= 0; i--) {
    newReverseArray.push(data[i]);
  }
  return newReverseArray;
}
