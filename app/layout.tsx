import "@styles/globals.css";

export const metadata = {
  title: "Avgång",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
