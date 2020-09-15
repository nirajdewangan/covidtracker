import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";



const options = {
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: true,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: 'YYYY-MM-DD',
          //format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};


const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  data.response.reverse().map( (res) => {
  //casesType = casesType==='cases' ? 'cases' : 'deaths' 
   let newDataPoint;
   if(casesType==='cases'){
     newDataPoint = {
        x: res.day,
        y: res[casesType]['total'],
      }; 
   } else{
     newDataPoint = {
        x: res.day,
        y: ((res['deaths']['total']/res['cases']['total'] )* 100),
      };
   }
    
    chartData.push(newDataPoint);

  })
  // for (let date in data.cases) {
  //   if (lastDataPoint) {
  //     let newDataPoint = {
  //       x: date,
  //       y: data[casesType][date] - lastDataPoint,
  //     };
  //     chartData.push(newDataPoint);
  //   }
  //   lastDataPoint = data[casesType][date];
  // }
  console.log("chartData",casesType, chartData)
  return chartData;
};

function LineGraph({ casesType = 'cases' }) {
  const [data, setData] = useState({});
  const xyz = {
    ...options,
    casesType,

    }
  const [opt, setOpt] = useState(xyz);

  console.log("opt", opt);
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://covidincontext.22feetlabs.co/static/json/history_All.json") //("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: casesType === 'cases'? "rgba(253, 126, 20, 0.5)" :"rgba(204, 16, 52, 0.5)",
                borderColor: casesType === 'cases'? "rgba(253, 126, 20)" : "#CC1034",
                data: data,
                label: casesType === 'cases'? 'Infected BPS' : 'Mortality %'
              },
            ],
          }}
          options={ opt }
        />
      )}
    </div>
  );
}

export default LineGraph;