import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalRecuperarSenha from './components/ModalRecuperarSenha';

function Login() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [modalRecuperarSenha, setModalRecuperarSenha] = useState(false);

    useEffect(() => {
        const verificarSessao = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/verificarTokenAdmin`, {}, {
                    headers: { Authorization: token }
                });

                if (response.data.status === 200) {
                    console.log(response.data);
                    navigate("../dashboard")
                } else {
                    localStorage.removeItem('token');
                    navigate("../")
                }
            } else {
                navigate("../")
            }
        }
        verificarSessao();
    }, [navigate])

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/loginAdm`, { email, senha })

        if (response.data.status === 200) {
            localStorage.setItem('token', response.data.token);
            navigate("../dashboard")
        } else {
            alert("erro ao fazer login")
            console.log(response);
        }

    }

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 400, padding: 20, boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: 5 }}>
                <div style={{ width: '100%', marginBottom: 20, textAlign: 'center' }}>
                    <h1>Login | Contblack ADM</h1>
                </div>
                <div style={{ width: '100%', paddingTop: "10px" }}>
                    <TextField label="E-mail" variant="outlined" fullWidth size='small' onChange={(e) => setEmail(e.target.value)} />
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
                    <div style={{ fontSize: "13px", marginTop: "10px" }}>
                        <span>Esqueceu a senha? <span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => setModalRecuperarSenha(true)}>Clique aqui</span></span>
                    </div>
                    <Button variant="contained" fullWidth sx={{ marginTop: "30px" }} onClick={handleLogin}>login</Button>
                </div>
            </div>
            <ModalRecuperarSenha modalRecuperarSenha={modalRecuperarSenha} setModalRecuperarSenha={setModalRecuperarSenha} />
        </div>
    );
}

export default Login;