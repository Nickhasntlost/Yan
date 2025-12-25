import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata = {
  title: "Yantrika",
  description: "Robotics Club",
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
