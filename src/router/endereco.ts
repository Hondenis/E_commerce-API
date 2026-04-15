import express from 'express';
import { EnderecoController } from '../controler/EnderecoController';

const router = express.Router();
const enderecoController = new EnderecoController();

router.post('/criar', (req, res) => {enderecoController.criarEndereco(req, res)});
router.put('/:id', (req, res) => {enderecoController.editarEndereco(req, res)});
router.delete('/:id', (req, res) => {enderecoController.excluirEndereco(req, res)});
router.get('/listar', (req, res) => {enderecoController.listarEndereco(req, res)});
router.get('/:id', (req, res) => {enderecoController.pesquisarEndereco(req, res)});

export default router;