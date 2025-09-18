import Header from "../components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { FormatDate } from "../../utils/FormatDate";

function Assinaturas() {

    const token = localStorage.getItem('token');
    const [assinaturas, setAssinaturas] = useState([]);
    useEffect(() => {
        const getAssinaturas = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/listarAssinaturas`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(response);
            setAssinaturas(response.data.assinaturas);
        };
        getAssinaturas();
    }, [token]);


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
                            <Typography sx={{ color: 'text.primary' }}>Assinaturas</Typography>
                        </Breadcrumbs>
                    </div>
                    <div>
                        <h2>Assinaturas</h2>
                    </div>
                    <div>
                        <h3>Lista de Assinaturas</h3>
                    </div>
                    <div style={{ width: "100%", overflowX: "auto", marginTop: "20px" }}>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                borderRadius: "12px",
                                overflow: "hidden",
                                background: "#fff",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <thead style={{ background: "#0b243d", color: "#fff" }}>
                                <tr>
                                    <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "14px" }}>ID</th>
                                    <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "14px" }}>Nome cliente</th>
                                    <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "14px" }}>Nome plano</th>
                                    <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "14px" }}>Data início</th>
                                    <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "14px" }}>Próxima cobrança</th>
                                    <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "14px" }}>Status</th>
                                    <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "14px" }}>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assinaturas.map((assinatura, i) => (
                                    <tr
                                        key={assinatura.idAssinatura}
                                        style={{
                                            background: i % 2 === 0 ? "#f9f9f9" : "transparent",
                                            cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = i % 2 === 0 ? "#f9f9f9" : "transparent")
                                        }
                                    >
                                        <td style={{ padding: "14px 16px", fontSize: "14px" }}>{assinatura?.idAssinatura}</td>
                                        <td style={{ padding: "14px 16px", fontSize: "14px" }}>{assinatura?.usuario?.Nome}</td>
                                        <td style={{ padding: "14px 16px", fontSize: "14px" }}>{assinatura?.Plano?.nome}</td>
                                        <td style={{ padding: "14px 16px", fontSize: "14px" }}>{FormatDate(assinatura?.dataInicio)}</td>
                                        <td style={{ padding: "14px 16px", fontSize: "14px" }}>{FormatDate(assinatura?.proximaCobranca)}</td>
                                        <td style={{ padding: "14px 16px", fontSize: "14px" }}>
                                            <span
                                                style={{
                                                    padding: "4px 10px",
                                                    borderRadius: "12px",
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                    textTransform: "capitalize",
                                                    background: assinatura.status === "ACTIVE" ? "#e0f7e9" : "#fdecea",
                                                    color: assinatura.status === "ACTIVE" ? "#2e7d32" : "#c62828",
                                                }}
                                            >
                                                {assinatura.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: "14px 16px", fontSize: "14px" }}>
                                            <button
                                                style={{
                                                    border: "none",
                                                    padding: "8px 14px",
                                                    marginRight: "6px",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    fontSize: "13px",
                                                    fontWeight: 500,
                                                    background: "#ffc845",
                                                    color: "#0b243d",
                                                }}
                                                onMouseEnter={(e) => (e.target.style.background = "#e6b73f")}
                                                onMouseLeave={(e) => (e.target.style.background = "#ffc845")}
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
                                                    background: "#e53935",
                                                    color: "#fff",
                                                }}
                                                onMouseEnter={(e) => (e.target.style.background = "#c62828")}
                                                onMouseLeave={(e) => (e.target.style.background = "#e53935")}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Assinaturas;