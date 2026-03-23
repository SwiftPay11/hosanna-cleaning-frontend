"use client";

export default function WhatsAppButton() {

  const phoneNumber = "07551024386"; // 👉 replace with your number (no +)
  const message = "Hello, I want to inquire about your cleaning services";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition">

        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
        >
          <path d="M16 .396C7.163.396 0 7.56 0 16.396c0 2.888.757 5.706 2.196 8.192L0 32l7.59-2.164A15.9 15.9 0 0016 31.604c8.837 0 16-7.164 16-16S24.837.396 16 .396zm0 29.396c-2.57 0-5.092-.69-7.28-1.994l-.52-.31-4.504 1.285 1.31-4.39-.34-.54A13.86 13.86 0 012.14 16.4c0-7.63 6.22-13.85 13.86-13.85 3.7 0 7.18 1.44 9.8 4.06a13.77 13.77 0 014.06 9.8c0 7.63-6.22 13.85-13.86 13.85zm7.57-10.36c-.41-.21-2.42-1.2-2.8-1.34-.38-.14-.66-.21-.94.21-.28.41-1.08 1.34-1.33 1.62-.24.28-.49.31-.9.1-.41-.21-1.74-.64-3.31-2.04-1.22-1.09-2.04-2.44-2.28-2.85-.24-.41-.03-.63.18-.84.18-.18.41-.49.62-.73.21-.24.28-.41.41-.69.14-.28.07-.52-.03-.73-.1-.21-.94-2.27-1.29-3.11-.34-.82-.68-.7-.94-.71-.24-.01-.52-.01-.8-.01-.28 0-.73.1-1.11.52-.38.41-1.45 1.42-1.45 3.46 0 2.04 1.48 4.01 1.69 4.28.21.28 2.92 4.46 7.08 6.25.99.43 1.76.69 2.36.88.99.31 1.89.27 2.6.16.79-.12 2.42-.99 2.76-1.94.34-.95.34-1.77.24-1.94-.1-.17-.38-.28-.8-.49z"/>
        </svg>

      </div>
    </a>
  );
}