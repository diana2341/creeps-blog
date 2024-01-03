export const required = (propertyType) => {
  return (v) => (v && v.length > 0) || `You must input a ${propertyType}`;
};
export const minLength = (propertyType, minLength) => {
  return (v) =>
    (v && v.length >= minLength) ||
    `${propertyType} must be at least ${minLength} characters`;
};
export const maxLength = (propertyType, maxLength) => {
  return (v) =>
    (v && v.length <= maxLength) ||
    `${propertyType} must be less than ${maxLength} characters`;
};

export const emailFormat = () => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
  return (v) => (v && regex.test(v)) || "Must be a valid email";
};
