import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../components/AuthProvider";
import GeneralCarousel from "../../../components/carousel/GeneralCarousel";
import API_BASE_URL from "../../../../config";
import CashFlowCard from "../../../components/cards/CashFlowCard";

const Analytics = () => {
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
    <div className="flex flex-col justify-evenly">
      <div>
        <GeneralCarousel transactions={transactions} />
      </div>
      <div>
        <CashFlowCard transactions={transactions} />
      </div>
      <div>Income Expense</div>
      <div>Inventory</div>
      <div>NI</div>
      <div>Turnover....</div>
    </div>
  );
};

export default Analytics;
