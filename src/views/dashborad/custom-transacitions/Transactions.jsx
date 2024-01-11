import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../components/AuthProvider";
import TransactionsTable from "../../../components/tables/TransactionsTable";
import { Carousel } from "flowbite-react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { authToken } = useAuth();

  const fetchData = () => {
    axios
      .get("http://localhost:8080/transactions/user", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [authToken]);

  return (
    <div>
      <div>
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel
            onSlideChange={(index) => console.log("onSlideChange()", index)}
          >
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
              <div>Asset</div>
              <div>Liability</div>
              <div>Equity</div>
            </div>
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
              <div>Income</div>
              <div>Expense</div>
            </div>
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
              Slide 3
            </div>
          </Carousel>
        </div>
      </div>
      <div>
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
};

export default Transactions;
