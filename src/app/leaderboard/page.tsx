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
      <button className="inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#4d0000,55%,#4d0000)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <Link href="/dashboard">
          Dashboard &rarr;
        </Link>
      </button>

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
