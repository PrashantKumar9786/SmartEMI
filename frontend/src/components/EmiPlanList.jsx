import { formatINR } from "../utils/format";

export default function EmiPlanList({ plans, selectedPlan, onSelect }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">
        EMI plans backed by mutual funds
      </p>
      <div className="space-y-2">
        {plans.map((plan) => {
          const isActive = plan.tenureMonths === selectedPlan.tenureMonths;
          return (
            <button
              key={plan.tenureMonths}
              onClick={() => onSelect(plan)}
              className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                isActive
                  ? "border-gray-900 bg-gray-50 ring-1 ring-gray-900"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {formatINR(plan.monthlyAmount)}{" "}
                  <span className="font-semibold text-gray-900">
                    x {plan.tenureMonths} months
                  </span>
                </p>
                {plan.cashback > 0 && (
                  <p className="text-xs text-green-600 mt-0.5">
                    Additional cashback of {formatINR(plan.cashback)}
                  </p>
                )}
              </div>
              <span className="text-md font-medium px-2 py-1 rounded-full whitespace-nowrap text-black">
                {plan.interestRate === 0
                  ? "0% interest"
                  : `${plan.interestRate}% interest`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
