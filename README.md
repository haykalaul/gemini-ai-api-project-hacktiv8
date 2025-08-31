# gemini-flash-api

Sebuah API kecil menggunakan library resmi Google GenAI untuk berinteraksi dengan model Gemini (gemini-2.5-flash). Implementasi utama ada di [index.js](index.js) yang menggunakan class [`GoogleGenAI`](index.js) dan helper [`extractText`](index.js).

## Fitur
- Generate text murni (/generate-text)
- Generate response dari image (/generate-from-image)
- Generate response dari dokumen (/generate-from-document)
- Generate/transkrip dari audio (/generate-from-audio)

Lihat implementasi endpoint di [index.js](index.js).

## Prasyarat
- Node.js (versi modern yang mendukung ES modules)
- API key Gemini di environment variable `GEMINI_API_KEY`

## Setup
1. Clone atau tempatkan repo di mesin Anda.
2. Install dependensi:
   ```sh
   npm install
   ```
   Konfigurasi dependensi ada di [package.json](package.json).

3. Buat file `.env` di root (tidak ikut versi kontrol karena `.gitignore`) dan tambahkan:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Jalankan server:
   ```sh
   node index.js
   ```
   Server akan berjalan di http://localhost:3000

## Endpoint & contoh penggunaan

1. Generate text
   - URL: POST /generate-text
   - Body (JSON): { "prompt": "Tulis ringkasan tentang X" }
   - Contoh:
     ```sh
     curl -X POST http://localhost:3000/generate-text \
       -H "Content-Type: application/json" \
       -d '{"prompt":"Halo, buatkan puisi singkat"}'
     ```

2. Generate dari image
   - URL: POST /generate-from-image
   - Form field: `image` (file), `prompt` (text)
   - Contoh:
     ```sh
     curl -X POST http://localhost:3000/generate-from-image \
       -F "image=@/path/to/file.jpg" \
       -F "prompt=Jelaskan gambar ini"
     ```

3. Generate dari dokumen
   - URL: POST /generate-from-document
   - Form field: `document` (file), `prompt` (opsional)
   - Contoh:
     ```sh
     curl -X POST http://localhost:3000/generate-from-document \
       -F "document=@/path/to/doc.pdf" \
       -F "prompt=Ringkas dokumen ini"
     ```

4. Generate dari audio
   - URL: POST /generate-from-audio
   - Form field: `audio` (file), `prompt` (opsional)
   - Contoh:
     ```sh
     curl -X POST http://localhost:3000/generate-from-audio \
       -F "audio=@/path/to/audio.mp3" \
       -F "prompt=Transkripkan audio ini"
     ```

## Catatan teknis
- Upload handling menggunakan `multer` (lihat [index.js](index.js)).
- Respon dari model diekstrak menggunakan helper [`extractText`](index.js). Jika format respons berubah, fungsi ini mungkin perlu diperbaruan.
- Pastikan kunci API valid dan memiliki akses ke model `gemini-2.5-flash`.

## Troubleshooting
- Jika server tidak mulai: periksa Node.js versi dan error pada console.
- Jika ada error dari API: periksa nilai `GEMINI_API_KEY` dan kuota/izin di akun Google Anda.

## Lisensi
Proyek ini memakai dependensi sebagaimana tercantum di [package.json](package.json)