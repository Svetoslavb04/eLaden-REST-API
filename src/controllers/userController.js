const router = require('express').Router();

const { register, login, refreshToken } = require('../services/authService');

const { OnlyAuthenticated } = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {

    const { email, username, password } = req.body;

    try {

        const user = await register(email, username, password);
        res.json(user);

    } catch (error) {

        res.status(500).json(error);

    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(500).json({ message: 'Email and password are required' })

    }

    try {

        const user = await login(email, password);

        res.cookie('x-token', user.accessToken, {
            maxAge: Number(process.env.tokenExpirationIn) * 1000
        });
        res.cookie('refreshToken', user.refreshToken, {
            maxAge: Number(process.env.refreshtokenExpirationIn) * 1000,
            httpOnly: true
        });

        const userMinified = {
            email: user.email,
            username: user.username,
            _id: user._id,
        };

        res.json(userMinified);

    } catch (error) {

        res.status(error.status).json(error);

    }
});

router.get('/refreshToken', async (req, res) => {

    const token = req.cookies['refreshToken'];

    try {
        const xToken = await refreshToken(token);

        return res.cookie('x-token', xToken, {
            maxAge: Number(process.env.tokenExpirationIn) * 1000
        }).end();

    } catch (error) {

        return res.status(error.status).json(error);

    }
});

router.get('/apples', OnlyAuthenticated, (req, res) => {
    res.json('asd')
})

module.exports = router;
