const keranjangModel = require('../models/keranjangModel');
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId


exports.input = (data) =>
    new Promise((resolve,reject) => {
        keranjangModel.create(data)
            .then(() => {
                resolve({
                    status:true,
                    msg: 'Berhasil Input Keranjang',
                });
            })
            .catch((err) => {
                reject({
                    status:false,
                    msg: 'Gagal Input Keranjang',
                });
            });
    });

exports.getAllkeranjang = (idUser) =>
    new Promise((resolve,reject) => {
        keranjangModel.aggregate([
            {
                $match: {
                    idUser: objectId(idUser),
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'idUser',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'barangs',
                    localField: 'idBarang',
                    foreignField: '_id',
                    as: 'barang'
                }
            },
            {
                $unwind: '$user',
            },
            {
                $unwind: '$barang',
            }
        ]).then((keranjang) => {
            if (keranjang.length > 0) {
                resolve({
                    status: true,
                    msg: 'Berhasil Memuat Data',
                    data: keranjang,
                });
            } else {
                reject({
                    status: false,
                    msg: 'Tidak Ada Data',
                });
            }
        }).catch((err) => {
            reject({
                status: false,
                msg: 'Terjadi Kesalahan Pada Server',
            });
        });
    });

exports.getKeranjangById = (idKeranjang) =>
new Promise((resolve,reject) => {
    keranjangModel
    .aggregate([
        {
            $match: {_id: objectId(idKeranjang),
            },
        },
        {
            $lookup: {
                from:'users',
                localField:'idUser',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $lookup: {
                from:'barangs',
                localField:'idBarang',
                foreignField: '_id',
                as: 'barang',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $unwind: '$barang',
        },
    ])
    .then((keranjang) => {
        if (keranjang.length > 0) {
            resolve({
                status: true,
                msg: 'Berhasil Memuat Data',
                data: keranjang,
            });
        } else {
            reject({
                status: false,
                msg: 'Tidak Ada Data',
            });
        }
    }).catch((err) => {
        reject({
            status: false,
            msg: 'Terjadi Kesalahan Pada Server',
        });
    });
})

exports.updateKeranjang = (idKeranjang, data) =>
    new Promise((resolve, reject) => {
        keranjangModel
            .updateOne(
                {
                    _id: objectId(idKeranjang), 
                },
                data,
                )
            .then(() => {
                resolve({
                    status: true,
                    msg: 'Berhasil Update data'
                });
            })
            .catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi kesalahan pada server'
                });
            });
});

exports.deleteKeranjang = (idKeranjang) =>
    new Promise((resolve,reject) => {
        keranjangModel
        .deleteOne({
            _id: objectId(idKeranjang),
        })
        .then(() => {
            resolve({
                status:true,
                msg: 'Berhasil Hapus Data',
            });
        })
        .catch((err) => {
            reject({
                status:false,
                msg:'Terjadi Kesalahan Pada Server'
            });
        });
    });