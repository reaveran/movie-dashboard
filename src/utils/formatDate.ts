export const formatDate = (date: string, yearOnly?: boolean) => {
  const newDate = new Date(date);

  if (yearOnly) {
    return newDate.getFullYear();
  }

  return newDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
