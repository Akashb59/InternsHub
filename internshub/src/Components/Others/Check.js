import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { companyEnquiries } from "./../Utilities/CompanyFunctions";
function Check() {
  const [enqChart, setEnqChart] = useState({
    labels: ["Previous week", "Previous week", "Previous week", "Current week"],
    datasets: [
      {
        label: "Enquiries",
        fill: false,
        lineTension: 0.4,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 10, 81]
      }
    ]
  });

  useEffect(() => {
    document.title = "InternsHub | Check";

    companyEnquiries().then(res => {
      if (res) {
        //console.log(res.data.data.enquiry);
        const array = res.data.data.enquiry.map(el => {
          var date = new Date(el.reqAt);
          return date.getTime();
        });
        //console.log(array);
        //console.log(7 * 24 * 60 * 60 * 1000);
        //console.log(Date.now());
        //console.log(Date.now() - 7 * 24 * 60 * 60 * 1000);
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        let result = [];
        const w1 = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const w2 = Date.now() - 2 * 7 * 24 * 60 * 60 * 1000;
        const w3 = Date.now() - 3 * 7 * 24 * 60 * 60 * 1000;
        // eslint-disable-next-line
        array.map(el => {
          if (el > w1) count1 += 1;
          else if (el > w2) count2 += 1;
          else if (el > w3) count3 += 1;
          else count4 += 1;
        });
        result[3] = count1;
        result[2] = count2;
        result[1] = count3;
        result[0] = count4;
        console.log(result);
        res = [
          {
            label: "Enquiries",
            fill: false,
            lineTension: 0.4,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: result
          }
        ];
        setEnqChart({ ...enqChart, datasets: res });
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 offset-md-1">
          <Line
            data={enqChart}
            options={{
              title: {
                display: true,
                text: "Average Enquiries per Week",
                fontSize: 20
              },
              legend: {
                display: true,
                position: "right"
              }
            }}
          />
        </div>
        <div className="col-sm-4 offset-sm-4"></div>
      </div>
    </div>
  );
}
export default Check;
