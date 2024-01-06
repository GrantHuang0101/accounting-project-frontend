import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../components/AuthProvider";
import TransactionsTable from "../../components/tables/TransactionsTable";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { authToken } = useAuth();

  useEffect(() => {
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
  }, [authToken]);

  return (
    <div>
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default Transactions;
