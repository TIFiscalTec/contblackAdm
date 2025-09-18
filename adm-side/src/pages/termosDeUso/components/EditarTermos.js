import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function EditarTermos(props) {
    const token = localStorage.getItem('token');

    const [conteudo, setConteudo] = useState('');
    const [versao, setVersao] = useState('');

    useEffect(() => {
        const getTermo = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getTermoById/${props.idTermo}`, {
                headers: {
                    Authorization: token
                }
            });
            setConteudo(response?.data?.termo?.Conteudo);
            setVersao(response?.data?.termo?.Versao);
        }
        getTermo();
    }, [token, props.idTermo]);

    const handleClose = () => {
        setConteudo('');
        setVersao('');
        props.setEditarTermos(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/atualizarTermo/${props.idTermo}`, {
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
            <Dialog open={props.editarTermos} onClose={handleClose}>
                <DialogTitle>Editar Termos De Uso</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para editar o termo, por favor insira as informações abaixo.
                    </DialogContentText>
                    <TextField
                        id='conteudo'
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
                        id='versao'
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
                    <Button onClick={handleSubmit} variant='contained' size='small' color="success">Editar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
