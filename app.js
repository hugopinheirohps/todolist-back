require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const VerificarToken = require('./middlewares/VerificarToken');
const TarefasRouter = require('./routes/TarefasRouter');
const AuthRouter = require('./routes/AuthRouter');
const ValidaToken = require('./middlewares/ValidaToken');

app.use('/api/tarefas', VerificarToken, ValidaToken, TarefasRouter);
app.use('/api/auth', AuthRouter);

app.listen(process.env.PORT, ()=>{console.log(`Servidor rodando na porta ${process.env.PORT}`)});