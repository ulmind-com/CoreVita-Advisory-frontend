import { PageLoader } from "@/components/ui/PageLoader";

export default function AdminLoading() {
  return (
    <div className="h-[600px] flex items-center justify-center">
      <PageLoader />
    </div>
  );
}
