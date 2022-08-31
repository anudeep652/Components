const { findOne, findOneAndUpdate } = require("../modals/componentsSchema");
const Component = require("../modals/componentsSchema");

//create a new component
const createComponent = async (req, res) => {
  const data = req.body;

  try {
    const createdComponent = await Component.create(
      data
    );
    res.status(201).json({ createComponent });
  } catch (error) {
    if (error.message.includes("duplicate key")) {
      return res
        .status(400)
        .json({ error: "Name of the component should be unique" });
    }
    if (error.message.includes("name should not be empty")) {
      return res.status(400).json({ error: "Name should not be empty" });
    }
    return res.status(400).json({ error: error.message });
  }
};

//getting all the components
const getAllComponents = async (req, res) => {
  try {
    const components = await Component.find({});
    return res.status(200).json({ components: components });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

//updating the batches of a component
const updateBatch = async (req, res) => {
  try {
    const { batches } = req.body;
    const { name } = req.params;
    const updatedComponent = await Component.findOneAndUpdate(
      { name: name },
      {
        $set: {
          batches,
        },
      },
      { new: true }
    );
    res.status(201).json({ name: name, batches: updatedComponent.batches });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//update all process of a component
const updateProcess = async (req, res) => {
  try {
    const { process } = req.body;
    const { batch,name } = req.params;
    
    const updatedComponent = await Component.findOneAndUpdate(
      { name: name },
      {
          $set: {
            'batches.$[element].process': process,
          },
      },
      {
        arrayFilters:[{'element.batchName':`${batch}`}],
        new:true

      }
      
    );
    res.status(201).json({ name: name, batches: updatedComponent.batches });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//delete a component
const deleteComponent = async (req, res) => {
  try {
    const { name } = req.params;
    const haveComponent = await Component.findOne({ name: name });
    if (!haveComponent)
      return res.status(400).json({ error: "this document doesn't exists" });

    await Component.findOneAndDelete({ name: name });
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = {
  createComponent,
  getAllComponents,
  updateProcess,
  updateBatch,
  deleteComponent,
  updateProcess,
};
