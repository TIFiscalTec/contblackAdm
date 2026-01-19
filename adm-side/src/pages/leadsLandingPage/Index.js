import Header from "../components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import { MascaraTelefone } from "../../utils/MascaraTelefone";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    BarElement,
    ArcElement
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    BarElement,
    ArcElement,
);


const dddLocalizacoes = [
    { ddd: 11, loc: 'São Paulo' },
    { ddd: 12, loc: 'Vale do Paraíba' },
    { ddd: 13, loc: 'Santos' },
    { ddd: 14, loc: 'Bauru' },
    { ddd: 15, loc: 'Sorocaba' },
    { ddd: 16, loc: 'Ribeirão Preto' },
    { ddd: 17, loc: 'São José do Rio Preto' },
    { ddd: 18, loc: 'Presidente Prudente' },
    { ddd: 19, loc: 'Campinas' },
    { ddd: 21, loc: 'Rio de Janeiro' },
    { ddd: 22, loc: 'Campos dos Goytacazes' },
    { ddd: 24, loc: 'Volta Redonda' },
    { ddd: 27, loc: 'Vitória' },
    { ddd: 28, loc: 'Grande Vitória' },
    { ddd: 31, loc: 'Belo Horizonte' },
    { ddd: 32, loc: 'Juiz de Fora' },
    { ddd: 33, loc: 'Governador Valadares' },
    { ddd: 34, loc: 'Uberaba' },
    { ddd: 35, loc: 'Poços de Caldas' },
    { ddd: 37, loc: 'Divinópolis' },
    { ddd: 38, loc: 'Montes Claros' },
    { ddd: 41, loc: 'Curitiba' }, // Localização associada ao DDD 41
    { ddd: 42, loc: 'Ponta Grossa' },
    { ddd: 43, loc: 'Londrina' },
    { ddd: 44, loc: 'Maringá' },
    { ddd: 45, loc: 'Foz do Iguaçu' },
    { ddd: 46, loc: 'Cascavel' },
    { ddd: 47, loc: 'Joinville' },
    { ddd: 48, loc: 'Florianópolis' },
    { ddd: 49, loc: 'Chapecó' },
    { ddd: 51, loc: 'Porto Alegre' },
    { ddd: 53, loc: 'Pelotas' },
    { ddd: 54, loc: 'Caxias do Sul' },
    { ddd: 55, loc: 'Santa Maria' },
    { ddd: 61, loc: 'Brasília' },
    { ddd: 62, loc: 'Goiânia' },
    { ddd: 63, loc: 'Palmas' },
    { ddd: 64, loc: 'Cuiabá' },
    { ddd: 65, loc: 'Rondonópolis' },
    { ddd: 66, loc: 'Cuiabá' },
    { ddd: 67, loc: 'Campo Grande' },
    { ddd: 68, loc: 'Rio Branco' },
    { ddd: 69, loc: 'Porto Velho' },
    { ddd: 71, loc: 'Salvador' },
    { ddd: 73, loc: 'Ilhéus' },
    { ddd: 74, loc: 'Juazeiro' },
    { ddd: 75, loc: 'Feira de Santana' },
    { ddd: 77, loc: 'Barreiras' },
    { ddd: 79, loc: 'Aracaju' },
    { ddd: 81, loc: 'Recife' },
    { ddd: 82, loc: 'Maceió' },
    { ddd: 83, loc: 'João Pessoa' },
    { ddd: 84, loc: 'Natal' },
    { ddd: 85, loc: 'Fortaleza' },
    { ddd: 86, loc: 'Teresina' },
    { ddd: 87, loc: 'Caruaru' },
    { ddd: 88, loc: 'Sobral' },
    { ddd: 89, loc: 'Picos' },
    { ddd: 91, loc: 'Belém' },
    { ddd: 92, loc: 'Manaus' },
    { ddd: 93, loc: 'Pará' },
    { ddd: 94, loc: 'Marabá' },
    { ddd: 95, loc: 'Boa Vista' },
    { ddd: 96, loc: 'Macapá' },
    { ddd: 97, loc: 'Manaus' },
    { ddd: 98, loc: 'São Luís' },
    { ddd: 99, loc: 'Imperatriz' }
];

const dddCores = {
    11: 'rgba(255, 99, 132, 0.5)',  // São Paulo
    12: 'rgba(54, 162, 235, 0.5)',  // Vale do Paraíba
    13: 'rgba(75, 192, 192, 0.5)',  // Santos
    14: 'rgba(153, 102, 255, 0.5)', // Bauru
    15: 'rgba(255, 159, 64, 0.5)',  // Sorocaba
    16: 'rgba(255, 205, 86, 0.5)',  // Ribeirão Preto
    17: 'rgba(100, 255, 218, 0.5)', // São José do Rio Preto
    18: 'rgba(141, 82, 255, 0.5)',  // Presidente Prudente
    19: 'rgba(50, 205, 50, 0.5)',   // Campinas
    21: 'rgba(255, 99, 132, 0.5)',  // Rio de Janeiro
    22: 'rgba(54, 162, 235, 0.5)',  // Campos dos Goytacazes
    24: 'rgba(75, 192, 192, 0.5)',  // Volta Redonda
    27: 'rgba(153, 102, 255, 0.5)', // Vitória
    28: 'rgba(255, 159, 64, 0.5)',  // Grande Vitória
    31: 'rgba(100, 255, 218, 0.5)', // Belo Horizonte
    32: 'rgba(141, 82, 255, 0.5)',  // Juiz de Fora
    33: 'rgba(50, 205, 50, 0.5)',   // Governador Valadares
    34: 'rgba(255, 99, 132, 0.5)',  // Uberaba
    35: 'rgba(54, 162, 235, 0.5)',  // Poços de Caldas
    37: 'rgba(75, 192, 192, 0.5)',  // Divinópolis
    38: 'rgba(153, 102, 255, 0.5)', // Montes Claros
    41: 'rgba(255, 159, 64, 0.5)',  // Curitiba
    42: 'rgba(100, 255, 218, 0.5)', // Ponta Grossa
    43: 'rgba(141, 82, 255, 0.5)',  // Londrina
    44: 'rgba(50, 205, 50, 0.5)',   // Maringá
    45: 'rgba(255, 99, 132, 0.5)',  // Foz do Iguaçu
    46: 'rgba(54, 162, 235, 0.5)',  // Cascavel
    47: 'rgba(75, 192, 192, 0.5)',  // Joinville
    48: 'rgba(153, 102, 255, 0.5)', // Florianópolis
    49: 'rgba(255, 159, 64, 0.5)',  // Chapecó
    51: 'rgba(100, 255, 218, 0.5)', // Porto Alegre
    53: 'rgba(141, 82, 255, 0.5)',  // Pelotas
    54: 'rgba(50, 205, 50, 0.5)',   // Caxias do Sul
    55: 'rgba(255, 99, 132, 0.5)',  // Santa Maria
    61: 'rgba(54, 162, 235, 0.5)',  // Brasília
    62: 'rgba(75, 192, 192, 0.5)',  // Goiânia
    63: 'rgba(153, 102, 255, 0.5)', // Palmas
    64: 'rgba(255, 159, 64, 0.5)',  // Cuiabá
    65: 'rgba(100, 255, 218, 0.5)', // Rondonópolis
    66: 'rgba(141, 82, 255, 0.5)',  // Cuiabá
    67: 'rgba(50, 205, 50, 0.5)',   // Campo Grande
    68: 'rgba(255, 99, 132, 0.5)',  // Rio Branco
    69: 'rgba(54, 162, 235, 0.5)',  // Porto Velho
    71: 'rgba(75, 192, 192, 0.5)',  // Salvador
    73: 'rgba(153, 102, 255, 0.5)', // Ilhéus
    74: 'rgba(255, 159, 64, 0.5)',  // Juazeiro
    75: 'rgba(100, 255, 218, 0.5)', // Feira de Santana
    77: 'rgba(141, 82, 255, 0.5)',  // Barreiras
    79: 'rgba(50, 205, 50, 0.5)',   // Aracaju
    81: 'rgba(255, 99, 132, 0.5)',  // Recife
    82: 'rgba(54, 162, 235, 0.5)',  // Maceió
    83: 'rgba(75, 192, 192, 0.5)',  // João Pessoa
    84: 'rgba(153, 102, 255, 0.5)', // Natal
    85: 'rgba(255, 159, 64, 0.5)',  // Fortaleza
    86: 'rgba(100, 255, 218, 0.5)', // Teresina
    87: 'rgba(141, 82, 255, 0.5)',  // Caruaru
    88: 'rgba(50, 205, 50, 0.5)',   // Sobral
    89: 'rgba(255, 99, 132, 0.5)',  // Picos
    91: 'rgba(54, 162, 235, 0.5)',  // Belém
    92: 'rgba(75, 192, 192, 0.5)',  // Manaus
    93: 'rgba(153, 102, 255, 0.5)', // Pará
    94: 'rgba(255, 159, 64, 0.5)',  // Marabá
    95: 'rgba(100, 255, 218, 0.5)', // Boa Vista
    96: 'rgba(141, 82, 255, 0.5)',  // Macapá
    97: 'rgba(50, 205, 50, 0.5)',   // Manaus
    98: 'rgba(255, 99, 132, 0.5)',  // São Luís
    99: 'rgba(54, 162, 235, 0.5)',  // Imperatriz
};



export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            // text: 'Chart.js Bar Chart',
        },
    },
};


function LeadsLandingPage() {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: '# of Votes',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            },
        ],
    });
    const [dataLoc, setDataLoc] = useState({
        labels: [],
        datasets: [
            {
                label: 'Dataset 1',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    });
    const [dataHorario, setDataHorario] = useState({
        labels: [],
        datasets: [
            {
                label: 'Dataset 1',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    });

    useEffect(() => {
        const getUsuarios = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/listarLeads`, {
                headers: {
                    Authorization: token
                }
            });

            if (response.data.status === 200) {
                setUsuarios(response.data.leads);

                const horarios = response.data.leads.map(lead => {
                    const dataCriacao = new Date(lead.createdAt);
                    return dataCriacao.getHours();
                });

                const contagemHorarios = horarios.reduce((acc, hora) => {
                    acc[hora] = (acc[hora] || 0) + 1;
                    return acc;
                }, {});

                setDataHorario({
                    labels: Object.keys(contagemHorarios),
                    datasets: [
                        {
                            label: 'Leads por horário',
                            data: Object.values(contagemHorarios),
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                });

                const areasTrabalho = response.data.leads.map(lead => lead.areaTrabalho);

                // Usando reduce para contar a ocorrência de cada área de trabalho
                const contagemAreas = areasTrabalho.reduce((acc, area) => {
                    acc[area] = (acc[area] || 0) + 1;  // Se a área já existe, incrementa; caso contrário, inicia com 1
                    return acc;
                }, {});

                const contagemDDD = response.data.leads.reduce((acc, lead) => {
                    const ddd = Number(lead.telefone.substring(0, 2));

                    // Encontrar a localização correspondente ao DDD
                    const localizacao = dddLocalizacoes.find(item => item.ddd === ddd);

                    if (localizacao) {
                        // Atualizar a contagem por localização
                        acc[localizacao.loc] = (acc[localizacao.loc] || 0) + 1;
                    }

                    return acc;
                }, {});

                const labels = Object.keys(contagemDDD);
                const data = Object.values(contagemDDD);

                // Atribuindo cores dinâmicas para cada DDD
                const backgroundColors = labels.map(label => {
                    const ddd = dddLocalizacoes.find(item => item.loc === label)?.ddd;
                    return dddCores[ddd] || 'rgba(255, 255, 255, 0.5)'; // Cor padrão se o DDD não tiver uma cor definida
                });

                setDataLoc({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Leads por localização',
                            data: data,
                            backgroundColor: backgroundColors,
                        },
                    ],
                });


                setData({
                    labels: Object.keys(contagemAreas),
                    datasets: [
                        {
                            label: 'Leads por fonte',
                            data: Object.values(contagemAreas),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            }
            console.log(response)
        }

        getUsuarios();
    }, [token, navigate,])


    // const handleDownload = async () => {
    //     try {
    //         // Faz a requisição GET para o backend
    //         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/downloadCsv`, {
    //             responseType: "blob", // importante para arquivos binários
    //             headers: {
    //                 Authorization: `${localStorage.getItem("token")}` // ajuste conforme seu auth
    //             }
    //         });

    //         // Cria um link temporário para download
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement("a");
    //         link.href = url;
    //         link.setAttribute("download", "leads.csv"); // nome do arquivo
    //         document.body.appendChild(link);
    //         link.click();
    //         link.remove();

    //     } catch (error) {
    //         console.error("Erro ao baixar CSV:", error);
    //         alert("Não foi possível baixar o arquivo. Verifique se você tem permissão.");
    //     }
    // };

    const formatData = (data) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const dataFormatada = new Date(data).toLocaleString('pt-BR', options);
        return dataFormatada;
    };


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
                            <Typography sx={{ color: 'text.primary' }}>Leads landing page</Typography>
                        </Breadcrumbs>
                    </div>
                    <div>
                        <h2>Leads</h2>
                    </div>
                    <div>
                        <h3>Lista de Leads</h3>
                    </div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                        <p>Formulários enviados: {usuarios.length}</p>
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
                        // onClick={handleDownload}
                        >
                            Baixar CSV
                        </button>
                    </div>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        gap: "20px", // Adicionando espaçamento entre os gráficos
                        flexWrap: "wrap", // Permitindo que os gráficos se ajustem em telas menores
                        padding: "10px", // Padding geral para dar um espaçamento interno
                    }}>
                        <div style={{
                            flex: "1 1 45%", // Flexível, mas não ultrapassa 45% do espaço disponível
                            minWidth: "300px", // Largura mínima para os gráficos
                            maxWidth: "400px",
                            display: "flex",
                            justifyContent: "center", // Centralizando os gráficos
                        }}>
                            <Pie data={data} />
                        </div>
                        <div style={{
                            flex: "1 1 45%",
                            minWidth: "300px",
                            maxWidth: "600px",
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <Bar options={options} data={dataLoc} />
                        </div>
                        <div style={{
                            flex: "1 1 45%",
                            minWidth: "300px",
                            maxWidth: "600px",
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <Line options={options} data={dataHorario} />
                        </div>
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
                                    {["ID", "Nome", "E-mail", "Telefone", "Área trabalho", "Token", "Enviado em"].map((header) => (
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
                                {usuarios.map((usuario, i) => (
                                    <tr
                                        key={usuario?.idLeadForm}
                                        style={{
                                            background: i % 2 === 0 ? "#f9f9f9" : "#fff",
                                            transition: "all 0.2s ease-in-out",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#eef3f8")}
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = i % 2 === 0 ? "#f9f9f9" : "#fff")
                                        }
                                    >
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{usuario?.idLeadForm}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{usuario?.nome}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{usuario?.email}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px" }}>{MascaraTelefone(usuario?.telefone)}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{usuario?.areaTrabalho}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{usuario?.formToken}</td>
                                        <td style={{ padding: "14px 18px", fontSize: "14px", fontWeight: 500 }}>{formatData(usuario?.createdAt)}</td>
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

export default LeadsLandingPage;