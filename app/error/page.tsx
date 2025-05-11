"use server";

import { ErrorPage } from "@/components/widgets/error";

export default async function ErrorRender({ reset }: { reset: () => void }) {
  return <ErrorPage onClick={reset} />;
}
