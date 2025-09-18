import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Dashboard" element={<Dashboard />} />
				<Route path="/Assinaturas" element={<Assinaturas />} />
				<Route path="/Descontos" element={<Descontos />} />
				<Route path="/DescontosUsados/:idDesconto" element={<DescontosUsados />} />
				<Route path="/TermosDeUso" element={<TermosDeUso />} />
				<Route path="/Planos" element={<Planos />} />
				<Route path="/Usuarios" element={<Usuarios />} />
				<Route path="/Admins" element={<Admins />} />
				<Route path="/EsqueceuSenha" element={<EsqueceuSenha />} />
				<Route path="/Dashboard/Leads" element={<Leads />} />
			</Routes>
		</Router>
	);
}

export default App;
