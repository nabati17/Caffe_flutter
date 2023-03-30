const transaksiModel = require("../models/transaksiModel");
const keranjangModel = require("../models/keranjangModel");
const barangModel = require("../models/BarangModel");
const objectId = require("mongoose").Types.ObjectId;

exports.inputTransaksi = (data) =>
	new Promise((resolve, reject) => {
		transaksiModel
			.create(data)
			.then(async () => {
				const { detailTransaksi } = data;
				for (let i = 0; i < detailTransaksi.length; i++) {
					await barangModel.updateOne(
						{ _id: objectId(detailTransaksi[i].idBarang) },
						{ $inc: { stok: -Number(detailTransaksi[i].jumlahBeli) } },
					);
					await keranjangModel.deleteOne({
						_id: objectId(detailTransaksi[i]._id),
					});
				}
				resolve({
					status: true,
					msg: "Berhasil transaksi",
				});
			})
			.catch((err) => {
				console.log(err);
				reject({
					status: false,
					msg: "Terjadi Kesalahan pada Server",
				});
			});
	});

exports.getAllTransaksi = () =>
	new Promise((resolve, reject) => {
		transaksiModel
			.aggregate([
				{
					$lookup: {
						from: "users",
						localField: "idUser",
						foreignField: "_id",
						as: "user",
					},
				},
				{ $unwind: "$user" },
			])
			.then((data) => {
				if (data.length > 0) {
					resolve({
						status: true,
						msg: "Berhasil memuat data transaksi",
						data: data,
					});
				} else {
					reject({
						status: false,
						msg: "Data transaksi kosong",
					});
				}
			})
			.catch((err) => {
				reject({
					status: false,
					msg: "Terjadi Kesalahan pada Server",
				});
			});
	});

exports.getTransaksiById = (idTransaksi) =>
	new Promise((resolve, reject) => {
		transaksiModel
			.aggregate([
				{ $match: { _id: objectId(idTransaksi) } },
				{
					$lookup: {
						from: "users",
						localField: "idUser",
						foreignField: "_id",
						as: "user",
					},
				},
				{ $unwind: "$user" },
			])
			.then((data) => {
				if (data.length > 0) {
					resolve({
						status: true,
						msg: "Berhasil memuat data transaksi",
						data: data[0],
					});
				} else {
					reject({
						status: false,
						msg: "Data transaksi kosong",
					});
				}
			})
			.catch((err) => {
				reject({
					status: false,
					msg: "Terjadi Kesalahan pada Server",
				});
			});
	});

exports.getTransaksiByIdUser = (idUser) =>
	new Promise((resolve, reject) => {
		transaksiModel
			.aggregate([
            {
                $match: { idUser: objectId(idUser)},
            },
            {
                $lookup: {
                    from:'users',
                    localField: 'idUser',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            { $unwind: '$user'},
            ])
			.then((data) => {
				if (data.length > 0) {
					resolve({
						status: true,
						msg: "Berhasil memuat data transaksi",
						data: data,
					});
				} else {
					reject({
						status: false,
						msg: "Data transaksi kosong",
					});
				}
			})
			.catch((err) => {
				reject({
					status: false,
					msg: "Terjadi Kesalahan pada Server",
				});
			});
	});

exports.deleteTransaksi = (idTransaksi) =>
	new Promise((resolve, reject) => {
		transaksiModel
			.deleteOne({ _id: objectId(idTransaksi) })
			.then(() => {
				resolve({
					status: true,
					msg: "Berhasil menghapus data transaksi",
				});
			})
			.catch((err) => {
				reject({
					status: false,
					msg: "Terjadi Kesalahan pada Server",
				});
			});
	});