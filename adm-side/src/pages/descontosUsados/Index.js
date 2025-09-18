import Header from "../components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { FormatDate } from "../../utils/FormatDate";
import { useParams } from "react-router-dom";
import { MascaraTelefone } from "../../utils/MascaraTelefone";

function DescontosUsados() {
    const { idDesconto } = useParams();
    console.log(idDesconto);

    const token = localStorage.getItem('token');
    const [descontosUsados, setDescontosUsados] = useState([]);

    useEffect(() => {
        const getDescontosUsados = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getDescontosUsados/${idDesconto}`, {
                headers: {
                    Authorization: token
                }
            });
            setDescontosUsados(response.data.descontosUsados);
            console.log(response.data.descontosUsados)
        }
        getDescontosUsados();
    }, [idDesconto, token])

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
                            <Link underline="hover" color="inherit" href="/Descontos">
                                Descontos
                            </Link>
                            <Typography sx={{ color: 'text.primary' }}>Descontos Usados</Typography>
                        </Breadcrumbs>
                    </div>
                    <div>
                        <h2>Descontos</h2>
                    </div>
                    <div>
                        <h3>Lista de Descontos Usados</h3>
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
                                    {["ID", "Nome Cliente", "E-mail", "Telefone", "Código Desconto", "Valor Desconto %", "Usado em"].map((header) => (
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
                                {descontosUsados.length > 0 ? (
                                    descontosUsados.map((descontoUsado, i) => (
                                        <tr
                                            key={descontoUsado?.idDesconto}
                                            style={{
                                                background: i % 2 === 0 ? "#f9f9f9" : "#fff",
                                                transition: "all 0.2s ease-in-out",
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "#eef3f8")}
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.background = i % 2 === 0 ? "#f9f9f9" : "#fff")
                                            }
                                        >
                                            <td style={{ padding: "14px 18px", fontSize: "14px" }}>{descontoUsado?.idDesconto}</td>
                                            <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{descontoUsado?.usuario?.Nome}</td>
                                            <td style={{ padding: "14px 18px", fontSize: "14px" }}>{descontoUsado?.usuario?.Email}</td>
                                            <td style={{ padding: "14px 18px", fontSize: "14px" }}>{MascaraTelefone(descontoUsado?.usuario?.Telefone)}</td>
                                            <td style={{ padding: "14px 18px", fontSize: "14px" }}>{descontoUsado?.desconto?.discountCode}</td>
                                            <td style={{ padding: "14px 18px", fontSize: "14px" }}>{descontoUsado?.desconto?.valorDesconto}%</td>
                                            <td style={{ padding: "14px 18px", fontSize: "14px" }}>{FormatDate(descontoUsado?.updatedAt)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", textAlign: "center" }} colSpan={7}>Nenhum cliente usou esse código de desconto</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DescontosUsados;