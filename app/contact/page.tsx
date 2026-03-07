export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Contact Us
      </h1>

      <p className="mb-6 text-gray-600">
        Have questions? Reach out to our team.
      </p>

      <form className="space-y-6">
        <input
          className="w-full border p-4 rounded-lg"
          placeholder="Your Name"
        />
        <input
          className="w-full border p-4 rounded-lg"
          placeholder="Your Email"
        />
        <textarea
          className="w-full border p-4 rounded-lg"
          rows={5}
          placeholder="Your Message"
        />
        <button className="bg-blue-800 text-white px-6 py-3 rounded-lg">
          Send Message
        </button>
      </form>
    </main>
  );
}