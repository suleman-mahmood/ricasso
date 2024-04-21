"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";

export default function SignupFormDemo() {
  const invoices = [
    {
      rank: 1,
      name: "Mark",
      accountBalance: "1000",
    },
    {
      rank: 2,
      name: "Smith",
      accountBalance: "800",
    },
    {
      rank: 3,
      name: "John",
      accountBalance: "750",
    },
    {
      rank: 4,
      name: "Doe",
      accountBalance: "300",
    },
    {
      rank: 5,
      name: "Jane",
      accountBalance: "50",
    },
  ]

  return (
    <div className="w-full md:w-3/5 flex flex-col items-center mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input dark:bg-black">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Account balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.rank}>
              <TableCell>{invoice.rank}</TableCell>
              <TableCell>{invoice.name}</TableCell>
              <TableCell>{invoice.accountBalance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
