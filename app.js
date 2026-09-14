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
          <div className="text-center p-8 max-w-md glass-card">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Waduh, ada masalah!</h1>
            <p className="text-gray-600 mb-6">Terjadi kesalahan tak terduga dalam aplikasi.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
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
    width: 300,
    errorCorrectionLevel: 'M'
  });
  const [loading, setLoading] = React.useState(false);

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
    <div className="min-h-screen bg-[var(--bg-gradient)]" data-name="app-container" data-file="app.js">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-3/5 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--primary-color)]">
                QRCraft: Generator QR <br/>
                <span className="text-[var(--accent-color)]">Minimalis & Modern</span>
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
        <p>&copy; {new Date().getFullYear()} QRCraft by Trickle. Semua Hak Dilindungi.</p>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);