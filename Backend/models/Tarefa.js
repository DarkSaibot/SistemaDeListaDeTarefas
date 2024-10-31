// backend/models/Tarefa.js
const db = require('../db');

const Tarefa = {
    criar: (nome, custo, dataLimite, ordem, callback) => {
        db.run(
            `INSERT INTO Tarefas (nome, custo, data_limite, ordem) VALUES (?, ?, ?, ?)`,
            [nome, custo, dataLimite, ordem],
            callback
        );
    },

    listar: (callback) => {
        db.all(`SELECT * FROM Tarefas ORDER BY ordem`, callback);
    },

    atualizar: (id, nome, custo, dataLimite, callback) => {
        db.run(
            `UPDATE Tarefas SET nome = ?, custo = ?, data_limite = ? WHERE id = ?`,
            [nome, custo, dataLimite, id],
            callback
        );
    },

    excluir: (id, callback) => {
        db.run(`DELETE FROM Tarefas WHERE id = ?`, [id], callback);
    },
};

module.exports = Tarefa;
