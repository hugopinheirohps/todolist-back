const filePath = '../database/tarefas.json';
const tarefas = require(filePath);

function save(email, tarefas){
    let fs = require('fs');
    let path = require('path');

    const filePath = `../database/${email}-tarefas.json`;
 
    fs.writeFileSync(path.resolve(__dirname + `/${filePath}`), JSON.stringify(tarefas, null, 4));
}


function load(email){
    const filePath = `../database/${email}-tarefas.json`;
    const tarefas = require(filePath);
    return tarefas;
}

const TarefasController = {
    index: (req, res) => {
        let filePath = `../database/${req.usuario.email}-tarefas.json`;
        let tarefas = require(filePath);
        return res.send(tarefas);
    },
    store: (req, res) => {
        let tarefas = load(req.usuario.email);
        let novoId = 1;
        if(tarefas.length > 0){
            novoId = tarefas[tarefas.length - 1].id + 1;
        }        
        let {texto} = req.body;
        let tarefa = {id: novoId, texto, feita: false};
        tarefas.push(tarefa);
        save(req.usuario.email, tarefas);

        return res.status(201).json(tarefa);
    },
    update: (req, res) => {
        let texto = req.body.texto;
        let id = req.params.id
        let tarefa = tarefas.find(t => t.id == id);
        tarefa.texto = texto;
        save();
        return res.status(200).json({msg:'ok'});
    },
    updateFeita: (req, res) => {
        let id = req.params.id
        let tarefa = tarefas.find(t => t.id == id);
        tarefa.feita = true;
        save();
        return res.status(200).json({msg:'feita'});
    },
    updateDesfeita: (req, res) => {
        let id = req.params.id
        let tarefa = tarefas.find(t => t.id == id);
        tarefa.feita = false;
        save();
        return res.status(200).json({msg:'desfeita'});
    },
    delete: (req, res) => {
        let id = req.params.id;
        let pos = tarefas.findIndex(t => t.id == id);
        tarefas.splice(pos, 1);
        save();
        return res.status(200).json({msg:'deleted'});
    }
}

module.exports = TarefasController;