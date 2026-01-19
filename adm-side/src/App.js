import { Routes, Route } from "react-router-dom";

import Login from "./pages/login/Index";
import Dashboard from "./pages/dashboard/Index";
import Assinaturas from "./pages/assinaturas/Index";
import Descontos from "./pages/descontos/Index";
import DescontosUsados from "./pages/descontosUsados/Index";
import TermosDeUso from "./pages/termosDeUso/Index";
import Planos from "./pages/planos/Index";
import Usuarios from "./pages/usuarios/Index";
import Admins from "./pages/usuarios/components/Admins";
import EsqueceuSenha from "./pages/esqueceuSenha/Index";
import Leads from "./pages/dashboard/components/Leads";
import EmitirNota from "./pages/emitirNota/Index";
import PerfilUsuario from "./pages/emitirNota/components/PerfilUsuario";
import PoliticaDePrivacidade from "./pages/politicaDePrivacidade/Index";
import LeadsLandingPage from "./pages/leadsLandingPage/Index";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/Dashboard" element={<Dashboard />} />
			<Route path="/Assinaturas" element={<Assinaturas />} />
			<Route path="/Descontos" element={<Descontos />} />
			<Route path="/DescontosUsados/:idDesconto" element={<DescontosUsados />} />
			<Route path="/TermosDeUso" element={<TermosDeUso />} />
			<Route path="/PoliticaDePrivacidade" element={<PoliticaDePrivacidade />} />
			<Route path="/Planos" element={<Planos />} />
			<Route path="/Usuarios" element={<Usuarios />} />
			<Route path="/Admins" element={<Admins />} />
			<Route path="/EsqueceuSenha" element={<EsqueceuSenha />} />
			<Route path="/Dashboard/Leads" element={<Leads />} />
			<Route path="/LeadsLandingPage" element={<LeadsLandingPage />} />
			<Route path="/EmitirNota" element={<EmitirNota />} />
			<Route path="/EmitirNota/Perfil/:idUsuario" element={<PerfilUsuario />} />
		</Routes>
	);
}

export default App;
