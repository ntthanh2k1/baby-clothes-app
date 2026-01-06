import { LoaderCircle } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default LoadingOverlay;
