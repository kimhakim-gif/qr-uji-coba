# QRCraft - Generator QR Code Modern & Minimalis

QRCraft adalah aplikasi web berbasis React untuk membuat kode QR dengan desain yang bersih dan antarmuka yang intuitif.

## Fitur
- Berbagai tipe konten: URL, Teks, Email, dan WiFi.
- Kustomisasi warna (QR dan Latar Belakang).
- Kontrol tingkat ketahanan error (Error Correction Level).
- Unduh hasil dalam format PNG dan JPEG resolusi tinggi.
- Desain responsif dan modern dengan Tailwind CSS.

## Struktur Proyek
- `index.html`: Entry point dengan konfigurasi library dan tema.
- `app.js`: Logika utama aplikasi dan manajemen state.
- `components/`: Komponen UI modular (Navbar, Form, Display).

## Troubleshooting
- **QRCode is not defined**: Masalah ini telah diatasi dengan mengakses pustaka melalui `window.QRCode` untuk memastikan kompatibilitas dengan lingkungan Babel standalone.

## Aturan Pemeliharaan
Setiap kali ada pembaruan fitur atau perubahan struktur file, pastikan untuk memperbarui README ini agar tetap relevan dengan kondisi proyek terbaru.
