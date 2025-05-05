import { ErrorPage } from '@/components/Widgets/Error';

export default function ErrorRender({ reset }: { reset: () => void }) {

  return (
    <ErrorPage onClick={reset} />
  );
}
