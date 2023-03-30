const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.registrasi = (data) =>
    new Promise((resolve, reject) => {

        userModel.findOne({email:data.email})
            .then( async (user) => {
                if(user) {
                    reject({
                        status: false,
                        msg: 'email sudah terdaftar, Silakan Gunakan Email yang lain ',
                    });
                } else {

                    const saltRounds = 10;
                    const hash = await bcrypt.hash(data.password, saltRounds);
                    data.password = hash;
                    userModel.create(data)
                        .then(() => {
                            resolve({
                                status: true,
                                msg: 'Berhasil Registrasi',
                            });
                        })
                        .catch((err) => {
                            reject({
                                status:false,
                                msg: 'Terjadi Kesalahan Pada Server',
                            });
                        });      
                }
            });
    });

    exports.login = (data) =>
        new Promise((resolve, reject) => {
            userModel.findOne({userName: data.userName})
            .then( async (user) => {
                if(user) {
                    const isValid = await bcrypt.compare(data.password, user.password);
                    if (isValid) {
                        resolve({
                           status: true,
                           msg: "Berhasil login",
                           data: user,
                        });
                    } else {
                        reject({
                            status: false,
                            msg: "password anda salah",
                        });
                    }
                  } else {
                    reject({
                        status: false,
                        msg: "userName anda tidak terdaftar",
                    });
                  }
             })
             .catch((err) => {
                reject({
                    status: false,
                    msg: "Terjadi kesalahan pada server",
                });
             });
        });