import "./globals.css";

export const metadata = {
  title: "Karim ReactFlow",
  description: "Generated by create next app",
  icons: {
    icon: "/reactflow.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
