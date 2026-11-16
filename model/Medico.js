class Medico{
    constructor(nome, crm, especialidade) {
        this.nome = nome;
        this.crm = crm;
        this.especialidade = especialidade;
    }

    validar() {
        if(!this.nome || this.nome.length < 3) {
            return 'O nome precisa ter pelo menos 3 caracteres'
        }

        if(!this.crm) {
            return 'O CRM é obrigatório'
        }

        if(!this.especialidade || this.especialidade.length < 3) {
            return 'A especialidade precisa ter pelo menos 3 caracteres'
        }

        return true;
    }

    static validarId(id) {
        return Number.isInteger(Number(id)) && Number(id) > 0;
    }
}

export default Medico;