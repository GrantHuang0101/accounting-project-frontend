import { format } from "date-fns";
import { Card, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MonthRangeDropdown from "../dropdowns/MonthRangeDropdown";

const CashFlowCard = ({ transactions }) => {
  const [monthRange, setMonthRange] = useState(0);
  const [cashTransactions, setCashTransactions] = useState([]);
  const [inFlowAmount, setInFlowAmount] = useState(0);
  const [outFlowAmount, setOutFlowAmount] = useState(0);

  const getCutoffDate = () => {
    if (monthRange === 0) {
      // If monthRange is 0, return null.
      // Implicitly get all transactions
      return null;
    } else {
      const currentDate = new Date();
      return new Date(
        currentDate.setMonth(currentDate.getMonth() - monthRange)
      );
    }
  };

  useEffect(() => {
    const cutoffDate = getCutoffDate();
    const cashTransactions = transactions
      .filter((transaction) => transaction.accountName === "Cash")
      .filter((transaction) =>
        cutoffDate ? new Date(transaction.transactionDate) >= cutoffDate : true
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
      <Card className="w-full">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Top Cash Transactions
          </h5>
          <div>
            <MonthRangeDropdown
              monthRange={monthRange}
              setMonthRange={setMonthRange}
            />
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
