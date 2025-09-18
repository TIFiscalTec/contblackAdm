import Header from "../components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import { formatToBrl } from "../../utils/FormatToBrl";
import EditarPlano from "./components/EditarPlano";

function Planos() {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [planos, setPlanos] = useState([]);
    const [editarPlano, setEditarPlano] = useState(false);
    const [idPlano, setIdPlano] = useState(null);

    useEffect(() => {
        const getPlanos = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listarPlanos`)
            setPlanos(response.data.planos);
            console.log(response)
        }

        getPlanos();
    }, [token, navigate, editarPlano])

    const handleAdicionarPlano = async () => {
        if (planos.length >= 4) {
            alert("Limite de 4 planos atingido.");
            return;
        }
    }

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
                            <Typography sx={{ color: 'text.primary' }}>Planos</Typography>
                        </Breadcrumbs>
                    </div>
                    <div>
                        <h2>Planos</h2>
                    </div>
                    <div>
                        <h3>Lista de Planos</h3>
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
                            onClick={handleAdicionarPlano}
                        >
                            Adicionar Plano
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
                                    {["ID", "Nome", "Descrição", "Valor antigo mensal", "Valor novo mensal", "Desconto mensal", "Ações"].map((header) => (
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
                                {planos.map((plano, i) => (
                                    <tr
                                        key={plano?.idPlano}
                                        style={{
                                            background: i % 2 === 0 ? "#f9f9f9" : "#fff",
                                            transition: "all 0.2s ease-in-out",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#eef3f8")}
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = i % 2 === 0 ? "#f9f9f9" : "#fff")
                                        }
                                    >
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{plano?.idPlano}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{plano?.nome}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{plano?.descricao}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{formatToBrl(plano?.valorAntigoMensal)}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{formatToBrl(plano?.valorNovoMensal)}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{parseInt(plano?.descontoMensal)}%</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", display: "flex", gap: "8px" }}>
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
                                                    setIdPlano(plano?.idPlano);
                                                    setEditarPlano(true);
                                                }}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <EditarPlano editarPlano={editarPlano} setEditarPlano={setEditarPlano} idPlano={idPlano} />
        </div>
    );
}

export default Planos;