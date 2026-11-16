class Paciente {
    constructor(nome, cpf, data_nascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
    }

    validar() {
        const dataTexto = String(this.data_nascimento);

        if (!this.nome || this.nome.length < 3) {
            return 'O nome precisa ter pelo menos 3 caracteres';
        }

        if (!this.cpf || !/^\d{11}$/.test(this.cpf)) {
            return 'CPF deve conter exatamente 11 números';
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(dataTexto)) {
            return 'Data de nascimento inválida';
        }

        const [ano, mes, dia] = dataTexto.split('-').map(Number);

        const data = new Date(ano, mes - 1, dia);

        if (
            data.getFullYear() !== ano ||
            data.getMonth() !== mes - 1 ||
            data.getDate() !== dia
        ) {
            return 'Data de nascimento inválida';
        }

        const hoje = new Date();

        if (data > hoje) {
            return 'A data de nascimento não pode estar no futuro';
        }

        return true;
    }

    static validarId(id) {
        return Number.isInteger(Number(id)) && Number(id) > 0;
    }
}

export default Paciente;