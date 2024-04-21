import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href={"/user/dashboard"}>Moqa</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/user/trade"}>Trade</Link>
            </li>
            <li>
              <Link href={"/user/wallet"}>Wallet</Link>
            </li>
            <li>
              <Link href={"/user/leaderboard"}>Leaderboards</Link>
            </li>
          </ul>
        </div>
      </div>

      {children}
    </div>
  );
}
