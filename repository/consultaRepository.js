import conexao from '../database/conexao.js';

export async function  cadastrarConsulta(data_hora, motivo, status) {

    const sql = 'INSERT INTO consulta(data_hora, motivo, status_consulta) VALUES(?, ?, ?)';

    const [resultado] = await conexao.execute(sql, [data_hora, motivo, status]);

    return resultado;
}

export async function listarConsultas() {

    const sql = 'SELECT * FROM consulta';

    const [resultado] = await conexao.execute(sql);

    return resultado;
}


export async function buscarConsultaPorId(id) {

    const sql = `
        SELECT
            consulta.*,
            medico.nome AS nome_medico,
            medico.crm,
            medico.especialidade,
            paciente.nome AS nome_paciente,
            paciente.cpf,
            paciente.data_nascimento
        FROM consulta
        LEFT JOIN medico
            ON consulta.fk_id_medico = medico.id_medico
        LEFT JOIN paciente
            ON consulta.fk_id_paciente = paciente.id_paciente
        WHERE consulta.id_consulta = ?
    `;

    const [resultado] = await conexao.execute(sql, [id]);

    return resultado;
}


export async function atualizarConsulta(id, data_hora, motivo, status)  {

    const sql = 'UPDATE consulta SET data_hora = ?, motivo = ?, status_consulta = ? WHERE id_consulta = ?'

    const [resultado] = await conexao.execute(sql, [data_hora, motivo, status, id]);

    return resultado;
}

export async function deletarConsulta(id) {

    const sql = 'DELETE FROM consulta WHERE id_consulta = ?';

    const [resultado] = await conexao.execute(sql, [id]);

    return resultado;
}

export async function vincularMedico(idConsulta, idMedico) {
    const sql = 'UPDATE consulta SET fk_id_medico = ? WHERE id_consulta = ?';

    const [resultado] = await conexao.execute(sql, [idMedico, idConsulta]);

    return resultado;
}

export async function removerMedico(idConsulta) {
    const sql = 'UPDATE consulta SET fk_id_medico = NULL WHERE id_consulta = ?';

    const [resultado] = await conexao.execute(sql, [idConsulta]);

    return resultado;
}

export async function vincularPaciente(idConsulta, idPaciente) {
    const sql = 'UPDATE consulta SET fk_id_paciente = ? WHERE id_consulta = ?';

    const [resultado] = await conexao.execute(sql, [idPaciente, idConsulta]);

    return resultado;
}

export async function removerPaciente(idConsulta) {
    const sql = 'UPDATE consulta SET fk_id_paciente = NULL WHERE id_consulta = ?';

    const [resultado] = await conexao.execute(sql, [idConsulta]);

    return resultado;
}