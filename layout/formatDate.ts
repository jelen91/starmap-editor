export const getDate = (date: Date) =>
  `${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`;

export const getTime = (date: Date) =>
  `${String(date.getHours()).padStart(2, '0')}:${String(
    date.getMinutes()
  ).padStart(2, '0')}`;
