import React, { useState, useRef, useMemo } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import JoditEditor from 'jodit-react';
import axios from 'axios';

export default function AdicionarPolitica(props) {
    const token = localStorage.getItem('token');

    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(() => ({
        width: '100%',
        height: '80vh',
        readonly: false,
        placeholder: 'Digite a política de privacidade aqui...',
        toolbarButtonSize: 'middle',
        toolbar: [
            'bold',
            'italic',
            'underline',
            '|',
            'ul',
            'ol',
            '|',
            'link',
            'undo',
            'redo'
        ],
        // outras configurações se quiser (uploader, etc.)
    }), []);

    const handleClose = () => {
        setContent('');
        props.setAdicionarPolitica(false);
    };

    const handleSubmit = async (event) => {
        console.log("Conteúdo do editor:", content);
        event.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/adicionarPolitica`, {
                content
            }, {
                headers: {
                    Authorization: token
                }
            });
            setContent('');
            handleClose();
        } catch (error) {
            console.error("Erro ao adicionar termo:", error);
        }
    };

    return (
        <React.Fragment>
            <Dialog open={props.adicionarPolitica} onClose={handleClose} fullScreen>
                <DialogTitle>Adicionar Política de Privacidade</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ marginBottom: 2 }}>
                        Para adicionar uma nova política de privacidade, por favor insira as informações abaixo.
                    </DialogContentText>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onBlur={newContent => setContent(newContent)}
                        onChange={newContent => { }}
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
