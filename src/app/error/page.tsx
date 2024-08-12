"use server";
import React from "react";

import { ErrorPage } from "@/components/widgets/Error";

export default async function ErrorPageRender({
  reset,
}: {
  reset: () => void;
}) {
  return <ErrorPage onClick={reset} />;
}
