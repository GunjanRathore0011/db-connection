import express from 'express';
const router=express.Router();

import { addContact, getContact, deleteContact, updateContact } from '../controller/userController.js';

router.post('/add', addContact);
router.delete('/remove/:id', deleteContact);
router.get('/get',getContact);
router.put('/update/:id',updateContact);

export default router ; 