const express = require('express');
const app = express();
const dbConfig = require('./config/db_config')
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbConfig.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { 
    console.log('Terhubung Ke MongoDB');
}).catch((err) => {
    console.log(err);
    console.log('Gagal Terhubung Ke MongoDB');
});

app.use('/gambar-barang', express.static('public/images'))
app.use('/users', require('./routes/userRoutes'));
app.use('/kategori', require('./routes/kategoriRoute'));
app.use('/barang',require('./routes/barangRoute'));
app.use('/keranjang',require('./routes/keranjangRoute'));
app.use('/transaksi', require('./routes/transaksiRoute'));

// app.get('/', function (req, res) {
//   res.send('Hello World');
// });

// app.get('/nama/:nama', (req, res)=> {
//     let nama = req.params.nama;
//     res.send(nama);
//   });

app.listen(3000, () => {
    console.log("Server BISA PORT 3000");
});