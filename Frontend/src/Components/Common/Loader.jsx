import { LoaderCircle } from "lucide-react";

const Loader = ({
  text = "Please wait...",
  className = "",
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center justify-center gap-2 font-bold text-[#202020] ${className}`}
    >
      <LoaderCircle
        size={20}
        strokeWidth={2.5}
        className="animate-spin text-[#EC5E27]"
      />

      {text && <span>{text}</span>}
    </div>
  );
};

export default Loader;
