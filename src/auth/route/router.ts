import { Router } from "express";
import {  signUp } from "../sign-up";
import { login } from "../login/login-with-email";
import { loginWithPhoneNumber } from "../login/login-with-phone-number";
import { resetPassword, sendReset } from "../reset/reset";
import { logOut } from "../logout";

const router = Router()
router.post('/sign-up',signUp)
router.post('/login',login)
router.post('/login-with-phone-number',loginWithPhoneNumber)
router.post('/send-reset-otp',sendReset)
router.post('/reset-password',resetPassword)
router.post('/log-out',logOut)

export default router