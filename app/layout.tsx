import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Floating Menu Design",
  description: "Recreating specific navbar design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#EEF0F5] antialiased min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}
