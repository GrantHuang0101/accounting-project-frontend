import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  format,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";
import { BarChart } from "@mui/x-charts";
import FilterOptionDropdown2 from "../dropdowns/FilterOptionDropdown2";

const CashFlowBarChart = ({ transactions }) => {
  const [filterOption, setFilterOption] = useState("Net");
  const [cashFlowData, setCashFlowData] = useState([{}]);
  const [color, setColor] = useState("#4e79a7");

  useEffect(() => {
    const currentDate = new Date();
    const startMonth = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth() + 1,
      1
    );
    const endMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const filteredTransactions = transactions
      .filter((transaction) => transaction.accountName === "Cash")
      .filter((transaction) =>
        isWithinInterval(new Date(transaction.transactionDate), {
          start: startMonth,
          end: endMonth,
        })
      )
      .filter((transaction) => {
        if (filterOption === "Inflow") {
          return transaction.dc === "debit";
        } else if (filterOption === "Outflow") {
          return transaction.dc === "credit";
        }
        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const groupedData = [];

    for (let i = 0; i < 12; i++) {
      const startOfMonthDate = startOfMonth(subMonths(currentDate, i));
      const endOfMonthDate = endOfMonth(subMonths(currentDate, i));

      const monthlyTransactions = filteredTransactions.filter((transaction) =>
        isWithinInterval(new Date(transaction.transactionDate), {
          start: startOfMonthDate,
          end: endOfMonthDate,
        })
      );

      const inflowSum = monthlyTransactions.reduce(
        (acc, transaction) =>
          acc + (transaction.dc === "debit" ? Math.abs(transaction.amount) : 0),
        0
      );
      const outflowSum = monthlyTransactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.dc === "credit" ? Math.abs(transaction.amount) : 0),
        0
      );

      groupedData.push({
        Inflow: inflowSum,
        Outflow: outflowSum,
        Net: inflowSum - outflowSum,
        month: format(startOfMonthDate, "yy/MMM"),
      });
    }

    setCashFlowData(groupedData);

    const color = () => {
      if (filterOption === "Inflow") {
        return "#59a14f";
      } else if (filterOption === "Outflow") {
        return "#e15759";
      }
      return "#4e79a7";
    };

    setColor(color);
  }, [transactions, filterOption]);

  const chartSetting = {
    xAxis: [
      {
        label: "USD ($)",
      },
    ],
    width: 500,
    height: 400,
  };

  return (
    <div className="flex py-3 px-3">
      <Card className="w-full">
        <div className="mb-4 flex items-baseline justify-center">
          <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white px-4">
            Monthly Cash Flow
          </h2>
          <div>
            <FilterOptionDropdown2
              filterOption={filterOption}
              setFilterOption={setFilterOption}
            />
          </div>
        </div>
        <BarChart
          dataset={cashFlowData}
          yAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            {
              dataKey: filterOption,
              label: `Cash Flow: ${filterOption}`,
              color: color,
            },
          ]}
          layout="horizontal"
          {...chartSetting}
        />
      </Card>
    </div>
  );
};

export default CashFlowBarChart;
