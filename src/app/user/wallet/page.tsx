"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function SignupFormDemo() {
  // Add share and marketValue to the currentStocks array
  
  const currentStocks = [
    {
      symbol: "AAPL",
      name: "Apple",
      shares: "10",
      marketValue: "$1000",
    },
    {
      symbol: "TSLA",
      name: "Tesla",
      shares: "8",
      marketValue: "$800",
    },
    {
      symbol: "AMZN",
      name: "Amazon",
      shares: "7.5",
      marketValue: "$750",
    },
    {
      symbol: "GOOGL",
      name: "Google",
      shares: "3",
      marketValue: "$300",
    },
    {
      symbol: "FB",
      name: "Facebook",
      shares: "0.5",
      marketValue: "$50",
    },
  ];
  return (
    <div className="w-full md:w-3/5 flex flex-col items-center mx-auto p-4 md:p-8">
      <div className="stats">
        <div className="stat">
          <div className="stat-title">Available balance</div>
          <div className="stat-value">$89,400</div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Shares</TableHead>
            <TableHead>Market value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStocks.map((stocks) => (
            <TableRow key={stocks.symbol}>
              <TableCell>{stocks.symbol}</TableCell>
              <TableCell>{stocks.name}</TableCell>
              <TableCell>{stocks.shares}</TableCell>
              <TableCell>{stocks.marketValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>$2,500.00</TableCell>
          </TableRow>
      </TableFooter>
      </Table>
    </div>
  );
}
