import React, { useState, useEffect, useMemo } from "react";
import BackButton from "../../../components/buttons/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Datepicker, Label, Textarea } from "flowbite-react";
import SingleEntryForm from "../../../components/forms/SingleEntryForm";
import { useAuth } from "../../../components/AuthProvider";
import axios from "axios";
import CreatePreviewTable from "../../../components/tables/CreatePreviewTable";
import { format } from "date-fns";
import API_BASE_URL from "../../../../config";

const EditTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the transaction ID from the URL params
  const [accounts, setAccounts] = useState([]);
  const { authToken } = useAuth();
  const [formRows, setFormRows] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [description, setDescription] = useState("");
  const [deleteEntries, setDeleteEntries] = useState([]);
  const [entryId, setEntryId] = useState();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const transactionRow = response.data;
        const transaction = transactionRow[0];
        setSelectedDate(
          format(new Date(transaction.transactionDate), "yyyy-MM-dd")
        );
        setDescription(transaction.description);
        setEntryId(transaction.entryId);

        setFormRows(
          transactionRow.map((vals, index) => {
            return {
              vals: vals,
              rowId: index,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_BASE_URL}/accounts`, {
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
  }, [authToken, id]);

  const addFormRow = () => {
    setFormRows((prevRows) => [...prevRows, { rowId: Date.now() }]);
  };

  const handleDelete = (rowId, rowValues) => {
    setFormRows((prevRows) => prevRows.filter((row) => row.rowId !== rowId));
    setPreviews((prevPreviews) =>
      prevPreviews.filter((preview) => preview.rowId !== rowId)
    );

    const rowTransactionId = rowValues.transactionId || null;
    if (rowTransactionId !== null) {
      setDeleteEntries((prevDelete) => [...prevDelete, rowTransactionId]);
    }
  };

  const handlePreview = (rowId, values) => {
    setPreviews((prevRows) => {
      const existingIndex = prevRows.findIndex((row) => row.rowId === rowId);
      const ROW_NOT_FOUND = -1;
      if (existingIndex !== ROW_NOT_FOUND) {
        const updatedPreviews = [...prevRows];
        updatedPreviews[existingIndex] = { rowId, values };
        return updatedPreviews;
      } else {
        return [...prevRows, { rowId, values }];
      }
    });
  };

  const handleDatePickerChange = (date) => {
    setSelectedDate(format(date, "yyyy-MM-dd"));
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleEdit = async (previewData) => {
    const updateAndCreateData = previewData.map((entry) => ({
      transactionId: entry.transactionId,
      accountId: entry.accountId,
      amount: entry.amount,
      transactionDate: selectedDate,
      description: description,
      dc: entry.remainingType,
      entryId: entryId,
    }));

    const patchData = {
      patch: updateAndCreateData,
      deleted: deleteEntries,
    };

    console.log(patchData);

    try {
      await axios.patch(`${API_BASE_URL}/transactions`, patchData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Transactions edited");
      navigate("/user/custom-transactions");
    } catch (error) {
      alert("Failed, please try again.");
      console.error(error);
    }
  };

  return (
    <div className="px-4 my-6 min-h-screen">
      <div className="flex flex-row items-center justify-between mb-6 w-full">
        <BackButton />
        <div className="text-3xl font-bold mr-7">Edit Transaction</div>
        <div></div>
      </div>

      {formRows.map((row) => (
        <SingleEntryForm
          key={row.rowId}
          accounts={accounts}
          initialValues={row.vals}
          onDelete={() => handleDelete(row.rowId, row.vals)}
          onPreview={(values) => handlePreview(row.rowId, values)}
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
        <div className="flex text-2xl font-semibold justify-center items-baseline">
          Preview
        </div>
        <p className="text-sm text-center text-gray-400 mb-2">
          Please add entries to Preview first then Confirm
        </p>
        <CreatePreviewTable previews={previews} onCreate={handleEdit} />
      </div>
    </div>
  );
};

export default EditTransaction;
