"use server";

import { ErrorPage } from "@/components/Widgets/Error";

export default async function ErrorRender({ reset }: { reset: () => void }) {
  return <ErrorPage onClick={reset} />;
}
