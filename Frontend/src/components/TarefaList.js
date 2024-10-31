// frontend/src/components/TarefaList.js
import React, { useState, useEffect } from 'react';
import { listarTarefas, excluirTarefa, atualizarTarefa } from '../services/tarefaService';
import TarefaForm from './TarefaForm';

const TarefaList = () => {
    const [tarefas, setTarefas] = useState([]);
    const [editandoTarefa, setEditandoTarefa] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        atualizarLista();
    }, []);

    const atualizarLista = () => {
        listarTarefas().then((res) => setTarefas(res.data));
    };

    const handleExcluir = (id) => {
        if (window.confirm('Deseja excluir esta tarefa?')) {
            excluirTarefa(id).then(() => {
                atualizarLista();
            });
        }
    };

    const handleEditar = (tarefa) => {
        setEditandoTarefa(tarefa);
        setMostrarFormulario(true);
    };

    const handleSalvar = () => {
        atualizarLista();
        setMostrarFormulario(false);
        setEditandoTarefa(null);
    };

    const handleIncluir = () => {
        setMostrarFormulario(true);
        setEditandoTarefa(null);
    };

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <ul>
                {tarefas.map((tarefa) => (
                    <li key={tarefa.id} style={{ background: tarefa.custo >= 1000 ? 'yellow' : 'white' }}>
                        {tarefa.nome} - R$ {tarefa.custo} - {tarefa.data_limite}
                        <button onClick={() => handleEditar(tarefa)}>Editar</button>
                        <button onClick={() => handleExcluir(tarefa.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleIncluir}>Incluir Tarefa</button>
            {mostrarFormulario && (
                <TarefaForm
                    tarefaEdit={editandoTarefa}
                    onSave={handleSalvar}
                    onCancel={() => setMostrarFormulario(false)}
                />
            )}
        </div>
    );
};

export default TarefaList;
