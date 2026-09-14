function QRDisplay({ data, options, loading }) {
  const canvasRef = React.useRef(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted && canvasRef.current && data) {
      try {
        const QRCodeLib = window.QRCode;
        if (!QRCodeLib) {
          console.error('QR Code library not found on window object');
          return;
        }

        QRCodeLib.toCanvas(canvasRef.current, data, {
          ...options,
          width: 600, // Resolusi lebih tinggi untuk canvas internal, ditampilkan lebih kecil
          margin: options.margin || 2
        }, (error) => {
          if (error) console.error('QR Render error:', error);
        });
      } catch (err) {
        console.error('Failed to generate QR:', err);
      }
    }
  }, [mounted, data, options]);

  const handleDownload = (format) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `qrcraft-${Date.now()}.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  };

  return (
    <div className="glass-card p-8 flex flex-col items-center gap-8 animate-in fade-in duration-500" data-name="qr-display" data-file="components/QRDisplay.js">
      <div className="relative group">
        <div className={`w-full max-w-[300px] aspect-square bg-white rounded-2xl overflow-hidden shadow-inner border border-gray-100 flex items-center justify-center transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          <canvas ref={canvasRef} className="w-full h-full object-contain p-4"></canvas>
          {loading && (
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
             </div>
          )}
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="text-center">
          <h3 className="font-bold text-lg mb-1">Siap Digunakan</h3>
          <p className="text-gray-500 text-sm">Unduh QR code Anda sekarang</p>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={() => handleDownload('png')}
            className="flex items-center justify-between w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="icon-image text-xl text-blue-600"></div>
              <div className="text-left">
                <div className="font-semibold text-sm">Download PNG</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Recommended</div>
              </div>
            </div>
            <div className="icon-download text-gray-400 group-hover:text-[var(--primary-color)] transition-colors"></div>
          </button>

          <button 
            onClick={() => handleDownload('jpeg')}
            className="flex items-center justify-between w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="icon-file-image text-xl text-green-600"></div>
              <div className="text-left">
                <div className="font-semibold text-sm">Download JPEG</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Standard</div>
              </div>
            </div>
            <div className="icon-download text-gray-400 group-hover:text-[var(--primary-color)] transition-colors"></div>
          </button>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-gray-400">
           <div className="icon-shield-check text-xl"></div>
           <span className="text-xs font-medium">Privasi Terjamin & Aman</span>
        </div>
      </div>
    </div>
  );
}