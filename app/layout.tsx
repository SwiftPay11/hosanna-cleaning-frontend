import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "HOSANNA GLOBAL ENTERPRISE LIMITED",
  description: "Premium garment care services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
  <Toaster position="top-right" />
  {children}
  </body>

    </html>
  );
}