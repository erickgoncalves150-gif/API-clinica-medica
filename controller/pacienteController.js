import Paciente from '../model/Paciente.js';
import * as pacienteRepository from '../repository/pacienteRepository.js';

export async function cadastrarPaciente(req, res) {
    try {
        const { nome, cpf, data_nascimento } = req.body;

        const paciente = new Paciente(nome, cpf, data_nascimento);
        const erro = paciente.validar();

        if (erro !== true) {
            return res.status(400).json({ erro: erro });
        }

        const resultado = await pacienteRepository.cadastrarPaciente(
            nome,
            cpf,
            data_nascimento
        );

        return res.status(201).json({
            mensagem: 'Paciente cadastrado com sucesso',
            id: resultado.insertId
        });

    } catch (erro) {
        if (erro.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'CPF já cadastrado' });
        }

        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function listarPacientes(req, res) {
    try {
        const pacientes = await pacienteRepository.listarPacientes();

        return res.status(200).json(pacientes);

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function buscarPacientePorId(req, res) {
    try {
        const { id } = req.params;

        if (Paciente.validarId(id) !== true) {
            return res.status(400).json({ erro: 'ID inválido' });
        }

        const paciente = await pacienteRepository.buscarPacientePorId(id);

        if (paciente.length === 0) {
            return res.status(404).json({ erro: 'Paciente não encontrado' });
        }

        return res.status(200).json(paciente[0]);

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function atualizarPaciente(req, res) {
    try {
        const { id } = req.params;

        if (Paciente.validarId(id) !== true) {
            return res.status(400).json({ erro: 'ID inválido' });
        }

        const pacienteAtual = await pacienteRepository.buscarPacientePorId(id);

        if (pacienteAtual.length === 0) {
            return res.status(404).json({ erro: 'Paciente não encontrado' });
        }

        const dadosAtuais = pacienteAtual[0];

        const nome = req.body.nome ?? dadosAtuais.nome;
        const cpf = req.body.cpf ?? dadosAtuais.cpf;

        const data_nascimento = req.body.data_nascimento ?? dadosAtuais.data_nascimento;

        const paciente = new Paciente(nome, cpf, data_nascimento);
        const erro = paciente.validar();

        if (erro !== true) {
            return res.status(400).json({ erro: erro });
        }

        await pacienteRepository.atualizarPaciente(
            id,
            nome,
            cpf,
            data_nascimento
        );

        return res.status(200).json({
            mensagem: 'Paciente atualizado com sucesso'
        });

    } catch (erro) {
        if (erro.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ erro: 'CPF já cadastrado' });
        }

        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

export async function deletarPaciente(req, res) {
    try {
        const { id } = req.params;

        if (Paciente.validarId(id) !== true) {
            return res.status(400).json({ erro: 'ID inválido' });
        }

        const paciente = await pacienteRepository.buscarPacientePorId(id);

        if (paciente.length === 0) {
            return res.status(404).json({ erro: 'Paciente não encontrado' });
        }

        await pacienteRepository.deletarPaciente(id);

        return res.status(200).json({
            mensagem: 'Paciente excluído com sucesso'
        });

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}