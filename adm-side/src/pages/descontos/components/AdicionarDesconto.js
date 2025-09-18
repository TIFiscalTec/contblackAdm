import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { LimitValue } from '../../../utils/LimitValue';

export default function AdicionarDesconto(props) {
    const token = localStorage.getItem('token');

    const [discountCode, setDiscountCode] = useState('');
    const [valorDesconto, setValorDesconto] = useState('');
    const [duracaoMeses, setDuracaoMeses] = useState('');

    const handleClose = () => {
        setDuracaoMeses('');
        setValorDesconto('');
        setDiscountCode('');
        props.setAdicionarDesconto(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/adicionarDesconto`, {
                discountCode,
                valorDesconto,
                duracaoMeses
            }, {
                headers: {
                    Authorization: token
                }
            });
            setValorDesconto('');
            setDiscountCode('');
            handleClose();
        } catch (error) {
            console.error("Erro ao adicionar desconto:", error);
        }
    };

    return (
        <React.Fragment>
            <Dialog open={props.adicionarDesconto} onClose={handleClose}>
                <DialogTitle>Adicionar Desconto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para adicionar um novo desconto, por favor insira as informações abaixo.
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
                    <Button onClick={handleSubmit} variant='contained' size='small' color="success">Adicionar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
