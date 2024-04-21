"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/utils/initialize_supabase";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function SignupFormDemo() {
  const [data, setData] = useState<Array<{ x: Date, y: Array<number> }>>([]);
  const [symbols, setSymbbols] = useState(["USD", "PKR", "EUR"]);
  const [selectedSymbol, setSelectedSymbol] = useState("USD");
  const [orderAmount, setOrderAmount] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [createOrderLoading, setCreateOrderpLoading] = useState(false);

  const invoices = [
  {
    orderTime: "09:03 12th Oct 2024",
    symbol: "USD",
    type: "Buy",
    initialPrice: "100.00",
    unrealizedProfitLoss: "50.00",
    amount: "10",
  },
  {
    orderTime: "09:03 12th Oct 2024",
    symbol: "USD",
    type: "Buy",
    initialPrice: "100.00",
    unrealizedProfitLoss: "50.00",
    amount: "10",
  },
  {
    orderTime: "09:03 12th Oct 2024",
    symbol: "USD",
    type: "Buy",
    initialPrice: "100.00",
    unrealizedProfitLoss: "50.00",
    amount: "10",
  },
  {
    orderTime: "09:03 12th Oct 2024",
    symbol: "USD",
    type: "Buy",
    initialPrice: "100.00",
    unrealizedProfitLoss: "50.00",
    amount: "10",
  },
  {
    orderTime: "09:03 12th Oct 2024",
    symbol: "USD",
    type: "Buy",
    initialPrice: "100.00",
    unrealizedProfitLoss: "50.00",
    amount: "10",
  },
  {
    orderTime: "09:03 12th Oct 2024",
    symbol: "USD",
    type: "Buy",
    initialPrice: "100.00",
    unrealizedProfitLoss: "50.00",
    amount: "10",
  },
  {
    orderTime: "09:03 12th Oct 2024",
    symbol: "USD",
    type: "Buy",
    initialPrice: "100.00",
    unrealizedProfitLoss: "50.00",
    amount: "10",
  },
]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateOrderpLoading(true);
    setErrorMessage('');

    // const { error } = await supabase.from('').insert('');
    // if (error) {
    //   console.log(error);
    //   setErrorMessage(error.message);
    //   setCreateOrderpLoading(false);
    //   return;
    // }

    setCreateOrderpLoading(false);
  };

  useEffect(() => {
    fetch('/user/trade/api')
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
    <div className="w-full flex flex-col items-center mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input dark:bg-black">
      <Select defaultValue={selectedSymbol} onValueChange={e => setSelectedSymbol(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select symbol" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Symbols</SelectLabel>
            {symbols.map(s => (
              <SelectItem value={s}>{s}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex flex-row items-center">
        <ApexChart type="candlestick" options={{
          chart: {
            type: 'candlestick',
            height: 350
          },
          title: {
            text: selectedSymbol + ' Chart',
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

        <div className="w-8"/>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Order Amount</Label>
            <Input id="email" placeholder="0" type="number" onChange={(e) => setOrderAmount(e.target.value)} />
          </LabelInputContainer>
          <div className="flex flex-col md:flex-row md:justify-around space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              {createOrderLoading ? 'Loading...' : <p>Buy</p>}
            </button>
            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#4d0000,45%,#1e2631,55%,#4d0000)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              {createOrderLoading ? 'Loading...' : <p>Sell</p>}
            </button>
          </div>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          {errorMessage.length !== 0 && <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {errorMessage}
            </AlertDescription>
          </Alert>}

        </form>
      </div>



      <Tabs defaultValue="open-orders">
        <TabsList>
          <TabsTrigger value="open-orders">Open Orders</TabsTrigger>
          <TabsTrigger value="orders-history">Orders History</TabsTrigger>
        </TabsList>
        <TabsContent value="open-orders">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order Time</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Initial Price</TableHead>
                <TableHead>Unrealized Profit / Loss</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.slice(0,3).map((invoice) => (
                <TableRow key={invoice.orderTime}>
                  <TableCell className="font-medium">{invoice.orderTime}</TableCell>
                  <TableCell>{invoice.symbol}</TableCell>
                  <TableCell>{invoice.type}</TableCell>
                  <TableCell>{invoice.initialPrice}</TableCell>
                  <TableCell>{invoice.unrealizedProfitLoss}</TableCell>
                  <TableCell className="text-right">{invoice.amount}</TableCell>
                  <TableCell className="text-right">
                    <button className="btn btn-error">
                      Close order
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="orders-history">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order Time</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Initial Price</TableHead>
                <TableHead>Unrealized Profit / Loss</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.slice(3-7).map((invoice) => (
                <TableRow key={invoice.orderTime}>
                  <TableCell className="font-medium">{invoice.orderTime}</TableCell>
                  <TableCell>{invoice.symbol}</TableCell>
                  <TableCell>{invoice.type}</TableCell>
                  <TableCell>{invoice.initialPrice}</TableCell>
                  <TableCell>{invoice.unrealizedProfitLoss}</TableCell>
                  <TableCell className="text-right">{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
