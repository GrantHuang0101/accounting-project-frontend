import React, { useState, useEffect } from "react";
import BackButton from "../../../components/buttons/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Table } from "flowbite-react";
import { useAuth } from "../../../components/AuthProvider";
import axios from "axios";
import { format } from "date-fns";

const DeleteTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [deleteRows, setDeleteRows] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setDeleteRows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [authToken]);

  const handleDelete = async () => {
    for (const row of deleteRows) {
      const id = row.transactionId;
      await axios
        .delete(`http://localhost:8080/transactions/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(() => {
          console.log(`Transaction with ID ${id} deleted`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    alert("Delete Successfully");
    navigate("/user/custom-transactions");
  };

  const handleCancel = () => {
    navigate("/user/custom-transactions");
  };

  return (
    <div className="px-4 my-12">
      <BackButton />
      <div className="flex flex-row items-center justify-between mb-8 w-full"></div>
      <div className="w-full mb-8">
        <Card className="mb-2">
          <h5 className="font-semibold">Transaction Description</h5>
          <h6 className="text-gray-800 font-medium">
            {deleteRows[0]?.description || (
              <span className="text-gray-500">no description</span>
            )}
          </h6>
        </Card>
        <Table className="">
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Account</Table.HeadCell>
            <Table.HeadCell>Debit Amount</Table.HeadCell>
            <Table.HeadCell>Credit Amount</Table.HeadCell>
          </Table.Head>
          {deleteRows.map((deleteRow, index) => (
            <Table.Body className="divide-y" key={index}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {format(new Date(deleteRow.transactionDate), "yyyy-MM-dd")}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {deleteRow.accountName}
                </Table.Cell>
                <Table.Cell className="font-semibold">
                  {deleteRow.dc === "debit" ? deleteRow.amount : null}
                </Table.Cell>
                <Table.Cell className="font-semibold">
                  {deleteRow.dc === "credit" ? deleteRow.amount : null}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
      <h4 className="text-center mb-5 font-medium text-red-800">
        Are you sure to delete this transaction with all entries?
      </h4>
      <div className="flex justify-center gap-4">
        <Button color="failure" onClick={handleDelete}>
          Delete All
        </Button>
        <Button color="gray" onClick={handleCancel}>
          No, cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteTransaction;
