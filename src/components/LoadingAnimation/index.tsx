import cn from '@utils/cn';

export default function LoadingAnimation({
  width = 24,
  height = 24,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(`h-8 w-8 ${className} animate-spin`)}
      style={{
        width,
        height,
      }}
    >
      <img src="img/loading.webp" alt="loading" />
    </div>
  );
}
