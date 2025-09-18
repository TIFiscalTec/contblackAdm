import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function ModalRecuperarSenha(props) {

    const [email, setEmail] = useState('');

    const handleClose = () => {
        props.setModalRecuperarSenha(false);
    };

    const handleChangePassword = async () => {
        if (!email) {
            alert("Por favor, insira seu e-mail.");
            return;
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/recuperarSenhaAdmin`, { email });

        console.log(data)
        if (data.status === 200) {
            alert("e-mail para redifinir senha foi enviado")
        } else {
            alert("E-mail não encontrado")
        }
    }

    return (
        <React.Fragment>
            <Dialog open={props.modalRecuperarSenha} onClose={handleClose}>
                <DialogTitle>Recuperar Senha</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para recuperar a senha, por favor insira o e-mail abaixo.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="E-mail"
                        placeholder='Insira seu E-mail'
                        type="text"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        size='small'
                        autoComplete='off'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined' size='small' color="error">Cancelar</Button>
                    <Button onClick={handleChangePassword} variant='contained' size='small' color="success">Enviar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
