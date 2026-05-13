import "./globals.css";
import { Toaster } from "react-hot-toast";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata = {
  title: "HOSANNA GLOBAL ENTERPRISE LIMITED",
  description: "Professional cleaning service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
        <WhatsAppButton />
  <Toaster position="top-right" />
  {children}
  </body>

    </html>
  );
}