import conexao from '../database/conexao.js'

export async function cadastrarPaciente(nome, cpf, data_nascimento) {
    
    const sql = 'INSERT INTO paciente (nome, cpf, data_nascimento) VALUES (?, ?, ?)';

    const [resultado] = await conexao.execute(sql, [nome, cpf, data_nascimento]);

    return resultado;
}

export async function listarPacientes() {

    const sql = 'SELECT *  FROM paciente'

    const [resultado] = await conexao.execute(sql);

    
    return resultado;
}

export async function buscarPacientePorId(id) {

    const sql = 'SELECT * FROM paciente WHERE id_paciente = ?';

    const [resultado] = await conexao.execute(sql, [id]);

    return resultado;
}

export async function atualizarPaciente(id, nome, cpf, data_nascimento) {

    const sql = 'UPDATE paciente SET nome = ?, cpf = ?, data_nascimento =  ? WHERE id_paciente = ?';

    const [resultado] = await conexao.execute(sql, [nome, cpf, data_nascimento, id]);

    return resultado;
    
}

export async function deletarPaciente(id) {

    const sql = 'DELETE FROM paciente WHERE id_paciente = ?';

    const [resultado] = await conexao.execute(sql, [id]);

    return resultado;
}