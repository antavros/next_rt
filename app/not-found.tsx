import { ErrorPage } from '@/components/widgets/Error';

export default function ErrorRender({ reset }: { reset: () => void }) {

  return (
    <ErrorPage onClick={reset} />
  );
}
