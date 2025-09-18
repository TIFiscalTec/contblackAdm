
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
// import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import { MascaraTelefone } from '../../../utils/MascaraTelefone';

function Leads() {

    // const token = localStorage.getItem('token');
    // const navigate = useNavigate();
    const [leadsList, setLeadsList] = useState([]);

    useEffect(()  => {
        axios.get(`${process.env.REACT_APP_API_URL}/leads/recuperaveis`)
            .then(response => {
                const leads = response.data;
                setLeadsList(leads);

                // Agrupar por stepAtual
                const counts = {};
                leads.forEach(lead => {
                    counts[lead.stepAtual] = (counts[lead.stepAtual] || 0) + 1;
                });
            })
            .catch(error => console.error("Erro ao buscar dados:", error));
    }, []);


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
                            <Typography sx={{ color: 'text.primary' }}>Leads</Typography>
                        </Breadcrumbs>
                    </div>
                    <div>
                        <h2>Leads</h2>
                    </div>
                    <div>
                        <h3>Lista de Leads Perdidos</h3>
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
                                    {["ID", "Nome", "E-mail", "Telefone", "Parou em", "Ação"].map((header) => (
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
                                {leadsList.map((lead, i) => (
                                    <tr
                                        key={lead?.idLead}
                                        style={{
                                            background: i % 2 === 0 ? "#f9f9f9" : "#fff",
                                            transition: "all 0.2s ease-in-out",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#eef3f8")}
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = i % 2 === 0 ? "#f9f9f9" : "#fff")
                                        }
                                    >
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{lead?.idLead}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{lead?.nome || "---"}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{lead?.email || "---"}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{MascaraTelefone(lead?.telefone) || "---"}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{lead?.stepAtual || "---"}</td>
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
        </div>
    );
}

export default Leads;