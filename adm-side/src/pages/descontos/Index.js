import Header from "../components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { FormatDate } from "../../utils/FormatDate";
import EditarDesconto from "./components/EditarDesconto";
import AdicionarDesconto from "./components/AdicionarDesconto";
import { useNavigate } from "react-router-dom";

function Descontos() {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [descontos, setDescontos] = useState([]);
    const [editarDesconto, setEditarDesconto] = useState(false);
    const [adicionarDesconto, setAdicionarDesconto] = useState(false);
    const [idDesconto, setIdDesconto] = useState(null);

    useEffect(() => {
        const getDescontos = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listarDescontos`, {
                headers: {
                    Authorization: token
                }
            });
            setDescontos(response.data.descontos);
            console.log(response.data.descontos);
        };
        getDescontos();
    }, [token, editarDesconto, adicionarDesconto]);

    const handleOpenEditarDesconto = (idDesconto) => {
        setIdDesconto(idDesconto);
        setEditarDesconto(true);
    }

    const handleDesabilitarDesconto = async (idDesconto) => {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/desabilitarDesconto/${idDesconto}`, {}, {
            headers: {
                Authorization: token
            }
        });
        setDescontos(response.data.descontos);
    }

    const handleHabilitarDesconto = async (idDesconto) => {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/habilitarDesconto/${idDesconto}`, {}, {
            headers: {
                Authorization: token
            }
        });
        setDescontos(response.data.descontos);
    }


    return (
        <div>
            <Header />
            <div style={{ width: '100%', height: '90vh', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '90%', marginTop: 20 }}>
                    <div role="presentation">
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="../Dashboard">
                                Dashboard
                            </Link>
                            <Typography sx={{ color: 'text.primary' }}>Descontos</Typography>
                        </Breadcrumbs>
                    </div>
                    <div>
                        <h2>Descontos</h2>
                    </div>
                    <div>
                        <h3>Lista de Descontos</h3>
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
                            onClick={() => setAdicionarDesconto(true)}
                        >
                            Adicionar Desconto
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
                                    {["ID", "Código desconto", "Valor desconto %", "Duração do desconto", "Última alteração", "Status", "Ações"].map((header) => (
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
                                {descontos.map((desconto, i) => (
                                    <tr
                                        key={desconto?.idDesconto}
                                        style={{
                                            background: i % 2 === 0 ? "#f9f9f9" : "#fff",
                                            transition: "all 0.2s ease-in-out",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#eef3f8")}
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = i % 2 === 0 ? "#f9f9f9" : "#fff")
                                        }
                                    >
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{desconto?.idDesconto}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{desconto?.discountCode}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{desconto?.valorDesconto}%</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{desconto?.duracaoMeses} Meses</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{FormatDate(desconto?.updatedAt)}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>
                                            <span
                                                style={{
                                                    padding: "6px 12px",
                                                    borderRadius: "16px",
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                    background: desconto.status ? "#e0f7e9" : "#fdecea",
                                                    color: desconto.status ? "#2e7d32" : "#c62828",
                                                }}
                                            >
                                                {desconto.status ? "Ativo" : "Inativo"}
                                            </span>
                                        </td>
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
                                                onClick={() => handleOpenEditarDesconto(desconto.idDesconto)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                style={{
                                                    border: "none",
                                                    padding: "8px 14px",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    fontSize: "13px",
                                                    fontWeight: 500,
                                                    background: "#4fc3f7",
                                                    color: "#0b243d",
                                                    transition: "background 0.2s",
                                                }}
                                                onMouseEnter={(e) => (e.target.style.background = "#29b6f6")}
                                                onMouseLeave={(e) => (e.target.style.background = "#4fc3f7")}
                                                onClick={() => navigate(`../DescontosUsados/${desconto.idDesconto}`)}
                                            >
                                                Usado Por
                                            </button>
                                            {desconto.status ? (
                                                <button
                                                    style={{
                                                        width: "90px",
                                                        border: "none",
                                                        padding: "8px 14px",
                                                        borderRadius: "6px",
                                                        cursor: "pointer",
                                                        fontSize: "13px",
                                                        fontWeight: 500,
                                                        background: "#e53935",
                                                        color: "#fff",
                                                        transition: "background 0.2s",
                                                    }}
                                                    onMouseEnter={(e) => (e.target.style.background = "#c62828")}
                                                    onMouseLeave={(e) => (e.target.style.background = "#e53935")}
                                                    onClick={() => handleDesabilitarDesconto(desconto.idDesconto)}
                                                >
                                                    Desabilitar
                                                </button>
                                            ) : (
                                                <button
                                                    style={{
                                                        width: "90px",
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
                                                    onClick={() => handleHabilitarDesconto(desconto.idDesconto)}
                                                >
                                                    Habilitar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <EditarDesconto editarDesconto={editarDesconto} setEditarDesconto={setEditarDesconto} idDesconto={idDesconto} />
            <AdicionarDesconto adicionarDesconto={adicionarDesconto} setAdicionarDesconto={setAdicionarDesconto} idDesconto={idDesconto} />
        </div>
    );
}

export default Descontos;