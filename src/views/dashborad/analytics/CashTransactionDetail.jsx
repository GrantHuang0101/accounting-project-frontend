import React, { useState, useEffect } from "react";
import BackButton from "../../../components/buttons/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Table } from "flowbite-react";
import { useAuth } from "../../../components/AuthProvider";
import axios from "axios";
import { format } from "date-fns";
import API_BASE_URL from "../../../../config";

const CashTransactionDetail = () => {
  const { id } = useParams();
  const { authToken } = useAuth();
  const [deleteRows, setDeleteRows] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/transactions/${id}`, {
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

  return (
    <div className="px-4 my-12">
      <div flex flex-row>
        <BackButton />
        <h3 className="text-center text-3xl font-semibold text-blue-gray-700">
          Transaction Details
        </h3>
      </div>
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
    </div>
  );
};

export default CashTransactionDetail;
