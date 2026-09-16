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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Waduh, ada masalah!</h1>
            <p className="text-gray-600 mb-6">Error: {this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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

function App() {
  const [qrData, setQrData] = React.useState('https://trickle.so');
  const [qrOptions, setQrOptions] = React.useState({
    color: { dark: '#0f172a', light: '#ffffff' },
    margin: 4,
    errorCorrectionLevel: 'M'
  });
  const [loading, setLoading] = React.useState(false);

  const handleGenerate = (data, options) => {
    setLoading(true);
    setQrData(data);
    setQrOptions((previousOptions) => ({ ...previousOptions, ...options }));
    window.setTimeout(() => setLoading(false), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/5 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                QRCraft: Generator QR <br />
                <span className="text-blue-600">Minimalis &amp; Modern</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-lg">
                Buat kode QR profesional dalam hitungan detik. Kustomisasi warna, ukuran, dan unduh secara instan.
              </p>
            </div>
            <QRForm onGenerate={handleGenerate} />
          </div>
          <div className="w-full lg:w-2/5 lg:sticky lg:top-24">
            <QRDisplay data={qrData} options={qrOptions} loading={loading} />
          </div>
        </div>
      </main>
      <footer className="mt-20 py-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} QRCraft by Trickle. Semua Hak Dilindungi.</p>
      </footer>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error("Elemen dengan id 'root' tidak ditemukan di index.html!");
}
