import React, { useState, useEffect } from "react";
import BackButton from "../../../components/buttons/BackButton";
import { useNavigate } from "react-router-dom";
import { Button, Datepicker, Label, Textarea } from "flowbite-react";
import SingleEntryForm from "../../../components/forms/SingleEntryForm";
import { useAuth } from "../../../components/AuthProvider";
import axios from "axios";
import CreatePreviewTable from "../../../components/tables/CreatePreviewTable";
import { format } from "date-fns";

const CreateTransaction = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const { authToken } = useAuth();
  const [formRows, setFormRows] = useState([{ id: 1 }]);
  const [previews, setPreviews] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/accounts", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [authToken]);

  const addFormRow = () => {
    setFormRows((prevRows) => [...prevRows, { id: Date.now() }]);
  };

  const handleDelete = (id) => {
    setFormRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setPreviews((prevPreviews) =>
      prevPreviews.filter((preview) => preview.id !== id)
    );
  };

  const handlePreview = (id, values) => {
    setPreviews((prevRows) => {
      const existingIndex = prevRows.findIndex((row) => row.id === id);

      if (existingIndex !== -1) {
        const updatedPreviews = [...prevRows];
        updatedPreviews[existingIndex] = { id, values };
        return updatedPreviews;
      } else {
        return [...prevRows, { id, values }];
      }
    });
  };

  const handleDatePickerChange = (date) => {
    setSelectedDate(format(date, "yyyy-MM-dd"));
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const onCreate = async (previewData) => {
    const entryId = Date.now(); // UUID?

    const transactionsData = previewData.map((entry) => ({
      accountId: entry.accountId,
      amount: entry.amount,
      transactionDate: selectedDate,
      description: description,
      dc: entry.remainingType,
      entryId: entryId,
    }));

    try {
      await axios.post("http://localhost:8080/transactions", transactionsData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("Transactions created");
      navigate("/user/custom-transactions");
    } catch (error) {
      alert("Failed, please try again");
      console.error(error);
    }
  };

  return (
    <div className="px-4 my-6 min-h-screen">
      <div className="flex flex-row items-center justify-between mb-6 w-full">
        <BackButton />
        <div className="text-3xl font-bold mr-7">Journal Entry</div>
        <div></div>
      </div>

      {formRows.map((row) => (
        <SingleEntryForm
          key={row.id}
          accounts={accounts}
          onDelete={() => handleDelete(row.id)}
          onPreview={(values) => handlePreview(row.id, values)}
        />
      ))}

      <Button
        onClick={addFormRow}
        gradientDuoTone="purpleToPink"
        className="px-2 py-1 mb-5 font-semibold"
      >
        + Add New Row +
      </Button>

      <div className="flex gap-8 mb-6">
        <div className="lg:w-1/2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="transactionDate" value="Transaction Date" />
            </div>

            <Datepicker
              name="selectedDate"
              value={selectedDate}
              onSelectedDateChanged={handleDatePickerChange}
            />
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <Textarea
            id="description"
            name="description"
            placeholder="Transaction description..."
            value={description}
            onChange={handleDescription}
            required
            rows={1}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex text-2xl font-semibold mb-4 justify-center">
          Preview
        </div>
        <CreatePreviewTable previews={previews} onCreate={onCreate} />
      </div>
    </div>
  );
};

export default CreateTransaction;
