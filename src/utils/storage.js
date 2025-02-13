export const saveFormData = (data) => {
  localStorage.setItem("formData", JSON.stringify(data));
};

export const loadFormData = () => {
  const savedData = localStorage.getItem("formData");
  return savedData ? JSON.parse(savedData) : null;
};
