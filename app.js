import express from 'express';
import medicoRoutes from './routes/medicoRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import consultaRoutes from './routes/consultaRoutes.js';

const app = express();

app.use(express.json());

app.use(medicoRoutes);
app.use(pacienteRoutes);
app.use(consultaRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});