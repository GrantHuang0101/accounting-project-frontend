import React from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import CreateTransactionButton from "../buttons/createTransactionButton";

const TransactionsTable = ({ transactions, fetchData }) => {
  const handleDelete = () => {};
  return (
    <div className="px-4 my-12">
      <div className="flex flex-row items-center justify-between mb-8 w-full">
        <p className="mb-2 text-3xl font-bold">Manage Entries</p>
        <CreateTransactionButton className="" />
      </div>
      <div className="w-full">
        <Table className="">
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
                  {transaction.accountName}
                </Table.Cell>
                <Table.Cell className="font-semibold">
                  {transaction.dc === "debit" ? transaction.amount : null}
                </Table.Cell>
                <Table.Cell className="font-semibold">
                  {transaction.dc === "credit" ? transaction.amount : null}
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/user/transactions/edit/${transaction.transactionId}`}
                    className="font-semibold text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="font-semibold text-red-600 hover:underline dark:text-red-500 mr-5"
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
