const axios = require("axios");

const URL = "https://components-164g.onrender.com";
//get all components
export const getComponents = async () => {
  try {
    const response = await axios.get(`${URL}/components/`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // console.log(error);
  }
};

//create a component
export const createAComponent = async (data) => {
  const response = await axios.post(`${URL}/components/create`, data, {
    mode: "cors",
  });
  return response.data;
};

//modify batches of a component
export const modifyAllBatches = async (data, name) => {
  const response = await axios.put(`${URL}/components/batch/${name}`, data, {
    mode: "cors",
  });
  // console.log(response.data);
  return response.data;
};
export const modifyAllProcess = async (data, name, batch) => {
  try {
    const response = await axios.put(
      `${URL}/components/process/${batch}/${name}`,
      data,
      { mode: "cors" }
    );
    if (response.data) return response.data;
  } catch (error) {
    // console.log(error);
  }
};

export const deleteComponent = async (component) => {
  try {
    const response = await axios.delete(`${URL}/components/${component}`);
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};

export const deleteBatch = async (batch, component) => {
  const response = await axios.delete(
    `${URL}/components/${component}/${batch}`
  );
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(`${URL}/user/login`, data);
  return response.data;
};
