export default function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-red-600 font-medium mb-1">Failed to load data</p>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}
