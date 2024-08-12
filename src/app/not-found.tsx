import { ErrorPage } from "@/components/widgets/ErrorPage";

export default function NotFound({ reset }: { reset: () => void }) {
  return <ErrorPage onClick={reset} />;
}
