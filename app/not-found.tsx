import { ErrorPage } from "@/components/widgets/error";

export default function ErrorRender({ reset }: { reset: () => void }) {
  return <ErrorPage onClick={reset} />;
}
