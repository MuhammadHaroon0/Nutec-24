const passport = require("passport");
const express = require("express");
const { signToken } = require("./jwt");
const userModel = require("../models/userModel");
const router = express.Router();

// Route for authentication
router.get('/api/v1/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Callback route after authentication
router.get('/api/v1/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/api/v1/fail' }),
    async function (req, res) {
        // Successful authentication, redirect home or set cookie and redirect
        // For example, setting token as a cookie

        let found = await userModel.findOne({ email: req.user.email })
        if (!found) {
            found = await userModel.create({
                email: req.user.email,
                authMethod: 'google',
                name: req.user.displayName,
                active: true,
                accountType: "user",
                approve: true
            })
        }
        found.active = true;
        await found.save()
        const token = signToken(found._id, res)
        return res.status(200).json({
            status: "success",
            token: token,
            data: {
                name: found.name,
                id: found._id,
                accountType: found.accountType,
            },
        });
    }
);
module.exports = router