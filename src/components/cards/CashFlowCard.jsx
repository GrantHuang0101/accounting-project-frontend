import { format } from "date-fns";
import { Card, Dropdown, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CashFlowCard = ({ transactions }) => {
  const [monthRange, setMonthRange] = useState(1);
  const [cashTransactions, setCashTransactions] = useState([]);
  const [inFlowAmount, setInFlowAmount] = useState(0);
  const [outFlowAmount, setOutFlowAmount] = useState(0);

  const getCutoffDate = () => {
    const currentDate = new Date();
    return new Date(currentDate.setMonth(currentDate.getMonth() - monthRange));
  };

  useEffect(() => {
    const cashTransactions = transactions
      .filter((transaction) => transaction.accountName === "Cash")
      .filter(
        (transaction) =>
          new Date(transaction.transactionDate) >= getCutoffDate()
      )
      .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
      .slice(0, 5);

    const debitTransactions = cashTransactions.filter(
      (transaction) => transaction.dc === "debit"
    );
    const creditTransactions = cashTransactions.filter(
      (transaction) => transaction.dc === "credit"
    );

    const debitSum = debitTransactions.reduce(
      (acc, transaction) => acc + Math.abs(transaction.amount),
      0
    );
    const creditSum = creditTransactions.reduce(
      (acc, transaction) => acc + Math.abs(transaction.amount),
      0
    );

    setCashTransactions(cashTransactions);
    setInFlowAmount(debitSum);
    setOutFlowAmount(creditSum);
  }, [monthRange, transactions]);

  return (
    <div className="flex py-3 px-3">
      <Card className="w-1/2">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Top Cash Transactions
          </h5>
          <div className="flex justify-end text-baseline px-4 font-semibold text-gray-600">
            <Dropdown inline label={`${monthRange}-month`}>
              <Dropdown.Item>
                <button
                  onClick={() => {
                    setMonthRange(1);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  1-month
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button
                  onClick={() => {
                    setMonthRange(3);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  3-month
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button
                  onClick={() => {
                    setMonthRange(6);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  6-month
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
                <button
                  onClick={() => {
                    setMonthRange(12);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  12-month
                </button>
              </Dropdown.Item>
            </Dropdown>
          </div>
          <Link
            to="/user/analytics/cash-flow"
            className="text-sm font-semibold text-cyan-600 hover:underline dark:text-cyan-500"
          >
            View all
          </Link>
        </div>
        <div className="flex flex-row px-3 justify-between">
          <div className="flex flex-col items-center">
            <h5 className="text-sm font-semibold text-gray-500">Cash Inflow</h5>
            <h3 className="text-2xl text-green-500 font-regular">
              {"+" + inFlowAmount.toFixed(2)}
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="text-sm font-semibold text-gray-500">
              Cash Outflow
            </h5>
            <h3 className="text-2xl text-red-500 font-regular">
              -{outFlowAmount.toFixed(2)}
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="text-sm font-semibold text-black">Net Cash Flow</h5>
            <h3 className="text-2xl">
              {inFlowAmount - outFlowAmount >= 0 ? (
                <p className="text-green-500 font-semibold">
                  +{(inFlowAmount - outFlowAmount).toFixed(2)}
                </p>
              ) : (
                <p className="text-red-500 font-semibold">
                  {-(inFlowAmount - outFlowAmount).toFixed(2)}
                </p>
              )}
            </h3>
          </div>
        </div>
        <div className="w-full">
          <Table>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell className="text-end">Amount</Table.HeadCell>
              <Table.HeadCell className="text-end">Description</Table.HeadCell>
            </Table.Head>
            {cashTransactions.map((transaction, index) => (
              <Table.Body className="divide-y" key={transaction.transactionId}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {format(
                      new Date(transaction.transactionDate),
                      "yyyy-MM-dd"
                    )}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-end">
                    {transaction.dc === "debit"
                      ? transaction.amount
                      : "-" + transaction.amount}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-end">
                    {transaction.description}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default CashFlowCard;
