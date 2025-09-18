import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function EsqueceuSenha() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [showPassword, setShowPassword] = useState(false);
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    useEffect(() => {
        if (!token) {
            navigate("../");
        }
    }, [token, navigate]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async () => {
        if (!senha || !confirmarSenha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        if (senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }
        if (senha !== confirmarSenha) {
            alert("senhas nao sao iguais")
            return;
        }
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/redefinirSenhaAdmin`, { token, senha });

            alert("ok")
            setTimeout(() => navigate("../"), 1000);
        } catch (err) {
            console.error(err);
            alert("algo deu errado")
        }
    };

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: "fit-content", padding: 20, boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: 5 }}>
                <div style={{ width: '100%', marginBottom: 20, textAlign: 'center' }}>
                    <h1>Recuperar Senha | Clarea ADM</h1>
                </div>
                <div style={{ width: '100%', paddingTop: "10px" }}>
                    <FormControl sx={{ marginTop: "10px" }} variant="outlined" size='small' fullWidth>
                        <InputLabel>Senha</InputLabel>
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setSenha(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Senha"
                        />
                    </FormControl>
                    <FormControl sx={{ marginTop: "10px" }} variant="outlined" size='small' fullWidth>
                        <InputLabel>Confirmar Senha</InputLabel>
                        <OutlinedInput
                            type={'password'}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            label="Confirmar Senha"
                        />
                    </FormControl>
                    <div style={{ fontSize: "13px", marginTop: "10px" }}>
                    </div>
                    <Button variant="contained" fullWidth sx={{ marginTop: "30px" }} onClick={handleSubmit}>Mudar senha</Button>
                </div>
            </div>
        </div>
    );
}

export default EsqueceuSenha;