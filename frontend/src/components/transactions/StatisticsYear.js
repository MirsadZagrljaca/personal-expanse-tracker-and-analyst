import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import Header from "../core/Header";
import Menu from "../core/Menu";
import { list } from "./api-transaction";
import { Chart } from "react-google-charts";
import { Button } from "react-bootstrap";

/* eslint-disable */

export default function StatisticsYear() {
  const [user, setUser] = useState({
    _id: "",
    firstName: "",
  });
  const [data, setData] = useState([]);
  const [year, setYear] = useState({ income: 0, expense: 0 });
  const [yearTwo, setYearTwo] = useState({ income: 0, expense: 0 });
  const [chart, setChart] = useState("pie");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/" />;
    }

    const token = JSON.parse(localStorage.getItem("token"));
    const tempUser = token.user;
    setUser(tempUser);

    list().then((values, error) => {
      if (error) {
        console.log(error);
      } else {
        let response = [];
        let i = 0;
        values.map((value, index) => {
          if (value.objectId._id == tempUser._id) {
            if (value.objectId._id == tempUser._id) {
              const date = value.created.split("-");
              const year = date[0];

              const currentDate = new Date();
              const currentYear = currentDate.getFullYear().toString();

              if (year === currentYear) {
                response[i] = value;
                i++;
              }
            }
          }
        });
        setData(response);
      }
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    let tempInc = 0;
    let tempExp = 0;
    let temp1Inc = 0;
    let temp1Exp = 0;

    data.map((value, index) => {
      const temp = value.created.split("-");
      const year = temp[0];

      if (year === "2021") {
        if (value.type === "income") {
          tempInc += value.amount;
        } else {
          tempExp += value.amount;
        }
      } else if (year === "2022") {
        if (value.type === "income") {
          temp1Inc += value.amount;
        } else {
          temp1Exp += value.amount;
        }
      }
    });

    setYear({ income: tempInc, expense: tempExp });
    setYearTwo({ income: temp1Inc, expense: temp1Exp });
  }, [data]);

  return (
    <div>
      <Header id={user._id} firstName={user.firstName} />
      <Menu />
      <div className="stat-week">
        <div className="stat-menu">
          <Button variant="outline-primary" onClick={() => setChart("pie")}>
            Pie
          </Button>
          <Button variant="outline-primary" onClick={() => setChart("column")}>
            Column
          </Button>
          <Button variant="outline-primary" onClick={() => setChart("bar")}>
            Bar
          </Button>
        </div>

        <div className="stat-main">
          <div className="stat-left">
            {chart === "pie" && (
              <Chart
                chartType="PieChart"
                data={[
                  ["Transactions", "Per Year"],
                  ["2021 Inc", year.income],
                  ["2021 Exp", year.expense],
                  ["2022 Inc", yearTwo.income],
                  ["2022 Exp", yearTwo.expense],
                ]}
                options={{ title: "Transactions Per Year" }}
                width={"500px"}
                height={"500px"}
                style={{ background: "transparent" }}
              />
            )}

            {chart === "bar" && (
              <Chart
                chartType="BarChart"
                width={"500px"}
                height={"500px"}
                data={[
                  ["Transactions", "Income", "Expense"],
                  ["2021", year.income, year.expense],
                  ["2022", yearTwo.income, yearTwo.expense],
                ]}
                options={{ title: "Transactions Per Year" }}
              />
            )}

            {chart === "column" && (
              <Chart
                chartType="ColumnChart"
                width={"500px"}
                height={"500px"}
                data={[
                  ["Transactions", "Income", "Expense"],
                  ["2021", year.income, year.expense],
                  ["2022", yearTwo.income, yearTwo.expense],
                ]}
                options={{ title: "Transactions Per Year" }}
              />
            )}
          </div>

          <div className="stat-right">
            {year.expense === 0 && year.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                2021 <span className="all-income">+{year.income} </span>
                <span className="all-expense">-{year.expense}</span>
              </p>
            )}
            {yearTwo.expense === 0 && yearTwo.expense === 0 ? (
              <div></div>
            ) : (
              <p className="stat">
                2022 <span className="all-income">+{yearTwo.income} </span>
                <span className="all-expense">-{yearTwo.expense}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
