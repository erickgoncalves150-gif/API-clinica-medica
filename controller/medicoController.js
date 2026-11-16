
import Medico from '../model/Medico.js';
import * as medicoRepository from '../repository/medicoRepository.js';

export async function cadastrarMedico(req, res) {
    try {
        const { nome, crm, especialidade } = req.body;

        const medico = new Medico(nome, crm, especialidade);
        const erro = medico.validar();

        if (erro !== true) {
            return res.status(400).json({ erro: erro });
        }

        const resultado = await medicoRepository.cadastrarMedico(nome, crm, especialidade);

        return res.status(201).json({
            mensagem: 'Médico cadastrado com sucesso',
            id: resultado.insertId
        });

    } catch (erro) {
        if (erro.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'CRM já cadastrado' });
        }

        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function listarMedicos(req, res) {
    try {
        const medicos = await medicoRepository.listarMedicos();
        return res.status(200).json(medicos);

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function buscarMedicoPorId(req, res) {
    try {
        const { id } = req.params;

        if (Medico.validarId(id) !== true) {
            return res.status(400).json({ erro: 'ID inválido' });
        }

        const medico = await medicoRepository.buscarMedicoPorId(id);

        if (medico.length === 0) {
            return res.status(404).json({ erro: 'Médico não encontrado' });
        }

        return res.status(200).json(medico[0]);

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function atualizarMedico(req, res) {
    try {
        const { id } = req.params;

        if (Medico.validarId(id) !== true) {
            return res.status(400).json({ erro: 'ID inválido' });
        }

        const medicoAtual = await medicoRepository.buscarMedicoPorId(id);

        if (medicoAtual.length === 0) {
            return res.status(404).json({ erro: 'Médico não encontrado' });
        }

        const dadosAtuais = medicoAtual[0];

        const nome = req.body.nome ?? dadosAtuais.nome;
        const crm = req.body.crm ?? dadosAtuais.crm;
        const especialidade = req.body.especialidade ?? dadosAtuais.especialidade;

        const medico = new Medico(nome, crm, especialidade);
        const erro = medico.validar();

        if (erro !== true) {
            return res.status(400).json({ erro: erro });
        }

        await medicoRepository.atualizarMedico(id, nome, crm, especialidade);

        return res.status(200).json({
            mensagem: 'Médico atualizado com sucesso'
        });

    } catch (erro) {
        if (erro.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'CRM já cadastrado' });
        }

        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function deletarMedico(req, res) {
    try {
        const { id } = req.params;

        if (Medico.validarId(id) !== true) {
            return res.status(400).json({ erro: 'ID inválido' });
        }

        const medico = await medicoRepository.buscarMedicoPorId(id);

        if (medico.length === 0) {
            return res.status(404).json({ erro: 'Médico não encontrado' });
        }

        await medicoRepository.deletarMedico(id);

        return res.status(200).json({
            mensagem: 'Médico excluído com sucesso'
        });

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}   