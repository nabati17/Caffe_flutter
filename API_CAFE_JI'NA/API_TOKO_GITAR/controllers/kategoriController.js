const kategoriModel = require('../models/kategoriModel')
const objectId = require('mongoose').Types.ObjectId

exports.input = (data) =>
    new Promise((resolve, reject) => {
        kategoriModel.create(data)
            .then(() => {
                resolve({
                    status: false,
                    msg: 'Berhasil Menambah Kategori',
                });
            })
            .catch((err) => {
                reject({
                    status: false,
                    msg: 'Terjadi Kesalahan Pada Server',
                });
            })
    })

   
    exports.getAllkategori = () =>
        new Promise((resolve, reject) => {
            kategoriModel
            .find()
            .then((kategoris) => {
                    if(kategoris.length > 0) {
                        resolve({
                            state: true,
                            msg: "Berhasil memuat data",
                            data: kategori,
                        });
                    } else {
                        reject({
                            status: false,
                            msg: "Tidak ada data", 
                        })
                    }
                }).catch((err) => {
                    reject({
                        status: false, 
                        msg: "Terjadi kesalahan pada server"
                    })
                });
        });

exports.getKategoriById = (idKategori) =>
    new Promise((resolve,reject) => {
        kategoriModel.findOne({_id: objectId(idKategori)})
        .then((kategori) => {
            if(kategori) {
                resolve({
                    status: true,
                    msg :'Berhasil Memuat Data',
                    data: kategori,
                })
            } else {
                reject({
                    status: false,
                    msg: 'Kategori Tidak Ditemukan'
                })
            }
        }).catch((err) => {
            reject({
                status: false,
                msg: 'Terjadi Kesalahan Pada Server',
            });
        });
    });

exports.update = (idKategori,data) =>
    new Promise((resolve,reject) => {
        kategoriModel.updateOne({_id: objectId(idKategori)}, data)
            .then(() => {
                resolve({
                status: true,
                msg: 'Data Berhasil Di Update',
            });
    }).catch((err) => {
        reject({
            status:false,
            msg: 'Terjadi Kesalahan Pada Server',
        })
    });
});

exports.delete = (idKategori) =>
    new Promise((resolve,reject) => {
        kategoriModel.deleteOne({_id: objectId(idKategori)})
            .then(() => {
                resolve({
                    status: true,
                    msg: 'Data Berhasil Di Hapus',
                })
            }).catch((err) => {
                reject({
                    status: false,
                    msg: 'terjadi kesalahan Pada Server',
                })
            })
    })