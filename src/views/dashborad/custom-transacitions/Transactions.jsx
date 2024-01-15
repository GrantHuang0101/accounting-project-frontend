import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../components/AuthProvider";
import TransactionsTable from "../../../components/tables/TransactionsTable";
import GeneralCarousel from "../../../components/carousel/GeneralCarousel";

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
        <GeneralCarousel transactions={transactions} />
      </div>
      <div>
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
};

export default Transactions;
