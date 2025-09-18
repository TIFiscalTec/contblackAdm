import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { LimitValue } from '../../../utils/LimitValue';

export default function EditarDesconto(props) {
    const token = localStorage.getItem('token');

    const [discountCode, setDiscountCode] = useState('');
    const [valorDesconto, setValorDesconto] = useState('');
    const [duracaoMeses, setDuracaoMeses] = useState('');

    useEffect(() => {
        const getDescontoById = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getDescontoById/${props.idDesconto}`, {
                headers: {
                    Authorization: token
                }
            });
            setDiscountCode(response?.data?.desconto?.discountCode);
            setValorDesconto(response?.data?.desconto?.valorDesconto);
            setDuracaoMeses(response?.data?.desconto?.duracaoMeses);
        }
        getDescontoById();
    }, [props.idDesconto, token]);


    const handleClose = () => {
        props.setEditarDesconto(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (discountCode === '' || valorDesconto === '' || duracaoMeses === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/atualizarDesconto/${props.idDesconto}`, {
                discountCode,
                valorDesconto,
                duracaoMeses
            }, {
                headers: {
                    Authorization: token
                }
            });
            handleClose();
        } catch (error) {
            console.error("Erro ao atualizar desconto:", error);
        }
    };

    return (
        <React.Fragment>
            <Dialog open={props.editarDesconto} onClose={handleClose}>
                <DialogTitle>Editar Desconto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para editar este desconto, por favor insira as novas informações abaixo.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Código Desconto"
                        placeholder='Insira o código do desconto'
                        type="text"
                        fullWidth
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Valor Desconto"
                        placeholder='Insira o valor do desconto'
                        type="text"
                        fullWidth
                        value={valorDesconto}
                        onChange={(e) => setValorDesconto(LimitValue(e.target.value))}
                        variant="outlined"
                        size='small'
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Duração do Desconto (em meses)"
                        placeholder='Insira a duração do desconto'
                        type="text"
                        fullWidth
                        value={duracaoMeses}
                        onChange={(e) => setDuracaoMeses(LimitValue(e.target.value))}
                        variant="outlined"
                        size='small'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined' size='small' color="error">Cancelar</Button>
                    <Button onClick={handleSubmit} variant='contained' size='small' color="success">Salvar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
