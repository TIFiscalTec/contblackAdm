import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function AdicionarTermos(props) {
    const token = localStorage.getItem('token');

    const [conteudo, setConteudo] = useState('');
    const [versao, setVersao] = useState('');

    const handleClose = () => {
        setConteudo('');
        setVersao('');
        props.setAdicionarTermos(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/adicionarTermo`, {
                conteudo,
                versao
            }, {
                headers: {
                    Authorization: token
                }
            });
            setConteudo('');
            setVersao('');
            handleClose();
        } catch (error) {
            console.error("Erro ao adicionar termo:", error);
        }
    };

    return (
        <React.Fragment>
            <Dialog open={props.adicionarTermos} onClose={handleClose}>
                <DialogTitle>Adicionar Termos De Uso</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para adicionar um novo termo, por favor insira as informações abaixo.
                    </DialogContentText>
                    <TextField
                        id="conteudo"
                        autoFocus
                        required
                        margin="dense"
                        label="Conteúdo do termo"
                        placeholder='Insira o conteúdo do termo'
                        multiline
                        rows={4}
                        fullWidth
                        value={conteudo || ""}
                        onChange={(e) => setConteudo(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                    <TextField
                        id="versao"
                        required
                        margin="dense"
                        label="Versão do Termo"
                        placeholder='Insira a versão do termo'
                        type="text"
                        fullWidth
                        autoComplete='off'
                        value={versao || ""}
                        onChange={(e) => setVersao(e.target.value)}
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
