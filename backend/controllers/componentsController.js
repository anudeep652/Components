const { findOne, findOneAndUpdate } = require("../modals/componentsSchema");
const Component = require("../modals/componentsSchema");

//create a new component
const createComponent = async (req, res) => {
  const data = req.body;

  try {
    const component = await Component.findOne({ name: data.name });
    if (component)
      return res.status(400).json({ error: "Component already exists" });
    const createdComponent = await Component.create(data);
    res.status(201).json({ createdComponent });
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
    return res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
  }
};

//update all process of a component
const updateProcess = async (req, res) => {
  try {
    const { process } = req.body;
    const { batch, name } = req.params;

    const updatedComponent = await Component.findOneAndUpdate(
      { name: name },
      {
        $set: {
          "batches.$[element].process": process,
        },
      },
      {
        arrayFilters: [{ "element.batchName": `${batch}` }],
        new: true,
      }
    );
    res.status(201).json({ name: name, batches: updatedComponent.batches });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a component
const deleteComponent = async (req, res) => {
  try {
    const { component } = req.params;
    const haveComponent = await Component.findOne({ name: component });
    if (!haveComponent)
      return res.status(400).json({ error: "this document doesn't exists" });

    await haveComponent.remove();
    res.status(200).json({ component });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteBatch = async (req, res) => {
  try {
    const { batch, component } = req.params;

    await Component.updateOne(
      { name: component },
      { $pull: { batches: { batchName: batch } } }
    );
    res.status(200).json({ batch: batch, name: component });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createComponent,
  getAllComponents,
  updateProcess,
  updateBatch,
  deleteComponent,
  updateProcess,
  deleteBatch,
};
