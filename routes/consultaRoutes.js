import express from 'express';
import * as consultaController from '../controller/consultaController.js';

const router = express.Router();

router.post('/consulta', consultaController.cadastrarConsulta);

router.get('/consulta', consultaController.listarConsultas);

router.get('/consulta/:id', consultaController.buscarConsultaPorId);

router.patch('/consulta/:id', consultaController.atualizarConsulta);

router.delete('/consulta/:id', consultaController.deletarConsulta);

router.patch('/consulta/:idConsulta/medico/:idMedico', consultaController.vincularMedico);

router.patch('/consulta/:idConsulta/remover-medico', consultaController.removerMedico);

router.patch('/consulta/:idConsulta/paciente/:idPaciente', consultaController.vincularPaciente);

router.patch('/consulta/:idConsulta/remover-paciente', consultaController.removerPaciente);

export default router;