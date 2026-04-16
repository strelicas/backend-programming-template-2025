

menambahkan sistem gacha yang di batasi 5 kali per hari

 tersedia endpoint tambahan untuk melihat:

-Riwayat gacha user
 Sisa kuota hadiah
 Daftar pemenang (dengan nama disamarkan)


endpoint 1
gacha (pos)

Digunakan untuk melakukan gacha.

{
  "userId": "daniel"
}

contoh kaalau ga beruntung


{
  "message": "Belum beruntung",
  "reward": null
}


contoh kalau beruntung


{
  "message": "Selamat kamu menang!",
  "reward": "Nama Hadiah"
}

respon jika limit habis


{
  "message": "Limit gacha 5x per hari tercapai"
}


end point 2 (history)

Melihat riwayat gacha berdasarkan user.

url 

GET /api/gacha/history/:userId


contoh

GET /api/gacha/history/daniel


respon

[
  {
    "_id": "...",
    "userId": "daniel",
    "date": "Thu Apr 16 2026",
    "reward": null
  }
]



end point 3

Melihat daftar hadiah dan sisa kuota.



link
GET /api/rewards


respon


[
  {
    "name": "Hadiah A",
    "remaining": 3
  }
]

bonus end point 4

Menampilkan daftar user yang pernah menang (nama disamarkan).

url


GET /api/winners


respon


[
  {
    "user": "d****l",
    "reward": "Pulsa"
  }
]




