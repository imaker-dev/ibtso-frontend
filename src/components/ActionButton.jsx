const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  color = "gray",
  disabled = false,
  loading = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 border";

  const colorStyles = {
    gray: "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300",
    red: "bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300",
    blue: "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300",
    green: "bg-green-50 border-green-200 text-green-600 hover:bg-green-100 hover:border-green-300",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-300",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-300",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${colorStyles[color] || colorStyles.gray} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}

      {label && <span>{label}</span>}
    </button>
  );
};

export default ActionButton;
