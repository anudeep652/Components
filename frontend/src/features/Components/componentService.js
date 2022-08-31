const axios = require("axios");

//get all components
export const getComponents = async () => {
  try {
    const response = await axios.get("/components/");
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

//create a component
export const createAComponent = async (data) => {
  try {
    await axios.post("/components/create", data);
  } catch (error) {
    console.log(error);
  }
};

//modify batches of a component
export const modifyAllBatches = async (data, name) => {
  try {
    const response = await axios.put(`/components/batch/${name}`, data);
    if (response.data) return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const modifyAllProcess = async (data, name, batch) => {
  try {
    const response = await axios.put(
      `/components/process/${batch}/${name}`,
      data
    );
    if (response.data) return response.data;
  } catch (error) {
    console.log(error);
  }
};
