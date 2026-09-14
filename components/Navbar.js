function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100" data-name="navbar" data-file="components/Navbar.js">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = 'index.html'}>
          <div className="w-10 h-10 bg-[var(--primary-color)] rounded-xl flex items-center justify-center">
            <div className="icon-qr-code text-white text-xl"></div>
          </div>
          <span className="text-xl font-bold tracking-tight">QRCraft</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium hover:text-[var(--accent-color)] transition-colors">Fitur</a>
          <a href="#" className="text-sm font-medium hover:text-[var(--accent-color)] transition-colors">API</a>
          <a href="#" className="text-sm font-medium hover:text-[var(--accent-color)] transition-colors">Tentang</a>
          <button className="bg-[var(--primary-color)] text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Mulai Gratis
          </button>
        </div>
      </div>
    </nav>
  );
}