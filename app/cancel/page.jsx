// app/cancel/page.jsx
export default function CancelPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed or Cancelled</h1>
        <p className="text-gray-700 mb-6">
          Your payment didn’t go through or was cancelled. Please try again.
        </p>
        <a
          href="/checkout"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Try Again
        </a>
      </div>
    </div>
  );
}
