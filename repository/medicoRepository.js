import conexao from '../database/conexao.js';

export async function cadastrarMedico(nome, crm, especialidade) {

    const sql = 'INSERT INTO medico (nome, crm, especialidade) VALUES (?, ?, ?)';

    const [resultado] = await conexao.execute(sql, [nome, crm, especialidade]);

    return resultado;
}

export async function listarMedicos() {

   const sql = 'SELECT * FROM medico'

    const [resultado] = await conexao.execute(sql);

    return resultado;
}

export async function buscarMedicoPorId(id) {

   const sql = 'SELECT * FROM medico WHERE id_medico = ?';

   const [resultado] = await conexao.execute(sql, [id]);

   return resultado;
}


export async function atualizarMedico(id, nome, crm, especialidade) {

    const sql = 'UPDATE medico SET nome = ?, crm = ?, especialidade = ? WHERE id_medico = ?'

     const [resultado] = await conexao.execute(sql, [nome, crm, especialidade, id]);

     return resultado;
}


export async function deletarMedico(id) {

    const sql = 'DELETE FROM medico WHERE id_medico = ?'

    const [resultado] = await conexao.execute(sql, [id]);
    
     return resultado;
}