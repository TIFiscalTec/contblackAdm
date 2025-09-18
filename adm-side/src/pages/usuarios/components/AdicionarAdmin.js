import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function AdicionarAdmin(props) {
    const token = localStorage.getItem('token');

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleClose = () => {
        setNome('');
        setEmail('');
        setSenha('');
        props.setAdicionarAdmin(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/adicionarAdmin`, {
                nome,
                email,
                senha,
            }, {
                headers: {
                    Authorization: token
                }
            });
            setNome('');
            setEmail('');
            setSenha('');
            handleClose();
        } catch (error) {
            console.error("Erro ao adicionar desconto:", error);
        }
    };

    return (
        <React.Fragment>
            <Dialog open={props.adicionarAdmin} onClose={handleClose}>
                <DialogTitle>Adicionar Admin</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para adicionar um novo admin, por favor insira as informações abaixo.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Nome"
                        placeholder='Insira o nome do admin'
                        type="text"
                        fullWidth
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        variant="outlined"
                        size='small'
                        autoComplete='off'
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="E-mail"
                        autoComplete='off'
                        placeholder='Insira o e-mail do admin'
                        type="text"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Senha"
                        autoComplete='off'
                        placeholder='Insira a senha do admin'
                        type="text"
                        fullWidth
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined' size='small' color="error">Cancelar</Button>
                    <Button onClick={handleSubmit} variant='contained' size='small' color="success">Adicionar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
