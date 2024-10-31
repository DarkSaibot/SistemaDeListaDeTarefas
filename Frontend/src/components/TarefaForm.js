// frontend/src/components/TarefaForm.js
import React, { useState, useEffect } from 'react';
import { criarTarefa, atualizarTarefa } from '../services/tarefaService';

const TarefaForm = ({ tarefaEdit, onSave, onCancel }) => {
    const [nome, setNome] = useState('');
    const [custo, setCusto] = useState('');
    const [dataLimite, setDataLimite] = useState('');

    useEffect(() => {
        if (tarefaEdit) {
            setNome(tarefaEdit.nome);
            setCusto(tarefaEdit.custo);
            setDataLimite(tarefaEdit.data_limite);
        }
    }, [tarefaEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const tarefa = { nome, custo: parseFloat(custo), data_limite: dataLimite };

        if (tarefaEdit) {
            atualizarTarefa(tarefaEdit.id, tarefa).then(onSave);
        } else {
            criarTarefa(tarefa).then(onSave);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome da Tarefa:</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div>
                <label>Custo (R$):</label>
                <input type="number" value={custo} onChange={(e) => setCusto(e.target.value)} required />
            </div>
            <div>
                <label>Data Limite:</label>
                <input type="date" value={dataLimite} onChange={(e) => setDataLimite(e.target.value)} required />
            </div>
            <button type="submit">{tarefaEdit ? 'Atualizar' : 'Incluir'}</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

export default TarefaForm;
