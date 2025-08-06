export default function Layout({ children, className }) {
  return (
    <div className={`max-w-6xl mx-auto px-4 ${className}`}>
      <main className="flex flex-col gap-8 py-8">{children}</main>
    </div>
  );
}