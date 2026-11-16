import express from 'express';
import * as pacienteController from '../controller/pacienteController.js';

const router = express.Router();

router.post('/paciente', pacienteController.cadastrarPaciente);

router.get('/paciente', pacienteController.listarPacientes);

router.get('/paciente/:id', pacienteController.buscarPacientePorId);

router.patch('/paciente/:id', pacienteController.atualizarPaciente);

router.delete('/paciente/:id', pacienteController.deletarPaciente);

export default router;