import { Loader } from "@/components/ui/Loader";

export default function AdminLoading() {
  return (
    <div className="h-[600px] flex items-center justify-center">
      <Loader message="Loading page..." />
    </div>
  );
}
