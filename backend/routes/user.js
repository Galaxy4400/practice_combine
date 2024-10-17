const express = require('express');
const { getUsers, getRoles, updateUser, deleteUser } = require('../controllers/user.controller');
const hasRole = require('../middlewares/has-role');
const authenticated = require('../middlewares/authenticated');
const mapUser = require('../helpers/map-user');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const users = await getUsers();

		res.send({ error: null, users: users.map(mapUser) });
	} catch (error) {
		res.send({ error: error.message || "Unknown error" });
	}
});

router.get('/roles', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const roles = await getRoles();

		res.send({ error: null, roles });
	} catch (error) {
		res.send({ error: error.message || "Unknown error" });
	}
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		const user = await updateUser(req.params.id, {
			role: req.body.roleId,
		});

		res.send({ error: null, user: mapUser(user) });
	} catch (error) {
		res.send({ error: error.message || "Unknown error" });
	}
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	try {
		await deleteUser(req.params.id);

		res.send({ error: null });
	} catch (error) {
		res.send({ error: error.message || "Unknown error" });
	}
});

module.exports = router;