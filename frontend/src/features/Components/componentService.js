const axios = require("axios");


const URL = 'https://components100.herokuapp.com'
//get all components
export const getComponents = async () => {
  try {
    const response = await axios.get(`${URL}/components/`,{mode:'cors'});
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
    await axios.post(`${URL}/components/create`, data,{mode:'cors'});
  } catch (error) {
    console.log(error);
  }
};

//modify batches of a component
export const modifyAllBatches = async (data, name) => {
  try {
    const response = await axios.put(`${URL}/components/batch/${name}`, data,{mode:'cors'});
    if (response.data) return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const modifyAllProcess = async (data, name, batch) => {
  try {
    const response = await axios.put(
      `${URL}/components/process/${batch}/${name}`,
      data,{mode:'cors'}
    );
    if (response.data) return response.data;
  } catch (error) {
    console.log(error);
  }
};
