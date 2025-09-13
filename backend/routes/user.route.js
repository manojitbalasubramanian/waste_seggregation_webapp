import express from "express";
const router = express.Router();

router.get('/users', async (req, res) => {
	try {
		const users = await User.find({}, '-password');
		res.json({ users });
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch users' });
	}
});

export default router;