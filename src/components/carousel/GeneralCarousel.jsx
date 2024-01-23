import React from "react";
import { Carousel } from "flowbite-react";
import PieChartComponent from "../charts/PieChartComponent";

const GeneralCarousel = ({ transactions }) => {
  const groupedTransactions = transactions.reduce((result, transaction) => {
    const { type, dc, amount, accountName } = transaction;

    result[type] = result[type] || { type, total: 0, accounts: {} };

    result[type].accounts[accountName] =
      result[type].accounts[accountName] || 0;

    result[type].accounts[accountName] +=
      dc === "debit" ? parseFloat(amount) : -parseFloat(amount);

    // Calculate the total for each type
    result[type].total +=
      dc === "debit" ? parseFloat(amount) : -parseFloat(amount);

    return result;
  }, {});

  const assetAccount = groupedTransactions["Asset"]?.accounts || {};
  const assetTotal = groupedTransactions["Asset"]?.total || 0;

  const assetPie = Object.keys(assetAccount).map((accountName, index) => {
    const amount = groupedTransactions.Asset.accounts[accountName];
    return {
      id: index,
      value: amount,
      label: accountName,
    };
  });

  const liabilityAccount = groupedTransactions["Liability"]?.accounts || {};
  const liabilityTotal = groupedTransactions["Liability"]?.total * -1 || 0;

  const liabilityPie = Object.keys(liabilityAccount).map(
    (accountName, index) => {
      const amount = groupedTransactions.Liability.accounts[accountName];
      return {
        id: index,
        value: -amount,
        label: accountName,
      };
    }
  );

  const equityAccount = groupedTransactions["Equity"]?.accounts || {};
  const equityTotal = groupedTransactions["Equity"]?.total * -1 || 0;

  const equityPie = Object.keys(equityAccount).map((accountName, index) => {
    const amount = groupedTransactions.Equity.accounts[accountName];
    return {
      id: index,
      value: -amount,
      label: accountName,
    };
  });

  const expenseAccount = groupedTransactions["Expense"]?.accounts || {};
  const expenseTotal = groupedTransactions["Expense"]?.total || 0;

  const expensePie = Object.keys(expenseAccount).map((accountName, index) => {
    const amount = groupedTransactions.Expense.accounts[accountName];
    return {
      id: index,
      value: amount,
      label: accountName,
    };
  });

  const revenueAccount = groupedTransactions["Revenue"]?.accounts || {};
  const revenueTotal = groupedTransactions["Revenue"]?.total * -1 || 0;

  const revenuePie = Object.keys(revenueAccount).map((accountName, index) => {
    const amount = groupedTransactions.Revenue.accounts[accountName];
    return {
      id: index,
      value: -amount,
      label: accountName,
    };
  });

  return (
    <div className="h-30 sm:h-42 xl:h-50 2xl:h-60 w-6/7 py-3 px-3">
      <Carousel slide={true} pauseOnHover>
        <PieChartComponent title="ASSET" total={assetTotal} data={assetPie} />

        <PieChartComponent
          title="LIABILITY"
          total={liabilityTotal}
          data={liabilityPie}
        />

        <PieChartComponent
          title="EQUITY"
          total={equityTotal}
          data={equityPie}
        />

        <PieChartComponent
          title="Expense"
          total={expenseTotal}
          data={expensePie}
        />

        <PieChartComponent
          title="Revenue"
          total={revenueTotal}
          data={revenuePie}
        />
      </Carousel>
    </div>
  );
};

export default GeneralCarousel;
