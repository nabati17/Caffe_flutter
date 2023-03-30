const barangModel = require('../models/BarangModel')
const mongoose = require('mongoose');
const { promise, reject } = require('bcrypt/promises');
const objectId = mongoose.Types.ObjectId

exports.input = (data) =>
    new Promise((resolve,reject) => {
        barangModel.create(data)
        .then(() => {
            resolve({
                status:true,
                msg: 'Berhasil Input Barang'
            });
        }).catch((err) => {
            reject({
                status: false,
                msg: 'Terjadi kesalahan Pada Server'
            });
        });
    });

exports.getAllMenu = () => 
    new Promise((resolve, reject) => {
        barangModel.aggregate([
            {
                $lookup: {
                from: 'kategoris',
                localField: 'idKategori',
                foreignField: '_id',
                as: 'kategoriBarang'
            },
        },
        {
            $unwind: '$kategoriBarang',
        },
    ]).then((barangs) => {
        if(barangs.length > 0) {
            resolve({
            status: true,
            msg: 'Berhasil Memuat Data',
            data: barangs
            })
        } else {
            reject({
                status:false,
                msg :'Tidak Ada Data'
            })
        }
    }).catch((err) => {
        reject({
            status: false,
            msg: 'Terjadi Kesalahan Pada Server'
        });
    });
});

exports.getBarangById = (idBarang) =>
new Promise((resolve, reject) => {
    barangModel.aggregate([
        {
            $match: { _id: objectId(idBarang)},
        },
        {
            $lookup: {
            from: 'kategoris',
            localField: 'idKategori',
            foreignField: '_id',
            as: 'kategoriBarang'
        },
    },
    {
        $unwind: '$kategoriBarang',
    },
]).then((barangs) => {
    if(barangs.length > 0) {
        resolve({
        status: true,
        msg: 'Berhasil Memuat Data',
        data: barangs[0],
        })
    } else {
        reject({
            status:false,
            msg :'Tidak Ada Data'
        })
    }
}).catch((err) => {
    reject({
        status: false,
        msg: 'Terjadi Kesalahan Pada Server'
    });
});
});

exports.update = (idBarang,data) =>
new Promise((resolve, reject) => {
    barangModel.updateOne({_id: objectId(idBarang)},data)
    .then(() => {
        resolve({
            status: true,
            msg: 'Berhasil Merubah Data',
        });
    }).catch((err) => {
        reject({
            status:false,
            msg: 'Terjadi Kesalahan Pada Server'
        });
    });
});

exports.deleteData = (idBarang) =>
    new Promise((resolve, reject) => {
        barangModel.deleteOne({ _id: objectId(idBarang) })
        .then(() => {
            resolve({
                status: true,
                msg:'Barang Berhasil Di Hapus',
            });
        })
        .catch((err) => {
            reject({
                status: false,
                msg:'Terjadi Kesalahan Pada Server',
            });
        });
    });