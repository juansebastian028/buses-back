const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const { generarJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		// Verificar si el email existe
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				msg: "User / Password no son correctos - email",
			});
		}
		// SI el user está activo
		if (!user.estado) {
			return res.status(400).json({
				msg: "User / Password no son correctos - estado: false",
			});
		}
		// Verificar la contraseña
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: "User / Password no son correctos - password",
			});
		}
		// Generar el JWT
		const token = await generarJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Hable con el administrador",
		});
	}
};

const googleSignin = async (req, res = response) => {
	const { id_token } = req.body;

	try {
		const { email, name, img } = await googleVerify(id_token);
		let user = await User.findOne({ email });

		if (!user) {
			// Tengo que crearlo
			const data = {
				name,
				email,
				password: ":P",
				img,
				google: true,
			};

			user = new User(data);
			await user.save();
		}

		// Si el user en DB
		if (!user.estado) {
			return res.status(401).json({
				msg: "Hable con el administrador, user bloqueado",
			});
		}
		// Generar el JWT
		const token = await generarJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		res.status(400).json({
			msg: "Token de Google no es válido",
		});
	}
};

module.exports = {
	login,
	googleSignin,
};
