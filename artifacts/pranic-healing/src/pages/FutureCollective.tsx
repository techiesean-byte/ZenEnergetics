export default function FutureCollective() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-xl mx-auto space-y-6">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70">
          Coming Soon
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
          Future Collective
        </h1>
        <div className="w-12 h-px bg-primary/40 mx-auto" />
        <p className="text-muted-foreground text-lg leading-relaxed">
          Something new is taking shape. A connected space — rooted in the same spirit of healing, growth, and community.
        </p>
        <p className="text-sm text-muted-foreground/70">
          Stay tuned for updates.
        </p>
      </div>
    </div>
  );
}
