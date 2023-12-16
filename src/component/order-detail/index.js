import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BranchFunction, CliftonLocalUrl, LocalUrl } from "../../config/env";
import { CancelDot, CompletedDot, ProcessingDot } from "../../config/icon";
import BarChart from "../bar-chart";
import Chart from "../chart";
import CustomDateModal from "../custom-date-modal";
import ItemPurchaseChart from "../item-purchase-chart";
import LineCharts from "../lineChart";

function OrderDetail() {
  const [processingOrders, setProcessingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelOrders, setCancelOrders] = useState([]);
  const [dateWiseOrder, setDateWiseOrder] = useState({});
  const [totalOrder, setTotalOrder] = useState([]);
  const [filterTotalOrder, setFilterTotalOrder] = useState([]);
  const [value, setValue] = React.useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const branch = localStorage.getItem("branchName");
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    // let branchNumber =
    //   branch === "branch1"
    //     ? 1
    //     : branch === "branch2"
    //     ? 2
    //     : branch === "branch3"
    //     ? 3
    //     : branch === "branch4"
    //     ? 4
    //     : null;
    // BranchFunction(branch)
    fetch(
      `${LocalUrl}/Order/${BranchFunction(branch)}/Get-Order/${branch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setTotalOrder(result);
        setFilterTotalOrder(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    const completed = filterTotalOrder.filter((e) => e.status === "completed");
    const processing = filterTotalOrder.filter(
      (e) => e.status === "processing"
    );
    const cancel = filterTotalOrder.filter((e) => e.status === "cancled");
    setCompletedOrders(completed);
    setProcessingOrders(processing);
    setCancelOrders(cancel);
    groupOrdersByDate(filterTotalOrder);
  }, [filterTotalOrder.length]);

  function groupOrdersByDate(orders) {
    const groupedOrders = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.order_Date).toLocaleDateString();

      if (!groupedOrders[orderDate]) {
        groupedOrders[orderDate] = [];
      }

      groupedOrders[orderDate].push(order);
    });
    setDateWiseOrder(groupedOrders);
    return groupedOrders;
  }

  const dates = Object.keys(dateWiseOrder);

  const dateOrderCounts = Object.keys(dateWiseOrder).map((date) => ({
    date,
    orderLength: dateWiseOrder[date].map((e) => {
      return e;
    }),
    count: dateWiseOrder[date].length,
  }));
  const ProductCount = dateOrderCounts.map((e) =>
    e.orderLength.map((e) => e.ProductOrder.length)
  );

  const orderCounts = dateOrderCounts?.map((e) => {
    return e.count;
  });
  const totalSalePerDay = dateOrderCounts?.map((e) => {
    return e.orderLength.map(
      (e) =>
        parseFloat(e.total_amount) +
        parseFloat(e.tax) +
        parseFloat(e.delivery_charges)
      // return allAmount;
    );
  });
  const totalPaymentPerDay = dateOrderCounts?.map((e) => {
    return e.orderLength.map((e) => e.total_amount);
  });
  function filterOrders(days, startDate, endDate) {
    setValue([startDate, endDate]);
    const currentDate = dayjs(); // Use dayjs for consistent date handling

    if (days === "7") {
      // Filter for 7 days (default)
      const filteredOrder = totalOrder.filter((order) =>
        dayjs(order.order_Date).isAfter(currentDate.subtract(7, "day"))
      );
      setFilterTotalOrder(filteredOrder);
    } else if (days === "3") {
      // Filter for 3 days
      const filteredOrder = totalOrder.filter((order) =>
        dayjs(order.order_Date).isAfter(currentDate.subtract(3, "day"))
      );
      setFilterTotalOrder(filteredOrder);
    } else if (days === "today") {
      const filteredOrder = totalOrder.filter((order) =>
        dayjs(order.order_Date).isSame(currentDate, "day")
      );
      setFilterTotalOrder(filteredOrder);
    } else if (days === "custom") {
      const filteredOrder = totalOrder.filter((order) => {
        const orderDate = dayjs(order.order_Date);
        return orderDate.isAfter(startDate) && orderDate.isBefore(endDate);
      });
      setFilterTotalOrder(filteredOrder);
    }
  }
  const summedSales = totalSalePerDay?.map((totalSalePerDay) =>
    totalSalePerDay?.reduce((total, sale) => total + sale, 0)
  );
  const paymentSales = totalPaymentPerDay?.map((totalPaymentPerDay) =>
    totalPaymentPerDay?.reduce((total, sale) => total + sale, 0)
  );
  const allProductReduce = ProductCount?.map((ProductCount) =>
    ProductCount?.reduce((total, sale) => total + sale, 0)
  );
  return (
    <>
      <div className="days-filter-div glass-morphism">
        <p
          className="days-text"
          onClick={() => {
            //   setReportDays("custom");
            handleOpen();
          }}
        >
          Custom
        </p>
        <p
          className="days-text"
          onClick={() => {
            //   setReportDays("3");
            filterOrders("today");
          }}
        >
          Today
        </p>
        <p
          className="days-text"
          onClick={() => {
            //   setReportDays("3");
            filterOrders("3");
          }}
        >
          3 Days
        </p>
        <p
          className="days-text"
          onClick={() => {
            //   setReportDays("7");
            filterOrders("7");
          }}
        >
          7 Days
        </p>
      </div>
      <div className="report-filter-div glass-morphism">
        <span className="report-date-filter">Report Date Filter</span>
        <span className="report-date">
          {value[0]?.format("DD-MM-YYYY")} / {value[1]?.format("DD-MM-YYYY")}
        </span>
      </div>
      <main className="main-order-detail-and-chart">
        <div className="total-chart-container glass-morphism">
          <p>Total Order</p>
          {Object.keys(dateWiseOrder).length > 0 ? (
            <Chart
              completedOrders={completedOrders}
              processingOrders={processingOrders}
              cancelOrders={cancelOrders}
            />
          ) : (
            <p>No data available.</p>
          )}
          <div style={{ margin: "20px 10px" }}>
            <div className="cancel-dot">
              <img src={CancelDot} alt="" />
              <p>Cancel</p>
            </div>
            <div className="completed-dot">
              <img src={CompletedDot} alt="" />
              <p>Completed</p>
            </div>
            <div className="completed-dot">
              <img src={ProcessingDot} alt="" />
              <p>Processing</p>
            </div>
          </div>
        </div>
        <div className="total-chart-container glass-morphism">
          <p>Order Placed</p>
          {Object.keys(dateWiseOrder).length > 0 ? (
            <BarChart
              data={orderCounts.slice(0, 3)}
              labels={dates.slice(0, 3)}
            />
          ) : (
            <p>No data available.</p>
          )}
        </div>
        <div className="total-chart-container glass-morphism">
          <p>Items Purchased</p>
          {Object.keys(dateWiseOrder).length > 0 ? (
            <ItemPurchaseChart
              data={allProductReduce.slice(0, 3)}
              labels={dates.slice(0, 3)}
            />
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </main>
      <main className="main-order-detail-and-chart">
        <div className="line-chart-container glass-morphism">
          <p>Gross Sale</p>
          {Object.keys(dateWiseOrder).length > 0 ? (
            <LineCharts
              summedSales={summedSales.slice(0, 10)}
              dates={dates.slice(0, 10)}
            />
          ) : (
            <p>No data available.</p>
          )}
        </div>
        <div className="line-chart-container glass-morphism">
          <p>Net Sale</p>
          {Object.keys(dateWiseOrder).length > 0 ? (
            <LineCharts
              summedSales={paymentSales.slice(0, 10)}
              dates={dates.slice(0, 10)}
            />
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </main>
      {open && (
        <CustomDateModal
          handleClose={handleClose}
          open={open}
          // setValue={setValue}
          // value={value}
          filterOrders={filterOrders}
        />
      )}
    </>
  );
}
export default OrderDetail;
