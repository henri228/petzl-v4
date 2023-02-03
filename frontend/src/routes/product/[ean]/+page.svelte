<script>
  import ApexCharts from "apexcharts";
  export let data;
  import moment from "moment";

  //generating an array filled with everyday date
  function fillDatesArray(startDate, endDate) {
    let dateArray = [];
    let currentDate = new Date(startDate);
    endDate = new Date(endDate);

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate).toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }

  let start = "2023-01-01";
  let end = "2023-02-03";
  let dates = fillDatesArray(start, end);

  console.log(data.parsedOffers);

  const parseTimeSeries = (offers, dates) => {
    let series = [];
    for (const key in offers) {
      let retailer = {
        name: key,
        data: [],
      };
      for (const date of dates) {
        let found = false;
        for (const item of offers[key]) {
          if (
            moment(date).format().split("T")[0] ===
            moment(item.date).format().split("T")[0]
          ) {
            retailer.data.push([new Date(date).getTime(), item.priceCurrent]);
            found = true;
            break;
          }
        }
        if (!found) {
          5;
          retailer.data.push([new Date(date).getTime(), 0]);
        }
      }
      series.push(retailer);
    }

    return series;
  };

  const series = parseTimeSeries(data.parsedOffers, dates);


  var options = {
    series,
    title: {
      text: "Saved words",
      align: "left",
    },
    chart: {
      type: "line",
      width: "50%",
      height: 300,
      toolbar: {
        show: true,
      },
      parentHeightOffset: 0,
      animations: {
        enabled: false,
      }
    },
    stroke: {
        curve: 'stepline',
        width: 2,
      },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          fontWeight: 800,
        },
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: 14,
      },
      background: {
        padding: 10,
        borderWidth: 3,
        borderColor: "#a9d4a5",
      },
    },
    tooltip: {
        enabled: true,
    },
  };



  function chart(node) {
    const chart = new ApexCharts(node, options);
    chart.render();

    return {
      destroy() {
        chart.destroy();
      },
    };
  }
</script>

<div id="chart-wrapper">
  <div id="apex-chart" use:chart />
</div>
