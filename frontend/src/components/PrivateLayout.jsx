import Navbar from "./Navbar";

export default function PrivateLayout({ children }) {
  return (
    <div className="min-h-screen bg-custom-black text-custom-ivory">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4 md:p-6">{children}</main>
    </div>
  );
}
