export default function Loading() {
  return (
    <div
      className="flex min-h-[60svh] flex-col items-center justify-center px-6"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="relative flex flex-col items-center">
        <p className="font-display text-3xl tracking-[0.08em] text-ivory/90 md:text-4xl">
          Marit
        </p>
        <div className="mt-6 h-px w-24 overflow-hidden bg-white/10">
          <div className="h-full w-1/2 animate-[marit-load_1.1s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-champagne to-transparent" />
        </div>
        <p className="mt-5 text-[10px] uppercase tracking-[0.32em] text-taupe">
          Orchestrating
        </p>
      </div>
    </div>
  );
}
