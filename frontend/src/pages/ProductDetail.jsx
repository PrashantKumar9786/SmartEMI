import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductBySlug } from "../api/client";
import { formatINR } from "../utils/format";
import ColorSwatchSelector from "../components/ColorSwatchSelector";
import ConfirmationPlan from "../components/ConfirmationPlan";
import EmiPlanList from "../components/EmiPlanList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { resolveImageUrl } from "../api/client";

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

  useEffect(() => {
    if (!confirmed) return;
    const timer = setTimeout(() => setConfirmed(false), 4000);
    return () => clearTimeout(timer);
  }, [confirmed]);

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
    <div className="min-h-screen bg-white-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-900 bg-white shadow-sm hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200"
        >
          Back to products
        </Link>

        <div className="mt-4 grid md:grid-cols-2 gap-8">
          {/* left image */}
          <div>
            <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
              <img
                src={resolveImageUrl(selectedVariant.image)}
                alt={`${product.name} ${selectedVariant.color}`}
                className="w-full h-full object-contain"
              />
            </div>
            <ColorSwatchSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelect={handleVariantSelect}
            />
          </div>

          {/* Right details */}
          <div>
            <p className="text-xs uppercase tracking-wide text-red-600 font-semibold mb-1">
              New
            </p>
            <h1 className="text-2xl font-bold text-black-300 mb-1">
              {product.name} ({selectedVariant.color}, {selectedVariant.storage}
              )
            </h1>
            <p className="text-gray-700 mb-4">
              (Storage: {selectedVariant.storage}, Color:{" "}
              {selectedVariant.color})
            </p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-2xl font-bold text-black-900">
                {formatINR(selectedVariant.price)}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="text-black-900 line-through">
                  {formatINR(selectedVariant.mrp)}
                </span>
              )}
            </div>

            <EmiPlanList
              plans={selectedVariant.emiPlans}
              selectedPlan={selectedPlan}
              onSelect={handlePlanSelect}
            />

            <button
              onClick={() => setConfirmed(true)}
              className="
    mt-6 w-full
    bg-[#0057B8] text-white
    font-semibold py-3 rounded-xl

    shadow-md
    hover:bg-[#004494]
    hover:-translate-y-1
    hover:shadow-lg

    active:translate-y-0
    active:scale-[0.98]
    active:shadow-sm

    transition-all duration-200 ease-out
  "
            >
              Proceed with {formatINR(selectedPlan.monthlyAmount)}/mo plan
            </button>
          </div>
        </div>
        {confirmed && (
          <ConfirmationPlan
            product={product}
            variant={selectedVariant}
            plan={selectedPlan}
            onClose={() => setConfirmed(false)}
          />
        )}
      </div>
    </div>
  );
}
