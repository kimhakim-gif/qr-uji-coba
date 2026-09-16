function QRDisplay({ data, options, loading }) {
  const qrContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (!qrContainerRef.current || !data || !window.QRCode) {
      return;
    }

    qrContainerRef.current.replaceChildren();
    const errorLevel = window.QRCode.CorrectLevel[options.errorCorrectionLevel] || window.QRCode.CorrectLevel.M;
    new window.QRCode(qrContainerRef.current, {
      text: data,
      width: 600,
      height: 600,
      colorDark: options.color?.dark || '#0f172a',
      colorLight: options.color?.light || '#ffffff',
      correctLevel: errorLevel
    });
  }, [data, options]);

  const handleDownload = (format) => {
    const canvas = qrContainerRef.current?.querySelector('canvas');
    const image = qrContainerRef.current?.querySelector('img');
    if (!canvas && !image) return;

    const download = (sourceCanvas) => {
      const link = document.createElement('a');
      link.download = `qrcraft-${Date.now()}.${format}`;
      link.href = sourceCanvas.toDataURL(`image/${format}`);
      link.click();
    };

    if (canvas) {
      download(canvas);
      return;
    }

    const downloadCanvas = document.createElement('canvas');
    downloadCanvas.width = image.naturalWidth || 600;
    downloadCanvas.height = image.naturalHeight || 600;
    downloadCanvas.getContext('2d').drawImage(image, 0, 0);
    download(downloadCanvas);
  };

  return (
    <div className="glass-card p-8 flex flex-col items-center gap-8 animate-in fade-in duration-500" data-name="qr-display" data-file="components/QRDisplay.js">
      <div className="relative group">
        <div className={`w-full max-w-[300px] aspect-square bg-white rounded-2xl overflow-hidden shadow-inner border border-gray-100 flex items-center justify-center transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          <div ref={qrContainerRef} className="w-full h-full flex items-center justify-center p-4"></div>
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