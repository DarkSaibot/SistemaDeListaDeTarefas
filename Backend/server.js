// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Tarefa = require('./models/Tarefa');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/tarefas', (req, res) => {
    Tarefa.listar((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/tarefas', (req, res) => {
    const { nome, custo, data_limite } = req.body;
    Tarefa.criar(nome, custo, data_limite, Date.now(), (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ message: 'Tarefa criada!' });
    });
});

app.put('/tarefas/:id', (req, res) => {
    const { nome, custo, data_limite } = req.body;
    Tarefa.atualizar(req.params.id, nome, custo, data_limite, (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Tarefa atualizada!' });
    });
});

app.delete('/tarefas/:id', (req, res) => {
    Tarefa.excluir(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Tarefa excluída!' });
    });
});

app.listen(3001, () => {
    console.log('Backend rodando na porta 3001');
});
// Nova rota para reordenar tarefas
app.put('/tarefas/reorder', (req, res) => {
    const { orderedTasks } = req.body;
    const updatePromises = orderedTasks.map((task, index) => {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE Tarefas SET ordem = ? WHERE id = ?`,
                [index + 1, task.id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });
    });

    Promise.all(updatePromises)
        .then(() => res.json({ message: 'Ordem das tarefas atualizada!' }))
        .catch((err) => res.status(500).json({ error: err.message }));
});

