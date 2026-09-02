import { useEffect, useState } from "react";
import { fetchProducts } from "../api/client";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Shop on EMI</h1>
      <p className="text-gray-500 mb-6">
        Smartphones with flexible EMI plans backed by mutual funds.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
