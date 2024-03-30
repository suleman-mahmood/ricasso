"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function SignupFormDemo() {
  const [data, setData] = useState<Array<{x: Date, y: Array<number>}>>([]);

  useEffect(() => {
    fetch('/dashboard/api')
      .then(res => {
        console.log(res);

        res.json().then(data => {
          var temp = data.data.data;
          const dict: { [key: number]: { open: number, high: number, low: number, close: number } } = {};

          console.log(temp);
          temp = temp.map((t: any) => {
            const date = new Date(t[0] * 1000);
            const value = t[1];

            // date.setHours(0);
            // date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            const key = date.getTime();

            if (dict[key] === undefined) {
              dict[key] = { open: value, high: value, low: value, close: value };
            }
            else {
              dict[key].high = Math.max(dict[key].high, value);
              dict[key].low = Math.min(dict[key].low, value);
              dict[key].close = value;
            }
          });

          const finalData = [];
          for (let key in dict) {
            const v = dict[key];
            finalData.push({
              x: new Date(parseInt(key)),
              y: [v.open, v.high, v.low, v.close],
            })
          }

          setData(finalData);
          console.log(finalData);
        });
      })
  }, []);

  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input dark:bg-black">
      <p>Dashboard</p>
      <ApexChart type="candlestick" options={{
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: 'CandleStick Chart',
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }} series={[{ data: data }]} height={400} width={800} />
    </div>
  );
}
