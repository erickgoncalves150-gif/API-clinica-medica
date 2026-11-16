class Consulta{
    constructor(data_hora, motivo, status) {
         this.data_hora = data_hora;
        this.motivo = motivo;
        this.status = status;
    }

    validar() {
        
        const data = new Date(this.data_hora);

        if (!this.data_hora || isNaN(data.getTime())) {
            return 'Data e hora da consulta inválidas';
        }

    if (!this.motivo || this.motivo.length < 5) {
            return 'O motivo deve conter no mínimo 5 caracteres';
        }

    const statusPermitidos = [
            'rascunho',
            'agendada',
            'concluida',
            'cancelada'
        ];
    
    if (!statusPermitidos.includes(this.status)) {
            return 'Status inválido';

        }
    return true;
    }
    
    static validarId(id) {
        return Number.isInteger(Number(id)) && Number(id) > 0;
    }
}

export default Consulta;