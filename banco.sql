CREATE DATABASE clinica_medica;

USE clinica_medica;


CREATE TABLE medico (
id_medico INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(200) NOT NULL,
crm VARCHAR(6) NOT NULL UNIQUE,
especialidade VARCHAR(200) NOT NULL
);

CREATE TABLE paciente (
id_paciente INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(200) NOT NULL,
cpf VARCHAR(11) NOT NULL UNIQUE,
data_nascimento DATE NOT NULL
);

CREATE TABLE consulta (
id_consulta INT PRIMARY KEY AUTO_INCREMENT,
data_hora DATETIME NOT NULL,
motivo VARCHAR(150) NOT NULL,
status_consulta ENUM( 'rascunho', 'agendada', 'concluida', 'cancelada') NOT NULL,
fk_id_medico INT NULL,
fk_id_paciente INT NULL,

FOREIGN KEY(fk_id_medico)
REFERENCES medico(id_medico)
ON DELETE SET NULL
ON UPDATE CASCADE,

FOREIGN KEY(fk_id_paciente) 
REFERENCES paciente(id_paciente)
ON DELETE SET NULL
ON UPDATE CASCADE
);