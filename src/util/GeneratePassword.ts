export const generatePassword = (size = 10) => {
  return Array(size)
    .fill(0)
    .map(() =>
      Buffer.from(Math.floor(Math.random() * 100).toString(10)).toString('base64'),
    )
    .join('')
    .slice(0, size);
};
