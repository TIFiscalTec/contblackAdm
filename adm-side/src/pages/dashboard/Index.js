import Header from "../components/Header";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
import { useNavigate } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    const navigate = useNavigate();
    const [chartData, setChartData] = useState(null);
    const [cancelamentoData, setCancelamentoData] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/leads/recuperaveis`)
            .then(response => {
                const leads = response.data;

                const counts = {};
                leads.forEach(lead => {
                    counts[lead.stepAtual] = (counts[lead.stepAtual] || 0) + 1;
                });

                const labels = Object.keys(counts).sort((a, b) => a - b);
                const data = labels.map(step => counts[step]);

                setChartData({
                    labels: labels.map(label => `Step ${label}`),
                    datasets: [{
                        label: 'Leads que pararam nesse step',
                        data: data,
                        backgroundColor: 'rgba(255,99,132,0.6)',
                    }]
                });
            })
            .catch(error => console.error("Erro ao buscar leads:", error));

        axios.get(`${process.env.REACT_APP_API_URL}/listarCancelamentos`, {
            headers: { Authorization: token }
        })
            .then(response => {
                const cancelamentos = response.data.cancelamentos;

                const motivosCount = {};

                cancelamentos.forEach(item => {
                    item.motivosSelecionados.forEach(motivo => {
                        motivosCount[motivo] = (motivosCount[motivo] || 0) + 1;
                    });
                });

                const labels = Object.keys(motivosCount);
                const data = labels.map(label => motivosCount[label]);

                setCancelamentoData({
                    labels: labels,
                    datasets: [{
                        label: 'Quantidade de clientes',
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    }]
                });
            })
            .catch(error => console.error("Erro ao buscar cancelamentos:", error));
    }, [token]);

    return (
        <div>
            <Header />
            <div style={{ padding: "20px" }} >
                <h2>📊 Leads Perdidos</h2>
                {chartData ? (
                    <div style={{ maxWidth: '600px', marginBottom: '40px' }}>
                        <Bar data={chartData} onClick={() => navigate("../Dashboard/Leads")} />
                    </div>
                ) : (
                    <p>Carregando gráfico de leads...</p>
                )}

                <h2>📉 Motivos de Cancelamento</h2>
                {cancelamentoData ? (
                    <div style={{ maxWidth: '600px' }}>
                        <Bar data={cancelamentoData} />
                    </div>
                ) : (
                    <p>Carregando gráfico de cancelamentos...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
