import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { QRCodeSVG } from 'qrcode.react';

// Important: DO NOT remove this ErrorBoundary component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Waduh, ada masalah!</h1>
            <p className="text-gray-600 mb-6">Terjadi kesalahan tak terduga dalam aplikasi.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Komponen Navbar Sederhana
function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <span className="text-xl font-bold text-slate-900">QRCraft</span>
      </div>
    </nav>
  );
}

// Komponen Form Input
function QRForm({ onGenerate }) {
  const [inputValue, setInputValue] = useState('https://trickle.so');
  const [color, setColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(inputValue, {
      color: { dark: color, light: bgColor },
      margin: 4,
      width: 300,
      errorCorrectionLevel: 'M'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tautan atau Teks</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="https://example.com"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Warna QR</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Warna Latar</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
        </div>
      </div>
      <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg transition">
        Perbarui QR Code
      </button>
    </form>
  );
}

// Komponen Display QR Code (DIPERBAIKI: Menggunakan QRCodeSVG agar 100% aman di Vercel)
function QRDisplay({ data, options, loading }) {
  if (loading) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-6">
      <div className="p-4 bg-white rounded-lg">
        {/* QRCodeSVG tidak menggunakan Canvas, sehingga tidak akan error saat build di Vercel */}
        <QRCodeSVG
          value={data || 'https://trickle.so'}
          size={options?.width || 300}
          fgColor={options?.color?.dark || '#0f172a'}
          bgColor={options?.color?.light || '#ffffff'}
          level={options?.errorCorrectionLevel || 'M'}
          includeMargin={true}
        />
      </div>
      <div className="text-center space-y-2 w-full">
        <p className="text-sm font-medium text-gray-900">Siap Digunakan</p>
        <p className="text-xs text-gray-500">Unduh QR code Anda sekarang</p>
        <button
          onClick={() => {
            const svg = document.querySelector('svg');
            if (!svg) return;
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              const pngFile = canvas.toDataURL('image/png');
              const downloadLink = document.createElement('a');
              downloadLink.download = 'qrcode.png';
              downloadLink.href = pngFile;
              downloadLink.click();
            };
            img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}

function App() {
  const [qrData, setQrData] = useState('https://trickle.so');
  const [qrOptions, setQrOptions] = useState({
    color: { dark: '#0f172a', light: '#ffffff' },
    margin: 4,
    width: 300,
    errorCorrectionLevel: 'M'
  });
  const [loading, setLoading] = useState(false);

  const handleGenerate = (data, options) => {
    try {
      setLoading(true);
      setQrData(data);
      setQrOptions(prev => ({ ...prev, ...options }));
      setTimeout(() => setLoading(false), 300);
    } catch (error) {
      console.error('Error generating QR:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" data-name="app-container" data-file="app.js">
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/5 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                QRCraft: Generator QR <br/>
                <span className="text-blue-600">Minimalis & Modern</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-lg">
                Buat kode QR profesional dalam hitungan detik. Kustomisasi warna, ukuran, dan unduh secara instan.
              </p>
            </div>
            <QRForm onGenerate={handleGenerate} />
          </div>
          <div className="w-full lg:w-2/5 lg:sticky lg:top-24">
            <QRDisplay 
              data={qrData} 
              options={qrOptions} 
              loading={loading}
            />
          </div>
        </div>
      </main>
      <footer className="mt-20 py-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} QRCraft. Semua Hak Dilindungi.</p>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);