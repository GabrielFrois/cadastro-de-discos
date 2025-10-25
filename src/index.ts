import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import {Disco, IDisco} from './models/disco-models';

const app = express();
const PORT = 3000;
const MONGO_URL = 'mongodb://localhost:27017/crud_discos';

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'view')));

mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB conectado!'))
    .catch((err) => console.error('Falha ao conectar ao MongoDB:', err));

app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'index.html'));
});

// Create
app.post('/api/discos', async(req:Request, res:Response) => {
    try {
        const {titulo, artista, ano, genero, formato, preco} = req.body;
        const novoDisco = new Disco({titulo, artista, ano, genero, formato, preco});
        await novoDisco.save();
        res.status(201).json(novoDisco);
    } catch (error){
        res.status(400).json({message: 'Erro ao cadastrar disco', error});
    }
});

// Read
app.get('/api/discos', async(req:Request, res:Response) => {
    try {
        const discos = await Disco.find();
        res.status(200).json(discos);
    } catch(error){
        res.status(500).json({message: 'Erro ao buscar discos', error});
    }
});
app.get('/api/discos/:id', async (req:Request, res:Response) => {
    try {
        const disco = await Disco.findById(req.params.id);
        if(!disco){
            return res.status(404).json({message: 'Disco não encontrado'});
        }
        res.status(200).json(disco);
    } catch(error){
        res.status(500).json({message: 'Erro ao buscar disco', error});
    }
});

// Update
app.put('/api/discos/:id', async (req:Request, res:Response) => {
    try {
        const discoAtualizado = await Disco.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );
        if(!discoAtualizado){
            return res.status(404).json({message: 'Disco não encontrado'});
        }
        res.status(200).json(discoAtualizado);
    } catch(error){
        res.status(400).json({message: 'Erro ao atualizar disco', error});
    }
});

// Delete
app.delete('/api/discos/:id', async(req:Request, res:Response) => {
    try {
        const discoExcluido = await Disco.findByIdAndDelete(req.params.id);
        if(!discoExcluido){
            return res.status(404).json({message: 'Disco não encontrado'});
        }
        res.status(200).json({message: 'Disco excluído com sucesso'});
    } catch(error){
        res.status(500).json({message: 'Erro ao excluir disco', error});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});