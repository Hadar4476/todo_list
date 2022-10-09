export const formatCamelCase = (str) => {
  const result = str.replace(/([A-Z])/g, " $1");
  const formattedStr = result.charAt(0).toUpperCase() + result.slice(1);

  return formattedStr;
};
