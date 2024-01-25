export const transformDate = (date: Date) => {
  const dateTransform = new Date(date);

  return `${dateTransform.getDate()}/${
    dateTransform.getMonth() + 1
  }/${dateTransform.getFullYear()}`;
};
