import { Button, Table } from "flowbite-react";
import React from "react";

const CreatePreviewTable = ({ previews, onCreate }) => {
  const groupedByAccountName = previews.reduce((result, entry) => {
    const { accountName } = entry.values.selectAccount;

    if (!result[accountName]) {
      result[accountName] = [];
    }

    result[accountName].push(entry);
    return result;
  }, {});

  const integratedData = Object.keys(groupedByAccountName).map(
    (accountName) => {
      const entries = groupedByAccountName[accountName];

      const combinedAmountandId = entries.reduce(
        (result, entry) => {
          const { selectAccount, amount, selectDc, transactionId, entryId } =
            entry.values;

          const numericAmount = parseFloat(amount);

          if (selectDc === "debit") {
            result.debit += numericAmount;
          } else {
            result.credit += numericAmount;
          }
          result.accountId = selectAccount.accountId;

          const NEW_ENTRYID = -1;
          if (transactionId !== NEW_ENTRYID) {
            result.transactionId = transactionId;
          }

          result.entryId = entryId;

          return result;
        },
        {
          debit: 0,
          credit: 0,
          accountId: 1,
          transactionId: -1,
          entryId: -1,
        }
      );

      const offsetAmount =
        combinedAmountandId.debit - combinedAmountandId.credit;

      const remainingType = offsetAmount >= 0 ? "debit" : "credit";

      const accountId = combinedAmountandId.accountId;

      const transactionId = combinedAmountandId.transactionId;
      const entryId = combinedAmountandId.entryId;

      return {
        accountId,
        accountName,
        remainingType,
        amount: Math.abs(offsetAmount).toFixed(2),
        transactionId,
        entryId,
      };
    }
  );

  const handleCreate = () => {
    if (integratedData.length === 0) {
      alert("Add some entries to Preview");
      return;
    }

    const CHECK_AMOUNT = "0.00";
    const checkData = integratedData.map((entry) => {
      if (entry.amount === CHECK_AMOUNT) {
        alert("You cannot create a transaction with 0 amount");
        return null;
      }
      return entry;
    });

    if (checkData.includes(null)) {
      return;
    }

    let totalDebit = 0;
    let totalCredit = 0;

    integratedData.forEach((entry) => {
      if (entry.remainingType === "debit") {
        totalDebit += parseFloat(entry.amount);
      } else if (entry.remainingType === "credit") {
        totalCredit += parseFloat(entry.amount);
      }
    });

    if (totalDebit !== totalCredit) {
      alert("Total Debit and Credit amounts are not equal.");
      return;
    }

    onCreate(integratedData);
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="lg:w-3/4">
        <div className="overflow-x-auto ">
          <Table>
            <Table.Head className="bg-gray-500">
              <Table.HeadCell>Debit Account</Table.HeadCell>
              <Table.HeadCell>Credit Account</Table.HeadCell>
              <Table.HeadCell>Debit Amount</Table.HeadCell>
              <Table.HeadCell>Credit Amount</Table.HeadCell>
            </Table.Head>
            {integratedData.map((data) => (
              <Table.Body className="divide-y" key={data.accountName}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {data.remainingType === "debit" ? data.accountName : ""}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {data.remainingType === "credit" ? data.accountName : ""}
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {data.remainingType === "debit" ? data.amount : ""}
                  </Table.Cell>
                  <Table.Cell className="font-semibold">
                    {data.remainingType === "credit" ? data.amount : ""}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      </div>
      <Button
        gradientDuoTone="greenToBlue"
        onClick={handleCreate}
        className="font-bold"
      >
        Confirm
      </Button>
    </div>
  );
};

export default CreatePreviewTable;
