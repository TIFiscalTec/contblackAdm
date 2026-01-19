import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
// import { LimitValue } from '../../../utils/LimitValue';
// import { FormatNumberToBr } from '../../../utils/FormatNumberToBr';

export default function EditarPlano(props) {
    const token = localStorage.getItem('token');

    const [nomePlano, setNomePlano] = useState('');
    const [valorAntigo, setValorAntigo] = useState('');
    const [valorNovo, setValorNovo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [qtdNfseMensalUsuario, setQtdNfseMensalUsuario] = useState('');
    const [qtdNfseMensalClarea, setQtdNfseMensalClarea] = useState('');

    useEffect(() => {
        const getPlanoById = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getPlanoById/${props.idPlano}`, {
                headers: {
                    Authorization: token
                }
            });

            console.log(response)
            setNomePlano(response?.data?.plano?.nome);
            setValorAntigo(response?.data?.plano?.valorAntigoMensal.replace(".", ","));
            setValorNovo(response?.data?.plano?.valorNovoMensal.replace(".", ","));
            setDescricao(response?.data?.plano?.descricao);
            setQtdNfseMensalUsuario(response?.data?.plano?.qtdNfseMensalUsuario);
            setQtdNfseMensalClarea(response?.data?.plano?.qtdNfseMensalClarea);
        }
        getPlanoById();
    }, [props.idPlano, token]);


    const handleClose = () => {
        props.setEditarPlano(false);
    };

    const handleSubmit = async (event) => {
        let vlAntigo = Number(valorAntigo.replace(".", "").replace(",", "."));
        let vlNovo = Number(valorNovo.replace(".", "").replace(",", "."));

        let x = vlAntigo - vlNovo;
        let percentual = (x / vlAntigo) * 100;

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/atualizarPlano/${props.idPlano}`, {
                nome: nomePlano,
                valorAntigoMensal: vlAntigo,
                valorNovoMensal: vlNovo,
                percentual,
                descricao,
                qtdNfseMensalUsuario,
                qtdNfseMensalClarea
            }, {
                headers: {
                    Authorization: token
                }
            });
            handleClose();
        } catch (error) {
            console.error("Erro ao atualizar plano:", error);
        }
    };

    return (
        <React.Fragment>
            <Dialog open={props.editarPlano} onClose={handleClose}>
                <DialogTitle>Editar Plano</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para editar este plano, por favor insira as novas informações abaixo.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Nome do plano"
                        placeholder='Insira o nome do plano'
                        type="text"
                        fullWidth
                        value={nomePlano || ''}
                        onChange={(e) => setNomePlano(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="Nome do plano"
                        placeholder='Insira o nome do plano'
                        type="text"
                        fullWidth
                        value={descricao || ''}
                        onChange={(e) => setDescricao(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                    <TextField
                        required
                        margin="dense"
                        label="Valor antigo mensal"
                        placeholder='Insira o valor antigo'
                        type="text"
                        fullWidth
                        value={valorAntigo || ''}
                        onChange={(e) => setValorAntigo(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                    <TextField
                        required
                        margin="dense"
                        label="Valor novo mensal"
                        placeholder='Insira o valor novo'
                        type="text"
                        fullWidth
                        value={valorNovo || ''}
                        onChange={(e) => setValorNovo(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                    <TextField
                        required
                        margin="dense"
                        label="Quantidade NFSe Mensal Usuário"
                        placeholder='Insira o valor novo'
                        type="text"
                        fullWidth
                        value={qtdNfseMensalUsuario || ''}
                        onChange={(e) => setQtdNfseMensalUsuario(e.target.value)}
                        variant="outlined"
                        size='small'
                    />
                    <TextField
                        required
                        margin="dense"
                        label="Quantidade NFSe Mensal Clarea"
                        placeholder='Insira o valor novo'
                        type="text"
                        fullWidth
                        value={qtdNfseMensalClarea || ''}
                        onChange={(e) => setQtdNfseMensalClarea(e.target.value)}
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
