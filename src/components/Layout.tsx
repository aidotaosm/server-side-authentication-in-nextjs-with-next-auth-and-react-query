import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = "NextJs ServerSide Authentication",
}: Props) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",

      minHeight: "100vh",
    }}
  >
    <header style={{ padding: "1rem" }}>
      <nav>
        <Link href="/">Home</Link> | <Link href="/about">About</Link> |{" "}
        <Link href="/users">Users List</Link> |{" "}
        <a href="/api/users">Users API</a>
      </nav>
    </header>
    <div style={{ flexGrow: 1, padding: "1rem" }}>{children}</div>
    <footer style={{ padding: "1rem" }}>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
