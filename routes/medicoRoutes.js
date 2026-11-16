import express from 'express';
import * as medicoController from '../controller/medicoController.js';

const router = express.Router();

router.post('/medico', medicoController.cadastrarMedico);

router.get('/medico', medicoController.listarMedicos);

router.get('/medico/:id', medicoController.buscarMedicoPorId);

router.patch('/medico/:id', medicoController.atualizarMedico);

router.delete('/medico/:id', medicoController.deletarMedico);

export default router;