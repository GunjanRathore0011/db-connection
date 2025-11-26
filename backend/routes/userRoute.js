import express from 'express';
const router=express.Router();

import { addContact, getContact, deleteContact, updateContact } from '../controller/userController.js';
import { authenticateToken } from '../middleware/auth.js';

router.post('/add',authenticateToken, addContact);
router.delete('/remove/:id',authenticateToken, deleteContact);
router.get('/get',authenticateToken,getContact);
router.put('/update/:id',authenticateToken,updateContact);

export default router ; 