import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductBySlug } from "../api/client";
import { formatINR } from "../utils/format";
import VariantSelector from "../components/VariantSelector";
import EmiPlanList from "../components/EmiPlanList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setStatus("loading");
    setConfirmed(false);

    fetchProductBySlug(slug)
      .then((data) => {
        if (!isMounted) return;
        setProduct(data);
        setSelectedVariant(data.variants[0]);
        setSelectedPlan(data.variants[0].emiPlans[0]);
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
  }, [slug]);

  function handleVariantSelect(variant) {
    setSelectedVariant(variant);
    setSelectedPlan(variant.emiPlans[0]);
    setConfirmed(false);
  }

  function handlePlanSelect(plan) {
    setSelectedPlan(plan);
    setConfirmed(false);
  }

  if (status === "loading") return <Loader label="Loading product..." />;
  if (status === "error") return <ErrorMessage message={error} />;
  if (!product || !selectedVariant || !selectedPlan) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-gray-500 hover:text-gray-800">
        ← Back to products
      </Link>

      <div className="mt-4 grid md:grid-cols-2 gap-8">
        {/* Left: image */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
          <img
            src={selectedVariant.image}
            alt={`${product.name} ${selectedVariant.color}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: details */}
        <div>
          <p className="text-xs uppercase tracking-wide text-green-600 font-semibold mb-1">
            New
          </p>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-500 mb-4">{selectedVariant.storage}</p>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-2xl font-bold text-gray-900">
              {formatINR(selectedVariant.price)}
            </span>
            {selectedVariant.mrp > selectedVariant.price && (
              <span className="text-gray-400 line-through">
                {formatINR(selectedVariant.mrp)}
              </span>
            )}
          </div>

          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelect={handleVariantSelect}
          />

          <EmiPlanList
            plans={selectedVariant.emiPlans}
            selectedPlan={selectedPlan}
            onSelect={handlePlanSelect}
          />

          <button
            onClick={() => setConfirmed(true)}
            className="mt-6 w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Proceed with {formatINR(selectedPlan.monthlyAmount)}/mo plan
          </button>

          {confirmed && (
            <div className="mt-3 text-sm bg-green-50 text-green-700 border border-green-200 rounded-lg px-4 py-3">
              Selected: {product.name} ({selectedVariant.storage} /{" "}
              {selectedVariant.color}) — {selectedPlan.tenureMonths} months at{" "}
              {formatINR(selectedPlan.monthlyAmount)}/mo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
