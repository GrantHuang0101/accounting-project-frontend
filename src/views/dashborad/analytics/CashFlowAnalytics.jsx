import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../components/AuthProvider";
import API_BASE_URL from "../../../../config";
import CashFlowTable from "../../../components/tables/CashFlowTable";

const CashFlowAnalytics = () => {
  const [transactions, setTransactions] = useState([]);
  const { authToken } = useAuth();

  const fetchData = () => {
    axios
      .get(`${API_BASE_URL}/transactions/user`, {
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
      <CashFlowTable transactions={transactions} />
    </div>
  );
};

export default CashFlowAnalytics;
