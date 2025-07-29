// app/success/page.jsx
export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your payment. Your transaction was completed successfully.</p>
        <a
          href="/dashboard"
          className="inline-block bg-pink-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
