import Header from "../components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import { FormatDate } from "../../utils/FormatDate";
import AdicionarPolitica from "./components/AdicionarPolitica";

function PoliticaDePrivacidade() {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [politicas, setPoliticas] = useState([]);
    const [adicionarPolitica, setAdicionarPolitica] = useState(false);

    useEffect(() => {
        const getPoliticas = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listarPoliticas`, {
                headers: {
                    Authorization: token
                }
            })
            setPoliticas(response.data.politicas);
            console.log(response)
        }

        getPoliticas();
    }, [token, navigate, adicionarPolitica])

    return (
        <div>
            <Header />
            <div style={{ width: '100%', height: '90vh', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '90%', marginTop: 20 }}>
                    <div role="presentation">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/Dashboard">
                                Dashboard
                            </Link>
                            <Typography sx={{ color: 'text.primary' }}>Políticas de Privacidade</Typography>
                        </Breadcrumbs>
                    </div>
                    <div>
                        <h2>Políticas de Privacidade</h2>
                    </div>
                    <div>
                        <h3>Lista de Políticas de Privacidade</h3>
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <button
                            style={{
                                border: "none",
                                padding: "8px 14px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: 500,
                                background: "#008000",
                                color: "#fff",
                                transition: "background 0.2s",
                            }}
                            onMouseEnter={(e) => (e.target.style.background = "#025e02ff")}
                            onMouseLeave={(e) => (e.target.style.background = "#008000")}
                            onClick={() => setAdicionarPolitica(true)}
                        >
                            Adicionar Políticas de Privacidade
                        </button>
                    </div>
                    <div style={{ width: "100%", overflowX: "auto", marginTop: "20px" }}>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                borderRadius: "12px",
                                overflow: "hidden",
                                background: "#fff",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                        >
                            <thead style={{ background: "#0b243d", color: "#fff" }}>
                                <tr>
                                    {["ID", "Versão", "Criado em"].map((header) => (
                                        <th
                                            key={header}
                                            style={{
                                                padding: "16px 18px",
                                                textAlign: "left",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {politicas.length > 0 ? politicas.map((politica, i) => (
                                    <tr
                                        key={politica?.idPolitica}
                                        style={{
                                            background: i % 2 === 0 ? "#f9f9f9" : "#fff",
                                            transition: "all 0.2s ease-in-out",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#eef3f8")}
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = i % 2 === 0 ? "#f9f9f9" : "#fff")
                                        }
                                    >
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{politica?.idPolitica}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{politica?.Versao}</td>
                                        {/* <td style={{ padding: "14px 18px", fontSize: "14px" }}>{politica?.Conteudo}</td> */}
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{FormatDate(politica?.DataCriacao)}</td>
                                        {/* <td style={{ padding: "14px 18px", fontSize: "14px", display: "flex", gap: "8px" }}>
                                            <button
                                                style={{
                                                    border: "none",
                                                    padding: "8px 14px",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    fontSize: "13px",
                                                    fontWeight: 500,
                                                    background: "#ffc845",
                                                    color: "#0b243d",
                                                    transition: "background 0.2s",
                                                }}
                                                onMouseEnter={(e) => (e.target.style.background = "#e6b73f")}
                                                onMouseLeave={(e) => (e.target.style.background = "#ffc845")}
                                                onClick={() => {
                                                    setIdTermo(termo?.idTermo);
                                                    setEditarTermos(true);
                                                }}
                                            >
                                                Editar
                                            </button>
                                        </td> */}
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} style={{ textAlign: "center", padding: "14px 18px", fontSize: "14px" }}>
                                            Nenhuma política de privacidade encontrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AdicionarPolitica adicionarPolitica={adicionarPolitica} setAdicionarPolitica={setAdicionarPolitica} />
        </div>
    );
}

export default PoliticaDePrivacidade;