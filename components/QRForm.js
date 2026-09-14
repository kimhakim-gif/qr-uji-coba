function QRForm({ onGenerate }) {
  const [content, setContent] = React.useState('https://trickle.so');
  const [type, setType] = React.useState('url');
  const [darkColor, setDarkColor] = React.useState('#0f172a');
  const [lightColor, setLightColor] = React.useState('#ffffff');
  const [errorLevel, setErrorLevel] = React.useState('M');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(content, {
      color: { dark: darkColor, light: lightColor },
      errorCorrectionLevel: errorLevel
    });
  };

  const tabs = [
    { id: 'url', label: 'Tautan', icon: 'icon-link' },
    { id: 'text', label: 'Teks', icon: 'icon-file-text' },
    { id: 'email', label: 'Email', icon: 'icon-mail' },
    { id: 'wifi', label: 'WiFi', icon: 'icon-wifi' }
  ];

  return (
    <div className="glass-card p-6 md:p-8" data-name="qr-form" data-file="components/QRForm.js">
      <div className="flex overflow-x-auto pb-4 gap-2 mb-8 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setType(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              type === tab.id 
                ? 'bg-[var(--primary-color)] text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className={`${tab.icon} text-sm`}></div>
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {type === 'url' ? 'Masukkan URL' : type === 'text' ? 'Teks Konten' : type === 'email' ? 'Alamat Email' : 'Nama Network WiFi'}
          </label>
          <input
            type={type === 'email' ? 'email' : 'text'}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={type === 'url' ? 'https://contoh.com' : 'Ketik sesuatu di sini...'}
            className="input-field"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Warna QR</label>
            <div className="flex items-center gap-3 p-2 border border-gray-200 rounded-xl bg-white">
              <input 
                type="color" 
                value={darkColor} 
                onChange={(e) => setDarkColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
              />
              <span className="text-sm font-mono text-gray-600 uppercase">{darkColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Warna Latar</label>
            <div className="flex items-center gap-3 p-2 border border-gray-200 rounded-xl bg-white">
              <input 
                type="color" 
                value={lightColor} 
                onChange={(e) => setLightColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
              />
              <span className="text-sm font-mono text-gray-600 uppercase">{lightColor}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tingkat Ketahanan Error</label>
          <select 
            value={errorLevel} 
            onChange={(e) => setErrorLevel(e.target.value)}
            className="input-field appearance-none cursor-pointer"
          >
            <option value="L">Rendah (L)</option>
            <option value="M">Sedang (M)</option>
            <option value="Q">Kualitas (Q)</option>
            <option value="H">Tinggi (H)</option>
          </select>
        </div>

        <button type="submit" className="btn-primary w-full">
          Perbarui QR Code
          <div className="icon-refresh-cw text-lg"></div>
        </button>
      </form>
    </div>
  );
}