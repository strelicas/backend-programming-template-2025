# 🎰 Gacha API (Backend Programming)

## 📌 Deskripsi

Project ini merupakan implementasi API sederhana untuk fitur **gacha (random hadiah)**.
User dapat melakukan gacha dengan batas maksimal **5 kali per hari**, dan hasilnya bisa berupa menang (mendapat hadiah) atau kalah.

Selain itu, tersedia endpoint tambahan untuk melihat:

- Riwayat gacha user
- Sisa kuota hadiah
- Daftar pemenang (dengan nama disamarkan)

---

## ⚙️ Teknologi

- Node.js
- Express.js
- MongoDB (Mongoose)

---

## 🚀 Base URL

```
http://localhost:5000/api
```

---

## 🎯 Endpoint

### 1. Gacha (POST)

Digunakan untuk melakukan gacha.

**URL**

```
POST /api/gacha
```

**Body (JSON)**

```json
{
  "userId": "daniel"
}
```

**Response (contoh kalah)**

```json
{
  "message": "Belum beruntung",
  "reward": null
}
```

**Response (jika menang)**

```json
{
  "message": "Selamat kamu menang!",
  "reward": "Nama Hadiah"
}
```

**Response jika limit tercapai**

```json
{
  "message": "Limit gacha 5x per hari tercapai"
}
```

---

### 2. History Gacha (GET)

Melihat riwayat gacha berdasarkan user.

**URL**

```
GET /api/gacha/history/:userId
```

**Contoh**

```
GET /api/gacha/history/daniel
```

**Response**

```json
[
  {
    "_id": "...",
    "userId": "daniel",
    "date": "Thu Apr 16 2026",
    "reward": null
  }
]
```

---

### 3. Rewards (GET)

Melihat daftar hadiah dan sisa kuota.

**URL**

```
GET /api/rewards
```

**Response**

```json
[
  {
    "name": "Hadiah A",
    "remaining": 3
  }
]
```

---

### 4. Winners (GET)

Menampilkan daftar user yang pernah menang (nama disamarkan).

**URL**

```
GET /api/winners
```

**Response**

```json
[
  {
    "user": "d****l",
    "reward": "Pulsa"
  }
]
```

---

## 🧪 Pengujian (Echo API)

Pengujian dilakukan menggunakan Echo API dengan hasil:

- Endpoint `/gacha` berhasil dijalankan (status 200)
- Limit 5x per hari berjalan dengan benar (status 400 jika melebihi)
- History berhasil menampilkan data
- Rewards dan Winners berhasil diakses

---

## ⚠️ Catatan

- User hanya bisa melakukan gacha maksimal 5 kali per hari
- Sistem menggunakan random untuk menentukan menang/kalah
- Data disimpan ke MongoDB

---

## 📌 Kesimpulan

API ini berhasil mengimplementasikan:

- Sistem gacha dengan limit harian
- Penyimpanan history
- Pengelolaan reward dengan kuota
- Endpoint tambahan untuk monitoring data

---
