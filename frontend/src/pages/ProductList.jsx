import { useEffect, useState } from "react";
import { fetchProducts } from "../api/client";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchProducts()
      .then((data) => {
        if (!isMounted) return;
        setProducts(data);
        setStatus("success");
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message);
        setStatus("error");
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") return <Loader label="Loading products..." />;
  if (status === "error") return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Easy EMI Shopping
        </h1>
        <p className="text-black-500 mb-6 font-semibold">
          Buy smartphones{" "}
          <span className="text-[#6F27D9] font-bold">on flexible EMIs,</span>{" "}
          <span className="text-gray-600 font-bold">
            backed by your mutual funds.
          </span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 divide-y sm:divide-y-0 sm:divide-x divide-blue-100 border border-blue-200">
          <div className="flex items-center gap-3 sm:pr-4">
            <svg
              className="h-6 w-6 text-blue-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Free & Fast Delivery
              </p>
              <p className="text-xs text-gray-500">Across India</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:px-4 pt-4 sm:pt-0">
            <svg
              className="h-6 w-6 text-blue-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Secure Payments
              </p>
              <p className="text-xs text-gray-500">100% Safe & Encrypted</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:pl-4 pt-4 sm:pt-0">
            <svg
              className="h-6 w-6 text-blue-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Trusted by Thousands
              </p>
              <p className="text-xs text-gray-500">Hassle-free EMI shopping</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
