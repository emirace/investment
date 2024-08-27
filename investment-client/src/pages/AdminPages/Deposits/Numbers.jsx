import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import Table from "../../../components/Table/Table";
import Refetch from "../../../components/Refetch/Refetch";

function Numbers() {
  const [loading, setLoading] = useState(false);
  const [numbers, setNumbers] = useState(null);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNumber, setCurrentNumber] = useState({ value: "" });
  const [showForm, setShowForm] = useState(false);

  const getNumbers = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_GENERAL_API_ENDPOINT}numbers`,
        {
          withCredentials: true,
        }
      );
      setNumbers(data.numbers);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    setCurrentNumber({ ...currentNumber, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await axios.put(
          `${import.meta.env.VITE_GENERAL_API_ENDPOINT}numbers/${
            currentNumber._id
          }`,
          currentNumber,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_GENERAL_API_ENDPOINT}numbers`,
          currentNumber,
          { withCredentials: true }
        );
      }
      setShowForm(false);
      setCurrentNumber({ value: "" });
      getNumbers();
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (number) => {
    setCurrentNumber(number);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCreate = () => {
    setCurrentNumber({ value: "" });
    setIsEditing(false);
    setShowForm(true);
  };

  const deleteNumber = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_GENERAL_API_ENDPOINT}numbers/${id}`,
        {
          withCredentials: true,
        }
      );
      setNumbers((prev) => prev.filter((number) => number._id !== id));
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { name: "Value", selector: (row) => row.value },
    {
      name: "Date Created",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleEdit(row)}
            className="bg-blue-500 text-white px-3 py-2 rounded-md"
          >
            <PencilIcon className="h-4 w-4 text-white" />
          </button>
          <button
            onClick={() => deleteNumber(row._id)}
            className="bg-red-500 text-white px-3 py-2 rounded-md"
          >
            <TrashIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getNumbers();
  }, [getNumbers]);

  if (error) {
    return (
      <Refetch
        handleRetry={getNumbers}
        text="We were unable to retrieve the numbers."
      />
    );
  }
  console.log(numbers);
  return (
    <>
      <h1 className="text-gray-700 text-3xl mb-16 font-bold dark:text-white font-montserrat">
        Manage Numbers
      </h1>
      <button
        onClick={handleCreate}
        className="bg-red-400 text-white px-4 py-2 rounded-md mb-4"
      >
        Add New Number
      </button>
      {loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center font-montserrat">
          <LuLoader2
            size={35}
            className="text-slate-900 dark:text-white animate-spin"
          />
          <p className="text-sm dark:text-white">Fetching numbers...</p>
        </div>
      ) : numbers && numbers.length > 0 ? (
        <div className="grid col-1 bg-white shadow-sm dark:bg-slate-800 font-montserrat">
          <Table tableHeaders={columns} tableDetails={numbers} />
        </div>
      ) : (
        <p>No numbers available</p>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl mb-4 font-semibold">
              {isEditing ? "Edit Number" : "Add New Number"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Value
                </label>
                <input
                  type="number"
                  name="value"
                  value={currentNumber.value}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-400 text-white px-4 py-2 rounded-md"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Numbers;
