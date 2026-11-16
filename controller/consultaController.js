
import Consulta from '../model/Consulta.js';
import * as consultaRepository from '../repository/consultaRepository.js';
import Medico from '../model/Medico.js';
import * as medicoRepository from '../repository/medicoRepository.js';
import Paciente from '../model/Paciente.js';
import * as pacienteRepository from '../repository/pacienteRepository.js';


export async function cadastrarConsulta(req, res) {
    try {
        const { data_hora, motivo, status } = req.body;

        const consulta = new Consulta(data_hora, motivo, status);
        const erro = consulta.validar();

        if (erro !== true) {
            return res.status(400).json({ erro: erro });
        }

        const resultado = await consultaRepository.cadastrarConsulta(data_hora, motivo, status);

        return res.status(201).json({
            mensagem: 'Consulta cadastrada com sucesso',
            id: resultado.insertId
        });

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function listarConsultas(req, res) {
    try {
        const consultas = await consultaRepository.listarConsultas();

        return res.status(200).json(consultas);

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function buscarConsultaPorId(req, res) {
    try {
        const { id } = req.params;

        if (Consulta.validarId(id) !== true) {
            return res.status(400).json({ erro: 'ID inválido' });
        }

        const consulta = await consultaRepository.buscarConsultaPorId(id);

        if (consulta.length === 0) {
            return res.status(404).json({ erro: 'Consulta não encontrada' });
        }

        return res.status(200).json(consulta[0]);

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function atualizarConsulta(req, res) {
    try {
        const { id } = req.params;

        if (Consulta.validarId(id) !== true) {
            return res.status(400).json({ erro: 'ID inválido' });
        }

        const consultaAtual = await consultaRepository.buscarConsultaPorId(id);

        if (consultaAtual.length === 0) {
            return res.status(404).json({ erro: 'Consulta não encontrada' });
        }

        const dadosAtuais = consultaAtual[0];

        const data_hora = req.body.data_hora ?? dadosAtuais.data_hora;
        const motivo = req.body.motivo ?? dadosAtuais.motivo;
        const status = req.body.status ?? dadosAtuais.status_consulta;

        const consulta = new Consulta(data_hora, motivo, status);
        const erro = consulta.validar();

        if (erro !== true) {
            return res.status(400).json({ erro: erro });
        }

        await consultaRepository.atualizarConsulta(id, data_hora, motivo, status);

        return res.status(200).json({
            mensagem: 'Consulta atualizada com sucesso'
        });

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function deletarConsulta(req, res) {
    try {
        const { id } = req.params;

        if (Consulta.validarId(id) !== true) {
            return res.status(400).json({ erro: 'ID inválido' });
        }

        const consulta = await consultaRepository.buscarConsultaPorId(id);

        if (consulta.length === 0) {
            return res.status(404).json({ erro: 'Consulta não encontrada' });
        }

        await consultaRepository.deletarConsulta(id);

        return res.status(200).json({
            mensagem: 'Consulta excluída com sucesso'
        });

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function vincularMedico(req, res) {
    try {
        const { idConsulta, idMedico } = req.params;

        if(Consulta.validarId(idConsulta) !== true || Medico.validarId(idMedico) !== true) {
            return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        const consulta = await consultaRepository.buscarConsultaPorId(idConsulta);

        if (consulta.length === 0) {
            return res.status(404).json({
                erro: 'Consulta não encontrada'
    });
        }

        const medico = await medicoRepository.buscarMedicoPorId(idMedico);

        if (medico.length === 0) {
            return res.status(404).json({
                erro: 'Médico não encontrado'
            });
        }

        await consultaRepository.vincularMedico(idConsulta, idMedico);

        return res.status(200).json({
            mensagem: 'Médico vinculado à consulta com sucesso'
        });
        

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({
            erro: 'Erro interno do servidor'
        });
    }
}

export async function removerMedico(req, res) {
    try {
        const { idConsulta } = req.params;

        if(Consulta.validarId(idConsulta) !== true) {
          return res.status(400).json({
                erro: 'ID inválido'
            });
        }

        const consulta = await consultaRepository.buscarConsultaPorId(idConsulta);

        if (consulta.length === 0) {
            return res.status(404).json({
                erro: 'Consulta não encontrada'
            });
        }
        
        await consultaRepository.removerMedico(idConsulta);

        return res.status(200).json({
            mensagem: 'Médico removido da consulta com sucesso'
        });

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({
            erro: 'Erro interno do servidor'
        });
    }
}

export async function vincularPaciente(req, res) {
    try {
        const { idConsulta, idPaciente } = req.params;

        if(Consulta.validarId(idConsulta) !== true || Paciente.validarId(idPaciente) !== true) {
            return res.status(400).json({ erro: 'ID inválido' });
        }

        const consulta = await consultaRepository.buscarConsultaPorId(idConsulta);

        if(consulta.length === 0) {
            return res.status(404).json({ erro: 'Consulta não encontrada' });
        }

        const paciente = await pacienteRepository.buscarPacientePorId(idPaciente);
        
        if(paciente.length === 0) {
            return res.status(404).json({ erro: 'Paciente não encontrado' });
        }

        await consultaRepository.vincularPaciente(idConsulta, idPaciente);

        return res.status(200).json({
            mensagem: 'Paciente vinculado à consulta com sucesso'
        });

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function removerPaciente(req, res) {
    try {
        const { idConsulta } = req.params;

        if(Consulta.validarId(idConsulta) !== true) {
            return res.status(400).json({ erro: 'ID inválido' });
        }

        const consulta = await consultaRepository.buscarConsultaPorId(idConsulta);

        if(consulta.length === 0) {
            return res.status(404).json({ erro: 'Consulta não encontrada' });
        }

        await consultaRepository.removerPaciente(idConsulta);

        return res.status(200).json({
            mensagem: 'Paciente removido da consulta com sucesso'
        });

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}