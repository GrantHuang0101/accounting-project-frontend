import React, { useState } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { HiPlus, HiTrash } from "react-icons/hi";

const SingleEntryForm = ({ accounts, onDelete, onPreview, initialValues }) => {
  const [formValues, setFormValues] = useState({
    selectAccount: {
      accountId: initialValues?.accountId || 1,
      accountName: initialValues?.accountName || "Cash",
    },
    selectDc: initialValues?.dc || "debit",
    amount: initialValues?.amount || "",
    transactionId: initialValues?.transactionId || -1,
    entryId: initialValues?.entryId || -1,
  });

  const handleChangeSelectAccount = (event) => {
    const selectedAccount = JSON.parse(event.target.value);
    setFormValues((prevValues) => ({
      ...prevValues,
      selectAccount: selectedAccount,
    }));
  };

  const handleChangeSelectDc = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      selectDc: event.target.value,
    }));
  };

  const handleChangeAmount = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      amount: event.target.value,
    }));
  };

  const handleRowAddPreview = () => {
    if (!formValues.amount) {
      alert("Amount cannot be null");
      return;
    }
    onPreview(formValues);
  };

  return (
    <div className="my-4 w-full">
      <form className="flex flex-col flex-wrap gap-4">
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-1 block">
              <Label htmlFor="accountSelect" value="Account" />
            </div>
            <Select
              id="accountSelect"
              name="accountSelect"
              className="w-full rounded"
              defaultValue={formValues.selectAccount.accountName}
              onChange={handleChangeSelectAccount}
            >
              <option selected>{formValues.selectAccount.accountName}</option>
              {accounts.map((account) => (
                <option
                  key={account.accountId}
                  value={JSON.stringify({
                    accountId: account.accountId,
                    accountName: account.accountName,
                  })}
                >
                  {account.accountName}
                </option>
              ))}
            </Select>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-1 block">
              <Label htmlFor="dcSelect" value="Debit / Credit" />
            </div>
            <Select
              id="dcSelect"
              name="dcSelect"
              className="w-full rounded"
              value={formValues.selectDc}
              onChange={handleChangeSelectDc}
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </Select>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-1 block">
              <Label htmlFor="amount" value="Amount" />
            </div>
            <TextInput
              id="amount"
              name="amount"
              type="number"
              placeholder="Amount"
              value={formValues.amount}
              onChange={handleChangeAmount}
              required
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleRowAddPreview}
              outline
              gradientDuoTone="cyanToBlue"
              size="sm"
              className="mr-2"
            >
              <HiPlus className="" />
              Preview
            </Button>
            <Button
              onClick={onDelete}
              outline
              gradientDuoTone="purpleToPink"
              size="sm"
              className=""
            >
              <HiTrash className="" />
              Delete
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleEntryForm;
