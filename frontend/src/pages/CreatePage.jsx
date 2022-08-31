import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createComponent } from "../features/Components/componentSlice";

const CreatePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const [names, setNames] = useState({ componentName: "", companyName: "" });
  const [process, setProcess] = useState({
    process1:'',
    process2:'',
    process3:'',
    process4:'',
    process5:'',
    process6:'',
    process7:'',
    process8:'',
    process9:'',
    process10:'',
  });

  const handleClick = async(e) => {
    e.preventDefault()
    const arr = Object.entries(process)

    const newArr = arr.filter((array) => array[1]!=='')
    let myProcess = []
    
    newArr.forEach((a) => myProcess.push({'processName':a[1]}))
    
    let myObj = {name:names.componentName,companyName:names.companyName,process:myProcess}
    console.log(myObj);
    setNames({ componentName: "", companyName: "" })
    setProcess({
        process1:'',
        process2:'',
        process3:'',
        process4:'',
        process5:'',
        process6:'',
        process7:'',
        process8:'',
        process9:'',
        process10:'',
      })
      try {
        await dispatch(createComponent(myObj))
        navigate("/")
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <>
      <div className="mt-4 ml-4 mr-4">
        <form onSubmit={handleClick}>
          <div className="mb-6">
            <h6 className="text-lg font-bold dark:text-white">
              Create a name for the Component
            </h6>

            <div className="mt-4 ml-4 mr-4">
              <label
                htmlFor="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Component Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={names.componentName}
                onChange={(e) =>
                  setNames({ ...names, componentName: e.target.value })
                }
              />
            </div>

            <div className="mt-4 ml-4 mr-4">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Company Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={names.companyName}
                onChange={(e) =>
                  setNames({ ...names, companyName: e.target.value })
                }
              />
            </div>

            <hr className="border-gray-200 my-12 dark:border-gray-700" />

            <h6 className="text-lg font-bold dark:text-white">
              Create the name for processes
            </h6>

            <div className="mt-4 ml-4 mr-4">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Process1 Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={process.process1}
                onChange={(e) =>
                  setProcess({...process,process1:e.target.value})
                }
              />
            </div>
            <div className="mt-4 ml-4 mr-4">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Process2 Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={process.process2}
                onChange={(e) =>
                  setProcess({ ...process, process2: e.target.value })
                }
              />
            </div>
            <div className="mt-4 ml-4 mr-4">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Process3 Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={process.process3}
                onChange={(e) =>
                  setProcess({ ...process, process3: e.target.value })
                }
              />
            </div>
            <div className="mt-4 ml-4 mr-4">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Process4 Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={process.process4}
                onChange={(e) =>
                  setProcess({ ...process, process4: e.target.value })
                }
              />
            </div>
            <div className="mt-4 ml-4 mr-4">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Process5 Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={process.process5}
                onChange={(e) =>
                  setProcess({ ...process, process5: e.target.value })
                }
              />
            </div>
            <div className="mt-4 ml-4 mr-4">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Process6 Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={process.process6}
                onChange={(e) =>
                  setProcess({ ...process, process6: e.target.value })
                }
              />
            </div>
            <div className="mt-4 ml-4 mr-4">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Process7 Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={process.process7}
                onChange={(e) =>
                  setProcess({ ...process, process7: e.target.value })
                }
              />
            </div>
            <div className="mt-4 ml-4 mr-4">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Process8 Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={process.process8}
                onChange={(e) =>
                  setProcess({ ...process, process8: e.target.value })
                }
              />
            </div>
            <div className="mt-4 ml-4 mr-4">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Process9 Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={process.process9}
                onChange={(e) =>
                  setProcess({ ...process, process9: e.target.value })
                }
              />
            </div>
            <div className="mt-4 ml-4 mr-4">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Process10 Name
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
                value={process.process10}
                onChange={(e) =>
                  setProcess({ ...process, process10: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="duration-300 ml-4 mt-4 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePage;
