import React from "react";
import { Carousel } from "flowbite-react";
import { PieChart } from "@mui/x-charts/PieChart";

const GeneralCarousel = ({ transactions }) => {
  const groupedTransactions = transactions.reduce((result, transaction) => {
    const { type, dc, amount, accountName } = transaction;

    // Initialize the group if it doesn't exist
    result[type] = result[type] || { type, accounts: {} };

    // Initialize the account within the group if it doesn't exist
    result[type].accounts[accountName] =
      result[type].accounts[accountName] || 0;

    // Update the amount based on debit or credit

    result[type].accounts[accountName] +=
      dc === "debit" ? parseFloat(amount) : -parseFloat(amount);

    return result;
  }, {});

  const assetAccount = groupedTransactions["Asset"]?.accounts || {};

  const assetPie = Object.keys(assetAccount).map((accountName, index) => {
    const amount = groupedTransactions.Asset.accounts[accountName];
    return {
      id: index,
      value: amount,
      label: accountName,
    };
  });

  const liabilityAccount = groupedTransactions["Liability"]?.accounts || {};

  const liabilityPie = Object.keys(liabilityAccount).map(
    (accountName, index) => {
      const amount = groupedTransactions.Liability.accounts[accountName];
      return {
        id: index,
        value: amount,
        label: accountName,
      };
    }
  );

  const equityAccount = groupedTransactions["Equity"]?.accounts || {};

  const equityPie = Object.keys(equityAccount).map((accountName, index) => {
    const amount = groupedTransactions.Equity.accounts[accountName];
    return {
      id: index,
      value: amount,
      label: accountName,
    };
  });

  console.log(liabilityAccount);
  console.log(liabilityPie);

  return (
    <div className="h-30 sm:h-42 xl:h-50 2xl:h-60 w-6/7 py-3">
      <Carousel slide={false}>
        <div className="flex flex-row h-full items-center bg-blue-100 dark:bg-gray-700 dark:text-white">
          <div className="ml-20 fixed text-2xl font-semibold text-white">
            ASSET
          </div>
          <PieChart
            series={[
              {
                data: assetPie,
                innerRadius: 50,
                outerRadius: 80,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: 180,
                endAngle: -180,
              },
            ]}
            height={600}
            width={400}
          />
        </div>
        <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-700 dark:text-white">
          <PieChart
            series={[
              {
                data: liabilityPie,
                innerRadius: 40,
                outerRadius: 60,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: 180,
                endAngle: -180,
              },
            ]}
            height={600}
          />
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                  { id: 3, value: 10, label: "series A" },
                  { id: 4, value: 15, label: "series B" },
                  { id: 5, value: 20, label: "series C" },
                  { id: 6, value: 10, label: "series A" },
                  { id: 7, value: 15, label: "series B" },
                  { id: 8, value: 20, label: "series C" },
                  { id: 9, value: 10, label: "series A" },
                  { id: 10, value: 15, label: "series B" },
                  { id: 11, value: 20, label: "series C" },
                ],
                innerRadius: 40,
                outerRadius: 60,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: 180,
                endAngle: -180,
              },
            ]}
            height={600}
          />
        </div>
        <div className="flex h-full items-center justify-center bg-gray-200 dark:bg-gray-700 dark:text-white">
          Slide 3
        </div>
      </Carousel>
    </div>
  );
};

export default GeneralCarousel;
