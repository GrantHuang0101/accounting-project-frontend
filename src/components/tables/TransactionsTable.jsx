import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthProvider";
import { format } from "date-fns";

const TransactionsTable = ({ transactions }) => {
  const [accountDetails, setAccountDetails] = useState({});
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchAccountDetails = async (accountId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/accounts/${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setAccountDetails((prevDetails) => ({
          ...prevDetails,
          [accountId]: response.data.accountName,
        }));
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    transactions.forEach((transaction) => {
      const { accountId } = transaction;
      if (!accountDetails[accountId]) {
        fetchAccountDetails(accountId);
      }
    });
  }, [transactions, accountDetails]);

  const handleDelete = () => {};

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manage Transactions</h2>
      <div className="lg:w-[1000px]">
        <Table className="md:w-full">
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Account</Table.HeadCell>
            <Table.HeadCell>Debit Amount</Table.HeadCell>
            <Table.HeadCell>Credit Amount</Table.HeadCell>
            <Table.HeadCell>
              <span>Manage</span>
            </Table.HeadCell>
          </Table.Head>
          {transactions.map((transaction, index) => (
            <Table.Body className="divide-y" key={transaction.transactionId}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {format(new Date(transaction.transactionDate), "yyyy-MM-dd")}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {accountDetails[transaction.accountId]}
                </Table.Cell>
                <Table.Cell className="font-semibold">
                  {transaction.dc === "d" ? transaction.amount : null}
                </Table.Cell>
                <Table.Cell className="font-semibold">
                  {transaction.dc === "c" ? transaction.amount : null}
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={``}
                    className="font-semibold text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-400"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default TransactionsTable;
