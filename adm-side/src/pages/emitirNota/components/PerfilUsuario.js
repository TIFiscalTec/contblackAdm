import Header from "../../components/Header";
import { MascaraCpf } from "../../../utils/MascaraCpf";
import { MascaraTelefone } from "../../../utils/MascaraTelefone";
import React, { useState, useEffect, useRef, use } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Breadcrumbs, Link, Button, Card, Divider, TextField, Autocomplete, MenuItem, Select, Checkbox, FormControlLabel, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, FormControl, InputLabel, OutlinedInput, FormHelperText, } from "@mui/material";
import { Visibility, VisibilityOff, Email as EmailIcon, VerifiedUser as VerifiedUserIcon, } from "@mui/icons-material";
import { MascaraCnpj } from "../../../utils/MascaraCnpj";
import { TirarMascara } from "../../../utils/TirarMascara";
import { MascaraValor } from "../../../utils/MascaraValor";
import { MascaraCep } from "../../../utils/MascaraCep";
import { FormatarData } from "../../../utils/FormatarData";
import ModalImage from "./ModalImage";


const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

function PerfilUsuario(props) {
    const { idUsuario } = useParams();

    const [showFichaCadastral, setShowFichaCadastral] = useState(false);
    const [showFichaDocumentos, setShowFichaDocumentos] = useState(false);

    const [motivoRejeicaoRgCnh, setMotivoRejeicaoRgCnh] = useState("");
    const [motivoRejeicaoComprovanteEndereco, setMotivoRejeicaoComprovanteEndereco] = useState("");
    const [motivoRejeicaoTituloEleitor, setMotivoRejeicaoTituloEleitor] = useState("");

    const [fichaCadastral, setFichaCadastral] = useState({});
    const [fichaDocumentos, setFichaDocumentos] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [certificado, setCertificado] = useState({});
    const [servicos, setServicos] = useState([]);
    const [hasTomador, setHasTomador] = useState(true);
    const [certificadoLoading, setCertificadoLoading] = useState(false);
    const [servicoLoading, setServicoLoading] = useState(false);
    const [empresaLoading, setEmpresaLoading] = useState(false);
    const [notaLoading, setNotaLoading] = useState(false);
    const [limiteNotas, setLimiteNotas] = useState(0);
    const [qtdEmitidas, setQtdEmitidas] = useState(0);
    const token = localStorage.getItem('token');

    const [cnpjEmpresa, setCnpjEmpresa] = useState('');
    const [inscricaoEstadualEmpresa, setInscricaoEstadualEmpresa] = useState('');
    const [inscricaoMunicipalEmpresa, setInscricaoMunicipalEmpresa] = useState('');
    const [razaoSocialEmpresa, setRazaoSocialEmpresa] = useState('');
    const [nomeFantasiaEmpresa, setNomeFantasiaEmpresa] = useState('');
    const [simplesNacionalEmpresa, setSimplesNacionalEmpresa] = useState('');
    const [regimeTributarioEmpresa, setRegimeTributarioEmpresa] = useState('');
    const [incentivoFiscalEmpresa, setIncentivoFiscalEmpresa] = useState('');
    const [incentivoCulturalEmpresa, setIncentivoCulturalEmpresa] = useState('');
    const [regimeTributarioEspecialEmpresa, setRegimeTributarioEspecialEmpresa] = useState('');
    const [cepEmpresa, setCepEmpresa] = useState('');
    const [enderecoEmpresa, setEnderecoEmpresa] = useState('');
    const [numeroEmpresa, setNumeroEmpresa] = useState('');
    const [estadoEmpresa, setEstadoEmpresa] = useState('');
    const [cidadeEmpresa, setCidadeEmpresa] = useState('');
    const [bairroEmpresa, setBairroEmpresa] = useState('');
    const [emailEmpresa, setEmailEmpresa] = useState('');
    const [telefoneEmpresa, setTelefoneEmpresa] = useState('');

    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar o modal
    const [selectedImage, setSelectedImage] = useState(''); // Estado para armazenar a imagem selecionada

    // Função para abrir o modal e definir a imagem selecionada
    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalOpen(true);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(''); // Limpar a imagem selecionada
    };

    useEffect(() => {
        const getInfoUsuario = async () => {
            const responseUser = await axios.get(`${process.env.REACT_APP_API_URL}/getInfoPerfilUsuario/${idUsuario}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            if (responseUser.data.status !== 200) {
                alert("Erro ao buscar informações do usuário.");
                return;
            }
            console.log(responseUser.data.dados);
            setUserInfo(responseUser.data.dados.usuario);
            setCertificado(responseUser.data.dados.certificado);
            setServicos(responseUser.data.dados.servicos);
            if (responseUser.data.dados.assinatura) {
                setLimiteNotas(responseUser.data.dados.assinatura.plano.qtdNfseMensalClarea);
            }
            setQtdEmitidas(responseUser.data.dados.notasEmitidasbyClarea);

            setCnpjEmpresa(responseUser.data.dados.empresa.cnpj);
            setInscricaoEstadualEmpresa(responseUser.data.dados.empresa.inscricaoEstadual);
            setInscricaoMunicipalEmpresa(responseUser.data.dados.empresa.inscricaoMunicipal);
            setRazaoSocialEmpresa(responseUser.data.dados.empresa.razaoSocial);
            setNomeFantasiaEmpresa(responseUser.data.dados.empresa.nomeFantasia);
            setSimplesNacionalEmpresa(responseUser.data.dados.empresa.simplesNacional);
            setRegimeTributarioEmpresa(responseUser.data.dados.empresa.regimeTributario);
            setIncentivoFiscalEmpresa(responseUser.data.dados.empresa.incentivoFiscal);
            setIncentivoCulturalEmpresa(responseUser.data.dados.empresa.incentivadorCultural);
            setRegimeTributarioEspecialEmpresa(responseUser.data.dados.empresa.regimeTributarioEspecial);
            setCepEmpresa(responseUser.data.dados.empresa.cep);
            setEnderecoEmpresa(responseUser.data.dados.empresa.logradouro);
            setNumeroEmpresa(responseUser.data.dados.empresa.numero);
            setEstadoEmpresa(responseUser.data.dados.empresa.estado);
            setCidadeEmpresa(responseUser.data.dados.empresa.cidade);
            setBairroEmpresa(responseUser.data.dados.empresa.bairro);
            setEmailEmpresa(responseUser.data.dados.empresa.email);
            setTelefoneEmpresa(responseUser.data.dados.empresa.telefone);
        }

        getInfoUsuario();
    }, [idUsuario, certificadoLoading, servicoLoading, empresaLoading, notaLoading]);

    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [codigo, setCodigo] = useState("");
    const [codigoTributacao, setCodigoTributacao] = useState("");
    const [discriminacao, setDiscriminacao] = useState("");
    const [cnae, setCnae] = useState("");
    const [tipoTributacao, setTipoTributacao] = useState("");
    const [exigibilidade, setExigibilidade] = useState("");
    const [aliquota, setAliquota] = useState("");
    const fileInputRef = useRef(null);

    // Funções de drag and drop
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        validateFile(droppedFile);
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        validateFile(selectedFile);
    };

    const validateFile = (file) => {
        if (file && (file.name.endsWith(".pfx") || file.name.endsWith(".p12"))) {
            setFile(file);
        } else {
            alert("Por favor, selecione um arquivo .pfx ou .p12 válido.");
        }
    };

    // Controle da visibilidade da senha
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleSaveUserInfo = () => {
        console.log("Salvar informações do usuário:", userInfo);
    }

    const handleSaveCertificado = async () => {
        if (!file) return alert("Selecione um arquivo de certificado.");
        if (!senha) return alert("Digite a senha do certificado.");

        const formData = new FormData();
        formData.append("arquivo", file);
        formData.append("senha", senha);
        formData.append("email", userInfo.Email);
        formData.append("idUsuario", idUsuario);

        try {
            setCertificadoLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/uploadCertificadoADM`, formData, {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Resposta do upload:", data);
            if (data.status === 200) {
                alert("Certificado atualizado com sucesso!");
            } else {
                alert("Falha ao atualizar certificado. Verifique os dados e tente novamente.");
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao enviar o certificado. Tente novamente mais tarde.");
        } finally {
            setCertificadoLoading(false);
        }
    }

    const handleSaveServico = async () => {
        if (!codigo || !discriminacao) {
            return alert("Preencha todos os campos para adicionar um serviço.");
        }

        try {
            setServicoLoading(true);
            await axios.post(`${process.env.REACT_APP_API_URL}/adicionarServicoADM`, {
                idUsuario: Number(idUsuario),
                codigo,
                discriminacao,
                cnae
            }, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (err) {
            console.error(err);
            alert("Erro ao adicionar serviço. Tente novamente mais tarde.");
        } finally {
            setCodigo('');
            setDiscriminacao('');
            setCnae('');
            setServicoLoading(false);
        }

    }

    const [cpfCnpjTomador, setCpfCnpjTomador] = useState('');
    const [razaoSocialTomador, setRazaoSocialTomador] = useState('');
    const [emailTomador, setEmailTomador] = useState('');
    const [inscricaoMunicipalTomador, setInscricaoMunicipalTomador] = useState('');
    const [cepTomador, setCepTomador] = useState('');
    const [enderecoTomador, setEnderecoTomador] = useState('');
    const [numeroTomador, setNumeroTomador] = useState('');
    const [estadoTomador, setEstadoTomador] = useState('');
    const [cidadeTomador, setCidadeTomador] = useState('');
    const [bairroTomador, setBairroTomador] = useState('');
    const [servicoSelecionado, setServicoSelecionado] = useState(null);
    const [valorServico, setValorServico] = useState('0');
    const [descontoCondicionado, setDescontoCondicionado] = useState('0');
    const [descontoIncondicionado, setDescontoIncondicionado] = useState('0');

    const handleEmitirNota = async () => {
        console.log(servicoSelecionado)
        console.log(Number((Number(valorServico.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)));
        let body = { hasTomador, idUsuario: Number(idUsuario) }

        if (!servicoSelecionado) {
            alert('Por favor, selecione um serviço.');
            return;
        }
        if (!valorServico || Number(valorServico.replace(/\./g, '').replace(',', '.')) <= 0) {
            alert('Por favor, informe um valor de serviço válido.');
            return;
        }
        if (hasTomador) {
            if (!cpfCnpjTomador || !razaoSocialTomador) {
                alert('Por favor, preencha todos os dados do tomador.');
                return;
            }
            body = {
                cpfCnpjTomador: TirarMascara(cpfCnpjTomador),
                razaoSocialTomador,
                emailTomador,
                inscricaoMunicipalTomador,
                cepTomador,
                enderecoTomador,
                numeroTomador,
                estadoTomador,
                cidadeTomador,
                bairroTomador,
                servicoSelecionado,
                tipoTributacao,
                exigibilidade,
                aliquota: aliquota ? parseFloat(String(aliquota).replace(",", ".")) : 0,
                valorServico: Number((Number(valorServico.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                descontoCondicionado: Number((Number(descontoCondicionado.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                descontoIncondicionado: Number((Number(descontoIncondicionado.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                hasTomador,
                idUsuario: Number(idUsuario)
            }
        } else {
            body = {
                servicoSelecionado,
                tipoTributacao,
                exigibilidade,
                aliquota: aliquota ? parseFloat(String(aliquota).replace(",", ".")) : 0,
                valorServico: Number((Number(valorServico.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                descontoCondicionado: Number((Number(descontoCondicionado.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                descontoIncondicionado: Number((Number(descontoIncondicionado.replace(/\./g, '').replace(',', '.')) * 10).toFixed(2)),
                hasTomador,
                idUsuario: Number(idUsuario)
            }
        }
        setNotaLoading(true);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/emitirNotaServicoADM`, body, {
            headers: {
                Authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        if (response.data.status === 200) {
            setNotaLoading(false);
            alert('Nota fiscal emitida com sucesso!');
            setCpfCnpjTomador('');
            setRazaoSocialTomador('');
            setEmailTomador('');
            setInscricaoMunicipalTomador('');
            setCepTomador('');
            setEnderecoTomador('');
            setNumeroTomador('');
            setEstadoTomador('');
            setCidadeTomador('');
            setBairroTomador('');
            setTipoTributacao('');
            setExigibilidade('');
            setAliquota('')
            setServicoSelecionado(null);
            setValorServico('0');
            setDescontoCondicionado('0');
            setDescontoIncondicionado('0');
        } else {
            setNotaLoading(false);
            alert('Erro ao emitir nota fiscal: ' + response.data);
        }
    }

    const handleSaveCompany = async () => {
        let isValid = true;
        console.log(cnpjEmpresa.length)
        if (cnpjEmpresa.length !== 14) {
            isValid = false;
            alert("CNPJ inválido.");
        }

        if (razaoSocialEmpresa.trim() === "") {
            isValid = false;
            alert("Razão Social é obrigatória.");
        }

        if (simplesNacionalEmpresa === "") {
            isValid = false;
            alert("Simples Nacional é obrigatório.");
        }

        if (inscricaoMunicipalEmpresa.trim() === "") {
            isValid = false;
            alert("Inscrição Municipal é obrigatória.");
        }

        if (regimeTributarioEmpresa === "") {
            isValid = false;
            alert("Regime Tributário é obrigatório.");
        }

        if (regimeTributarioEspecialEmpresa === "") {
            isValid = false;
            alert("Regime Tributário Especial é obrigatório.");
        }

        if (cepEmpresa.trim() === "" || cepEmpresa.length < 8) {
            isValid = false;
            alert("CEP é obrigatório e deve ter 8 caracteres.");
        }


        if (isValid) {
            setEmpresaLoading(true);
            const dadosEnderecoViaCep = await axios.get(`https://viacep.com.br/ws/${cepEmpresa.replace(/\D/g, "")}/json/`);
            let objetoPlugNotas = {
                "cpfCnpj": cnpjEmpresa.replace(/\D/g, ""),
                "inscricaoMunicipal": inscricaoMunicipalEmpresa,
                "inscricaoEstadual": inscricaoEstadualEmpresa,
                "razaoSocial": razaoSocialEmpresa,
                "nomeFantasia": nomeFantasiaEmpresa,
                "certificado": null,
                "simplesNacional": simplesNacionalEmpresa,
                "regimeTributario": regimeTributarioEmpresa,
                "incentivoFiscal": incentivoFiscalEmpresa,
                "incentivadorCultural": incentivoCulturalEmpresa,
                "regimeTributarioEspecial": regimeTributarioEspecialEmpresa,
                "endereco": {
                    "tipoLogradouro": dadosEnderecoViaCep.data.logradouro ? dadosEnderecoViaCep.data.logradouro.split(" ")[0] : "",
                    "logradouro": enderecoEmpresa,
                    "numero": numeroEmpresa,
                    "complemento": dadosEnderecoViaCep.data.complemento || "",
                    "tipoBairro": "",
                    "bairro": bairroEmpresa,
                    "codigoPais": "1058",
                    "descricaoPais": "Brasil",
                    "codigoCidade": dadosEnderecoViaCep.data.ibge || "",
                    "descricaoCidade": cidadeEmpresa,
                    "estado": estadoEmpresa,
                    "cep": cepEmpresa.slice(0, 5) + "-" + cepEmpresa.slice(5).trim(),
                },
                "telefone": {
                    "ddd": dadosEnderecoViaCep.data.ddd || "",
                    "numero": telefoneEmpresa.slice(4).trim()
                },
                "email": emailEmpresa,
                "nfse": {
                    "ativo": true,
                    "tipoContrato": 0,
                },
            }
            const objetoReq = {
                objetoPlugNotas,
                idUsuario: Number(idUsuario)
            }

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/salvarDadosEmpresaADM`, objetoReq, {
                headers: { Authorization: token },
            });
            if (response.data.status === 200) {
                alert("Dados da empresa salvos com sucesso!");
                setEmpresaLoading(false);
            } else {
                alert("Falha ao salvar os dados da empresa. Verifique os dados e tente novamente.");
                setEmpresaLoading(false);
            }
        }
    }

    const handleCnpj = async (e) => {
        setCnpjEmpresa(TirarMascara(e.target.value));
        if (e.target.value.length === 18) {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/buscarCnpj`, {
                headers: { Authorization: token },
            });
            if (response.data.status === 200) {
                setRazaoSocialEmpresa(response.data.data.razao_social);
                setNomeFantasiaEmpresa(response.data.data.nome);
                setCepEmpresa(response.data.data.endereco.cep);
                setEnderecoEmpresa(response.data.data.endereco.logradouro);
                setNumeroEmpresa(response.data.data.endereco.numero);
                setEstadoEmpresa(response.data.data.endereco.uf);
                setCidadeEmpresa(response.data.data.endereco.municipio);
                setBairroEmpresa(response.data.data.endereco.bairro);
                setTelefoneEmpresa(response.data.data.telefone);
                setEmailEmpresa(response.data.data.email);
            } else {
                alert("Cnpj não encontrado");
            }
            console.log(response);
        }
    }

    const handleCnpjTomador = async (e) => {
        let value = e.target.value;
        if (!value) return;

        const somenteNumeros = value.replace(/\D/g, "");

        // CPF até 11 dígitos | CNPJ até 14 dígitos
        if (somenteNumeros.length <= 11) {
            setCpfCnpjTomador(MascaraCpf(value));
            return;
        }

        // Caso seja CNPJ
        setCpfCnpjTomador(MascaraCnpj(value));

        // Só faz a busca quando o CNPJ estiver completo (14 dígitos)
        if (somenteNumeros.length !== 14) return;

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/buscarCnpj/${somenteNumeros}`,
                { headers: { Authorization: token } }
            );

            if (response.data?.status === 200) {
                const dados = response.data.data;

                setRazaoSocialTomador(dados.razao_social || "");
                setCepTomador(dados.endereco?.cep || "");
                setEnderecoTomador(dados.endereco?.logradouro || "");
                setNumeroTomador(dados.endereco?.numero || "");
                setEstadoTomador(dados.endereco?.uf || "");
                setCidadeTomador(dados.endereco?.municipio || "");
                setBairroTomador(dados.endereco?.bairro || "");
                setEmailTomador(dados.email || "");
            } else {
                alert("CNPJ não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar CNPJ:", error);
            alert("Não foi possível buscar os dados do CNPJ. Tente novamente mais tarde.");
        }
    };

    const handleDownload = (tipo, cnpj) => {
        // Ex: tipo = "pdf" ou "xml"
        const url = `${process.env.REACT_APP_API_URL}/download/${tipo}/${cnpj}`;
        window.open(url, "_blank");
    };

    useEffect(() => {
        const getFichaCadastral = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getFichaCadastralADM/${idUsuario}`, {
                headers: {
                    Authorization: token
                }
            });

            setFichaCadastral(response.data.ficha);
            const documentos = await axios.get(`${process.env.REACT_APP_API_URL}/getDocumentosUsuarioADM/${idUsuario}`, {
                headers: {
                    Authorization: token
                }
            });
            console.log(documentos.data.documentos);
            setFichaDocumentos(documentos.data.documentos);
        }

        getFichaCadastral();
    }, [idUsuario, token]);


    const handleRejeitarDoc = async (tipoDoc) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/rejeitarDocumentoADM/${tipoDoc}`, {
            idUsuario: Number(idUsuario),
            motivoRejeicao: tipoDoc === "rgCnh" ? motivoRejeicaoRgCnh : tipoDoc === "comprovanteEndereco" ? motivoRejeicaoComprovanteEndereco : motivoRejeicaoTituloEleitor
        }, {
            headers: {
                Authorization: token
            }
        });
        console.log(response.data);
        setFichaDocumentos(response.data.documentos);

    }

    const handleAceitarDoc = async (tipoDoc) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/aceitarDocumentoADM/${tipoDoc}`, {
            idUsuario: Number(idUsuario),
            motivoRejeicao: tipoDoc === "rgCnh" ? motivoRejeicaoRgCnh : tipoDoc === "comprovanteEndereco" ? motivoRejeicaoComprovanteEndereco : motivoRejeicaoTituloEleitor
        }, {
            headers: {
                Authorization: token
            }
        });
        console.log(response.data);
        setFichaDocumentos(response.data.documentos);

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
                            <Link underline="hover" color="inherit" href="/EmitirNota">
                                Emitir Nota
                            </Link>
                            <Typography sx={{ color: 'text.primary' }}>Perfil Usuário</Typography>
                        </Breadcrumbs>
                    </div>
                    <div>
                        <h2>Perfil do Usuário {userInfo?.Nome || ""}</h2>
                    </div>
                    <div>
                        <h3>Dados do Usuário</h3>
                    </div>
                    <div style={{ width: "100%", overflowX: "auto", marginTop: "20px", display: "flex", justifyContent: "center" }}>
                        <div style={{ width: "90%", overflowX: "auto", marginTop: "20px", display: "flex", justifyContent: "center", gap: "50px", flexDirection: "column", paddingBottom: "50px" }}>
                            <Card
                                sx={{
                                    width: "100%",
                                    borderRadius: "5px",
                                    backgroundColor: "#f7f7f7ff",
                                }}
                            >
                                <div style={{ padding: "15px" }}>
                                    <h2>Baixar Documentos Fiscais</h2>
                                </div>

                                <Divider />

                                <div
                                    style={{
                                        padding: "15px",
                                        backgroundColor: "#ffffff",
                                        borderRadius: "0 0 5px 5px",
                                        marginTop: "20px",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: "10px",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            backgroundColor: "#0b243d",
                                            "&:hover": { backgroundColor: "#153d66" },
                                            textTransform: "none",
                                        }}
                                        onClick={() => handleDownload("pdf", cnpjEmpresa)}
                                    >
                                        Baixar PDFs
                                    </Button>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            backgroundColor: "#00695c",
                                            "&:hover": { backgroundColor: "#00897b" },
                                            textTransform: "none",
                                        }}
                                        onClick={() => handleDownload("xml", cnpjEmpresa)}
                                    >
                                        Baixar XMLs
                                    </Button>
                                </div>
                            </Card>

                            <Card style={{ width: "100%", borderRadius: "5px", backgroundColor: "#f7f7f7ff" }}>
                                <div style={{ padding: "15px", width: "100%", borderRadius: "5px", backgroundColor: "#f7f7f7ff", cursor: "pointer" }} onClick={() => {
                                    if (showFichaCadastral) {
                                        setShowFichaCadastral(false)
                                    } else {
                                        setShowFichaCadastral(true)
                                    }
                                }}>
                                    <h2>Ficha Cadastral</h2>
                                    <p>{fichaCadastral?.ficha?.progress === 100 ? <p style={{ color: "green" }}>Usuário preencheu todos os campos obrigatórios</p> : <p style={{ color: "red" }}>Usuário não preencheu todos os campos obrigatórios</p>}</p>
                                </div>
                                <Divider />
                                <div style={{ padding: "15px", display: showFichaCadastral ? "block" : "none", transition: "all 0.3s ease-in-out" }}>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px" }}>
                                        <TextField label="Data nascimento" sx={{ width: "48%" }} variant="standard" value={FormatarData(fichaCadastral?.ficha?.dataNascimento) || ''} />
                                        <TextField label="RG" sx={{ width: "48%" }} variant="standard" value={fichaCadastral?.ficha?.rg || ''} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="Orgão RG" sx={{ width: "48%" }} variant="standard" value={fichaCadastral?.ficha?.orgaoRg || ''} />
                                        <TextField label="Título Eleitor" sx={{ width: "48%" }} variant="standard" value={fichaCadastral?.ficha?.tituloEleitor || ''} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="PIS/NIS/NIT" sx={{ width: "48%" }} variant="standard" value={fichaCadastral?.ficha?.pisNisNit || ''} />
                                        <TextField label="CNH" sx={{ width: "48%" }} variant="standard" value={fichaCadastral?.ficha?.cnh || ''} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="Estado emissão CNH" sx={{ width: "48%" }} variant="standard" value={fichaCadastral?.ficha?.estadoEmissaoCnh || ''} />
                                        <TextField label="Naturalidade" sx={{ width: "48%" }} variant="standard" value={fichaCadastral?.ficha?.naturalidade || ''} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="Endereço" sx={{ width: "100%" }} variant="standard" value={`${fichaCadastral?.endereco?.Endereco}, ${fichaCadastral?.endereco?.Numero} - ${fichaCadastral?.endereco?.Cidade}, ${fichaCadastral?.endereco?.Estado}, ${fichaCadastral?.endereco?.Cep} ${fichaCadastral?.endereco?.Complemento}` || ''} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="Estado Civil" sx={{ width: "33%" }} variant="standard" value={fichaCadastral?.ficha?.estadoCivil || ''} />
                                        <TextField label="Regime de bens" sx={{ width: "33%" }} variant="standard" value={fichaCadastral?.ficha?.regimeBens || ''} />
                                        <TextField label="CPF Conjuge" sx={{ width: "33%" }} variant="standard" value={fichaCadastral?.ficha?.cpfConjugue || ''} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="CNPJ" sx={{ width: "48%" }} variant="standard" value={fichaCadastral?.ficha?.cnpj || ''} />
                                        <TextField label="Senha Gov" sx={{ width: "48%" }} variant="standard" value={fichaCadastral?.ficha?.senhaGov || ''} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="Endereço fiscal" sx={{ width: "100%" }} variant="standard" value={fichaCadastral?.ficha?.enderecoFiscal || ''} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="Razão Social" sx={{ width: "100%" }} variant="standard" value={fichaCadastral?.ficha?.razaoSocial || ''} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="Nome Fantasia" sx={{ width: "100%" }} variant="standard" value={fichaCadastral?.ficha?.nomeFantasia || ''} />
                                    </div>
                                </div>
                            </Card >

                            <Card style={{ width: "100%", borderRadius: "5px", backgroundColor: "#f7f7f7ff" }}>
                                <div style={{ padding: "15px", width: "100%", borderRadius: "5px", backgroundColor: "#f7f7f7ff", cursor: "pointer" }} onClick={() => {
                                    if (showFichaDocumentos) {
                                        setShowFichaDocumentos(false)
                                    } else {
                                        setShowFichaDocumentos(true)
                                    }
                                }}>
                                    <h2>Ficha de Documentos</h2>
                                    <p>{fichaDocumentos?.rgCnhFileName !== null && fichaDocumentos?.tituloEleitorFileName !== null && fichaDocumentos?.comprovanteResidenciaFileName !== null ? <span style={{color: "green"}}>Usuário enviou todos os documentos</span> : <span style={{color: "red"}}>Usuário não enviou todos os documentos</span>}</p>
                                </div>
                                <Divider />
                                <div style={{ padding: "15px", display: showFichaDocumentos ? "block" : "none", transition: "all 0.3s ease-in-out" }}>
                                    <div style={{ width: "100%", height: "fit-content", padding: "20px", borderRadius: "8px", border: "1px solid #e0e0e0", backgroundColor: "#f9f9f9", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                                        <div style={{ marginBottom: "15px" }}>
                                            <h3 style={{ fontWeight: "600", color: "#333" }}>RG ou CNH</h3>
                                        </div>
                                        <Divider style={{ marginBottom: "15px" }} />
                                        {fichaDocumentos?.rgCnhStatus === "Em Análise" || fichaDocumentos?.rgCnhStatus === "Aprovado" ? (
                                            <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
                                                <img
                                                    src={fichaDocumentos?.rgCnhFileName}
                                                    alt="RG ou CNH"
                                                    style={{
                                                        width: "48%",
                                                        maxHeight: "300px",
                                                        objectFit: "contain",
                                                        borderRadius: "8px",
                                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                                                    }}
                                                    onClick={() => openModal(fichaDocumentos?.rgCnhFileName)}
                                                />
                                                <div style={{ width: "50%", display: fichaDocumentos?.rgCnhStatus === "Aprovado" ? "none" : "block" }}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-multiline-static"
                                                        label="Motivo da reprovação"
                                                        multiline
                                                        rows={4}
                                                        defaultValue="O documento foi reprovado por: ..."
                                                        variant="outlined"
                                                        style={{ marginBottom: "20px", borderRadius: "8px" }}
                                                        value={motivoRejeicaoRgCnh}
                                                        onChange={(e) => setMotivoRejeicaoRgCnh(e.target.value)}
                                                    />
                                                    <div style={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: "red",
                                                                '&:hover': { backgroundColor: "#e57373" },
                                                                borderRadius: "6px",
                                                                padding: "6px 12px"
                                                            }}
                                                            onClick={() => handleRejeitarDoc("rgCnh")}
                                                        >
                                                            Reprovar Documento
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: "green",
                                                                '&:hover': { backgroundColor: "#81c784" },
                                                                borderRadius: "6px",
                                                                padding: "6px 12px"
                                                            }}
                                                            onClick={() => handleAceitarDoc("rgCnh")}

                                                        >
                                                            Aceitar Documento
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p>Usuário não enviou o documento.</p>
                                        )}
                                    </div>



                                    <div style={{ width: "100%", height: "fit-content", marginTop: "20px", padding: "20px", borderRadius: "8px", border: "1px solid #e0e0e0", backgroundColor: "#f9f9f9", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                                        <div style={{ marginBottom: "15px" }}>
                                            <h3 style={{ fontWeight: "600", color: "#333" }}>Titulo de Eleitor</h3>
                                        </div>
                                        <Divider style={{ marginBottom: "15px" }} />
                                        {fichaDocumentos?.tituloEleitorStatus === "Em Análise" || fichaDocumentos?.tituloEleitorStatus === "Aprovado" ? (
                                            <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
                                                <img
                                                    src={fichaDocumentos?.tituloEleitorFileName}
                                                    alt="Titulo de Eleitor"
                                                    style={{
                                                        width: "48%",
                                                        maxHeight: "300px",
                                                        objectFit: "contain",
                                                        borderRadius: "8px",
                                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                                                    }}
                                                    onClick={() => openModal(fichaDocumentos?.tituloEleitorFileName)}

                                                />
                                                <div style={{ width: "50%",display: fichaDocumentos?.tituloEleitorStatus === "Aprovado" ? "none" : "block" }}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-multiline-static"
                                                        label="Motivo da reprovação"
                                                        multiline
                                                        rows={4}
                                                        defaultValue="O documento foi reprovado por: ..."
                                                        variant="outlined"
                                                        style={{ marginBottom: "20px", borderRadius: "8px" }}
                                                        value={motivoRejeicaoTituloEleitor}
                                                        onChange={(e) => setMotivoRejeicaoTituloEleitor(e.target.value)}
                                                    />
                                                    <div style={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: "red",
                                                                '&:hover': { backgroundColor: "#e57373" },
                                                                borderRadius: "6px",
                                                                padding: "6px 12px"
                                                            }}
                                                            onClick={() => handleRejeitarDoc("tituloEleitor")}
                                                        >
                                                            Reprovar Documento
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: "green",
                                                                '&:hover': { backgroundColor: "#81c784" },
                                                                borderRadius: "6px",
                                                                padding: "6px 12px"
                                                            }}
                                                            onClick={() => handleAceitarDoc("tituloEleitor")}

                                                        >
                                                            Aceitar Documento
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p>Usuário não enviou o documento.</p>
                                        )}
                                    </div>




                                    <div style={{ width: "100%", height: "fit-content", marginTop: "20px", padding: "20px", borderRadius: "8px", border: "1px solid #e0e0e0", backgroundColor: "#f9f9f9", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                                        <div style={{ marginBottom: "15px" }}>
                                            <h3 style={{ fontWeight: "600", color: "#333" }}>Comprovante de Residência</h3>
                                        </div>
                                        <Divider style={{ marginBottom: "15px" }} />
                                        {fichaDocumentos?.comprovanteResidenciaStatus === "Em Análise" || fichaDocumentos?.comprovanteResidenciaStatus === "Aprovado" ? (
                                            <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
                                                <img
                                                    src={fichaDocumentos?.comprovanteResidenciaFileName}
                                                    alt="Comprovante de Residência"
                                                    style={{
                                                        width: "48%",
                                                        maxHeight: "300px",
                                                        objectFit: "contain",
                                                        borderRadius: "8px",
                                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                                                    }}
                                                    onClick={() => openModal(fichaDocumentos?.comprovanteResidenciaFileName)}

                                                />
                                                <div style={{ width: "50%", display: fichaDocumentos?.comprovanteResidenciaStatus === "Aprovado" ? "none" : "block" }}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-multiline-static"
                                                        label="Motivo da reprovação"
                                                        multiline
                                                        rows={4}
                                                        defaultValue="O documento foi reprovado por: ..."
                                                        variant="outlined"
                                                        style={{ marginBottom: "20px", borderRadius: "8px" }}
                                                        value={motivoRejeicaoComprovanteEndereco}
                                                        onChange={(e) => setMotivoRejeicaoComprovanteEndereco(e.target.value)}
                                                    />
                                                    <div style={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: "red",
                                                                '&:hover': { backgroundColor: "#e57373" },
                                                                borderRadius: "6px",
                                                                padding: "6px 12px"
                                                            }}
                                                            onClick={() => handleRejeitarDoc("comprovanteResidencia")}
                                                        >
                                                            Reprovar Documento
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: "green",
                                                                '&:hover': { backgroundColor: "#81c784" },
                                                                borderRadius: "6px",
                                                                padding: "6px 12px"
                                                            }}
                                                            onClick={() => handleAceitarDoc("comprovanteResidencia")}

                                                        >
                                                            Aceitar Documento
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p>Usuário não enviou o documento.</p>
                                        )}
                                    </div>


                                </div>
                            </Card >

                            <Card style={{ width: "100%", borderRadius: "5px", backgroundColor: "#f7f7f7ff" }}>
                                <div style={{ padding: "15px" }}>
                                    <h2>Informações do usuário</h2>
                                </div>
                                <Divider />
                                <div style={{ padding: "15px" }}>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px" }}>
                                        <TextField label="Nome" sx={{ width: "48%" }} variant="standard" value={userInfo?.Nome || ''} onChange={(e) => setUserInfo({ ...userInfo, Nome: e.target.value })} />
                                        <TextField label="Email" sx={{ width: "48%" }} variant="standard" value={userInfo?.Email || ''} onChange={(e) => setUserInfo({ ...userInfo, Email: e.target.value })} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="CPF" sx={{ width: "48%" }} variant="standard" value={MascaraCpf(userInfo?.Cpf)} onChange={e => setUserInfo({ ...userInfo, Cpf: e.target.value.replaceAll(/\D/g, '') })} inputProps={{ maxLength: 14 }} />
                                        <TextField label="Telefone" sx={{ width: "48%" }} variant="standard" value={MascaraTelefone(userInfo?.Telefone)} onChange={e => setUserInfo({ ...userInfo, Telefone: e.target.value.replaceAll(/\D/g, '') })} inputProps={{ maxLength: 14 }} />
                                    </div>
                                </div>
                                <div style={{ padding: "15px", backgroundColor: "#ffffffff", borderRadius: "0 0 5px 5px", marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="contained" disabled size="small" sx={{ backgroundColor: "#0b243d" }} onClick={(handleSaveUserInfo)}>Salvar alterações</Button>
                                </div>
                            </Card >

                            <Card style={{ width: "100%", borderRadius: "5px", backgroundColor: "#f7f7f7ff" }}>
                                <div style={{ padding: "15px" }}>
                                    <h2>Certificado Digital</h2>
                                </div>
                                <Divider />
                                <div style={{ padding: "15px" }}>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        {certificado ? (
                                            "Você possui um certificado digital ativo. Para atualizá-lo, envie um novo arquivo abaixo."
                                        ) : (
                                            <span style={{ color: "#f44336" }}>
                                                Você não possui um certificado digital ativo. Por favor, envie seu certificado.
                                            </span>
                                        )}
                                    </Typography>

                                    {/* Certificado ativo */}
                                    {certificado && (
                                        <Box
                                            sx={{
                                                border: "1px solid #ffc845",
                                                borderRadius: 2,
                                                p: 2,
                                                mb: 3,
                                                backgroundColor: "#fff8e1",
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <VerifiedUserIcon sx={{ fontSize: 25, color: "#ffc845" }} />
                                                <Typography sx={{ color: "#ffc845", fontWeight: 500 }}>
                                                    Certificado Ativo: <strong>{certificado?.arquivoNome}</strong>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                    {/* Upload do certificado */}
                                    <Typography sx={{ mb: 1 }}>
                                        Arquivo do Certificado (.pfx ou .p12):
                                    </Typography>
                                    <Box
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current.click()}
                                        sx={{
                                            border: "2px dashed #ccc",
                                            borderRadius: 2,
                                            p: 4,
                                            textAlign: "center",
                                            cursor: "pointer",
                                            borderColor: isDragging ? "#ffc845" : "#ccc",
                                            backgroundColor: isDragging ? "#fffbe6" : "transparent",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        {file ? (
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {file.name}
                                            </Typography>
                                        ) : (
                                            <>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    Arraste e solte o arquivo do certificado aqui
                                                </Typography>
                                                <Typography variant="body2" sx={{ my: 1 }}>
                                                    ou
                                                </Typography>
                                                <Button variant="outlined" onClick={() => fileInputRef.current.click()}>
                                                    Procurar Arquivo
                                                </Button>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept=".pfx,.p12"
                                            ref={fileInputRef}
                                            onChange={handleFileSelect}
                                            style={{ display: "none" }}
                                        />
                                    </Box>

                                    {/* Senha do certificado */}
                                    <FormControl sx={{ mt: 3 }} fullWidth size="small" variant="outlined" autoComplete="off">
                                        <InputLabel htmlFor="outlined-adornment-password">Senha do Certificado</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            name="fakepassword"
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                            placeholder="Digite a senha do seu certificado"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        aria-label="toggle password visibility"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Senha do Certificado"
                                        />
                                        <FormHelperText>
                                            A senha é necessária para validar o arquivo do certificado.
                                        </FormHelperText>
                                    </FormControl>
                                    {/* E-mail */}
                                    <FormControl sx={{ mt: 3 }} fullWidth size="small" variant="outlined">
                                        <InputLabel>E-mail para notificação</InputLabel>
                                        <OutlinedInput
                                            value={userInfo?.Email || ''}
                                            disabled
                                            placeholder="Digite seu e-mail"
                                            type="email"
                                            autoComplete="off"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            }
                                            label="E-mail para notificação"
                                        />
                                        <FormHelperText>
                                            Enviaremos notificações para este e-mail quando o certificado estiver próximo do vencimento.
                                        </FormHelperText>
                                    </FormControl>
                                </div>
                                <div style={{ padding: "15px", backgroundColor: "#ffffffff", borderRadius: "0 0 5px 5px", marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="contained" size="small" sx={{ backgroundColor: "#0b243d" }} onClick={handleSaveCertificado} loading={certificadoLoading}>Salvar certificado</Button>
                                </div>
                            </Card >

                            <Card style={{ width: "100%", borderRadius: "5px", backgroundColor: "#f7f7f7ff" }}>
                                <div style={{ padding: "15px" }}>
                                    <h2>Informações da Empresa</h2>
                                </div>
                                <Divider />
                                <div style={{ padding: "15px" }}>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px" }}>
                                        <TextField label="CNPJ" disabled={!certificado} sx={{ width: "30%" }} value={MascaraCnpj(cnpjEmpresa)} onChange={(e) => handleCnpj(e)} variant="standard" inputProps={{ maxLength: 18 }} />
                                        <TextField label="Inscrição Estadual" disabled={!certificado} sx={{ width: "30%" }} value={(inscricaoEstadualEmpresa)} onChange={e => setInscricaoEstadualEmpresa(TirarMascara(e.target.value))} variant="standard" />
                                        <TextField label="Inscrição Municipal" disabled={!certificado} sx={{ width: "30%" }} value={(inscricaoMunicipalEmpresa)} onChange={e => setInscricaoMunicipalEmpresa(TirarMascara(e.target.value))} variant="standard" />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="Razão Social" disabled={!certificado} sx={{ width: "48%" }} value={razaoSocialEmpresa} variant="standard" onChange={e => setRazaoSocialEmpresa(e.target.value)} />
                                        <TextField label="Nome Fantasia" disabled={!certificado} sx={{ width: "48%" }} value={nomeFantasiaEmpresa} variant="standard" onChange={e => setNomeFantasiaEmpresa(e.target.value)} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <FormControl variant="standard" sx={{ width: "15%" }} disabled={!certificado}>
                                            <InputLabel id="demo-simple-select-standard-label">Simples Nacional</InputLabel>
                                            <Select
                                                value={simplesNacionalEmpresa}
                                                label="Simples Nacional"
                                                onChange={e => setSimplesNacionalEmpresa(e.target.value)}
                                            >
                                                <MenuItem value={true}>Sim</MenuItem>
                                                <MenuItem value={false}>Não</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="standard" sx={{ width: "20%" }} disabled={!certificado}>
                                            <InputLabel id="demo-simple-select-standard-label">Regime Tributário</InputLabel>
                                            <Select
                                                value={regimeTributarioEmpresa}
                                                label="Regime Tributário"
                                                onChange={e => setRegimeTributarioEmpresa(e.target.value)}
                                            >
                                                <MenuItem value={0}>Nenhum</MenuItem>
                                                <MenuItem value={1}>Simples Nacional</MenuItem>
                                                <MenuItem value={2}>Simples Nacional - Excesso</MenuItem>
                                                <MenuItem value={3}>Regime Normal - Lucro Presumido</MenuItem>
                                                <MenuItem value={4}>Normal - Lucro Real</MenuItem>
                                                <MenuItem value={5}>MEI (Microempreendedor individual)</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="standard" sx={{ width: "20%" }} disabled={!certificado}>
                                            <InputLabel id="demo-simple-select-standard-label">Incentivo Fiscal</InputLabel>
                                            <Select
                                                value={incentivoFiscalEmpresa}
                                                label="Incentivo Fiscal"
                                                onChange={(e) => setIncentivoFiscalEmpresa(e.target.value)}
                                            >
                                                <MenuItem value={true}>Sim</MenuItem>
                                                <MenuItem value={false}>Não</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="standard" sx={{ width: "20%" }} disabled={!certificado}>
                                            <InputLabel id="demo-simple-select-standard-label">Incentivo Cultural</InputLabel>
                                            <Select
                                                value={incentivoCulturalEmpresa}
                                                label="Incentivo Cultural"
                                                onChange={e => setIncentivoCulturalEmpresa(e.target.value)}
                                            >
                                                <MenuItem value={true}>Sim</MenuItem>
                                                <MenuItem value={false}>Não</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl variant="standard" sx={{ width: "25%" }} disabled={!certificado}>
                                            <InputLabel id="demo-simple-select-standard-label">Regime Tributário Especial</InputLabel>
                                            <Select
                                                value={regimeTributarioEspecialEmpresa}
                                                label="Regime Tributário Especial"
                                                onChange={e => setRegimeTributarioEspecialEmpresa(e.target.value)}
                                            >
                                                <MenuItem value={0}>Sem Regime Tributário Especial</MenuItem>
                                                <MenuItem value={1}>Micro Empresa Municipal</MenuItem>
                                                <MenuItem value={2}>Estimativa</MenuItem>
                                                <MenuItem value={3}>Sociedade de Profissionais</MenuItem>
                                                <MenuItem value={4}>Cooperativa</MenuItem>
                                                <MenuItem value={5}>Microempresário Individual - MEI</MenuItem>
                                                <MenuItem value={6}>Microempresa ou Pequeno Porte - ME EPP</MenuItem>
                                                <MenuItem value={7}>Lucro Real</MenuItem>
                                                <MenuItem value={8}>Lucro Presumido</MenuItem>
                                                <MenuItem value={9}>Tributação Normal</MenuItem>
                                                <MenuItem value={10}>Simples nacional com excesso do sublimite</MenuItem>
                                                <MenuItem value={11}>Empresa de Responsabilidade Limitada</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="CEP" disabled={!certificado} sx={{ width: "20%" }} value={cepEmpresa} variant="standard" onChange={e => setCepEmpresa(e.target.value)} inputProps={{ maxLength: 8 }} />
                                        <TextField label="Endereço" disabled={!certificado} sx={{ width: "65%" }} value={enderecoEmpresa} variant="standard" onChange={e => setEnderecoEmpresa(e.target.value)} />
                                        <TextField label="Nª" disabled={!certificado} sx={{ width: "10%" }} value={numeroEmpresa || ''} variant="standard" onChange={e => setNumeroEmpresa(e.target.value)} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="Estado" disabled={!certificado} sx={{ width: "32%" }} value={estadoEmpresa} variant="standard" onChange={e => setEstadoEmpresa(e.target.value)} />
                                        <TextField label="Cidade" disabled={!certificado} sx={{ width: "32%" }} value={cidadeEmpresa} variant="standard" onChange={e => setCidadeEmpresa(e.target.value)} />
                                        <TextField label="Bairro" disabled={!certificado} sx={{ width: "32%" }} value={bairroEmpresa} variant="standard" onChange={e => setBairroEmpresa(e.target.value)} />
                                    </div>
                                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "15px" }}>
                                        <TextField label="E-mail" disabled={!certificado} sx={{ width: "70%" }} value={emailEmpresa} variant="standard" onChange={e => setEmailEmpresa(e.target.value)} />
                                        <TextField label="Telefone" disabled={!certificado} sx={{ width: "29%" }} value={MascaraTelefone(telefoneEmpresa)} variant="standard" onChange={e => setTelefoneEmpresa(TirarMascara(e.target.value))} inputProps={{ maxLength: 14 }} />
                                    </div>
                                </div>
                                <div style={{ padding: "15px", backgroundColor: "#ffffffff", borderRadius: "0 0 5px 5px", marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="contained" disabled={!certificado} size="small" sx={{ backgroundColor: "#0b243d" }} onClick={handleSaveCompany} loading={empresaLoading}>Salvar alterações</Button>
                                </div>
                            </Card >

                            <Card style={{ width: "100%", borderRadius: "5px", backgroundColor: "#f7f7f7ff" }}>
                                <div style={{ padding: "15px" }}>
                                    <h2>Serviços do usuário</h2>
                                </div>
                                <Divider />
                                <div style={{ padding: "15px" }}>
                                    {/* Tabela */}
                                    <Card sx={{ borderRadius: "16px" }}>
                                        <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell><strong>ID</strong></TableCell>
                                                        <TableCell><strong>Código</strong></TableCell>
                                                        <TableCell><strong>Discriminação</strong></TableCell>
                                                        <TableCell><strong>CNAE</strong></TableCell>
                                                        <TableCell><strong>Ação</strong></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {servicos.length > 0 ? (
                                                        servicos.map((servico) => (
                                                            <TableRow key={servico.idServico}>
                                                                <TableCell>{servico.idServico}</TableCell>
                                                                <TableCell>{servico.codigo}</TableCell>
                                                                <TableCell> {servico.discriminacao}</TableCell>
                                                                <TableCell>{servico.cnae}</TableCell>
                                                                <TableCell>Editar</TableCell>
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell colSpan={8} align="center">
                                                                Nenhum serviço encontrado.
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Card>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '16px' }}>
                                        <TextField label="Código" disabled={!certificado} value={codigo} onChange={(e) => setCodigo(e.target.value)} variant="outlined" size='small' sx={{ width: "48%" }} />
                                        <TextField label="cnae" disabled value={cnae} onChange={(e) => setCnae(e.target.value)} variant="outlined" size='small' sx={{ width: "48%" }} />

                                    </div>
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '16px' }}>
                                        <TextField
                                            disabled={!certificado}
                                            label="Discriminacao"
                                            placeholder="Descreva o serviço aqui"
                                            rows={4}
                                            multiline
                                            fullWidth
                                            value={discriminacao}
                                            onChange={(e) => setDiscriminacao(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div style={{ padding: "15px", backgroundColor: "#ffffffff", borderRadius: "0 0 5px 5px", marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="contained" disabled={!certificado} size="small" sx={{ backgroundColor: "#0b243d" }} onClick={handleSaveServico} loading={servicoLoading}>Adicionar Serviço</Button>
                                </div>
                            </Card >

                            <Card style={{ width: "100%", borderRadius: "5px", backgroundColor: "#f7f7f7ff" }}>
                                <div style={{ padding: "15px" }}>
                                    <h2>Emitir Nota Fiscal (Serviço)</h2>
                                    <span style={{ fontSize: "14px", color: "black" }}>Limite de emissão para este usuário: {qtdEmitidas}/{limiteNotas} </span>
                                </div>
                                <Divider />
                                <div style={{ padding: "15px" }}>
                                    <div style={{ marginTop: "20px" }}>
                                        <h3>Prestador</h3>
                                        <Divider />
                                        <div style={{ marginTop: "10px" }}>
                                            <p style={{ fontSize: "14px" }}>Dados do prestador:</p>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                            <TextField size='small' label="CPF ou CNPJ" disabled required variant="outlined" value={MascaraCnpj(cnpjEmpresa)} style={{ width: '49%' }} />
                                            <TextField size='small' label="Razão Social" disabled required variant="outlined" value={razaoSocialEmpresa} style={{ width: '49%' }} />
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "20px" }}>
                                        <h3>Tomador</h3>
                                        <Divider />
                                        <FormControlLabel control={<Checkbox defaultChecked={hasTomador} onChange={(e) => setHasTomador(e.target.checked)} />} label="Nota possui tomador?" />
                                        {hasTomador ? (
                                            <div style={{ marginTop: "10px" }}>
                                                <div style={{ marginBottom: "10px" }}>
                                                    <p style={{ fontSize: "14px" }}>Preencha os dados do tomador:</p>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <TextField size='small' label="CPF ou CNPJ" required variant="outlined" style={{ width: '49%' }} value={cpfCnpjTomador} onChange={e => handleCnpjTomador(e)} />
                                                    <TextField size='small' label="Razão Social" required variant="outlined" style={{ width: '49%' }} value={razaoSocialTomador} onChange={e => setRazaoSocialTomador(e.target.value)} />
                                                </div>
                                                <div style={{ marginTop: "10px", display: 'flex', justifyContent: 'space-between' }}>
                                                    <TextField size='small' label="E-mail" variant="outlined" style={{ width: '49%' }} value={emailTomador} onChange={e => setEmailTomador(e.target.value)} />
                                                    <TextField size='small' label="Inscrição Municipal" variant="outlined" style={{ width: '49%' }} value={inscricaoMunicipalTomador} onChange={e => setInscricaoMunicipalTomador(e.target.value)} />
                                                </div>
                                                <div style={{ marginTop: "10px", display: 'flex', justifyContent: 'space-between' }}>
                                                    <TextField size='small' label="CEP" variant="outlined" style={{ width: '30%' }} value={MascaraCep(cepTomador)} onChange={e => setCepTomador(e.target.value)} />
                                                    <TextField size='small' label="Endereço" variant="outlined" style={{ width: '59%' }} value={enderecoTomador} onChange={e => setEnderecoTomador(e.target.value)} />
                                                    <TextField size='small' label="Nª" variant="outlined" style={{ width: '10%' }} value={numeroTomador} onChange={e => setNumeroTomador(e.target.value)} />
                                                </div>
                                                <div style={{ marginTop: "10px", display: 'flex', justifyContent: 'space-between' }}>
                                                    <FormControl style={{ width: '33%' }} size='small'>
                                                        <InputLabel id="estado-select-label">Estado</InputLabel>
                                                        <Select
                                                            labelId="estado-select-label"
                                                            id="estado-select"
                                                            label="Estado"
                                                            value={estadoTomador}
                                                            onChange={e => setEstadoTomador(e.target.value)}
                                                        >
                                                            {estados.map((uf) => (
                                                                <MenuItem key={uf} value={uf}>{uf}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    <TextField size='small' label="Cidade" variant="outlined" style={{ width: '33%' }} value={cidadeTomador} onChange={e => setCidadeTomador(e.target.value)} />
                                                    <TextField size='small' label="Bairro" variant="outlined" style={{ width: '33%' }} value={bairroTomador} onChange={e => setBairroTomador(e.target.value)} />
                                                </div>
                                            </div>
                                        ) : (
                                            <p style={{ fontSize: "14px", color: "orange" }}>Nota fiscal de serviço sem tomador.</p>
                                        )}
                                    </div>
                                    <div style={{ marginTop: "20px" }}>
                                        <h3>Serviço</h3>
                                        <Divider />
                                        <div style={{ marginTop: "10px" }}>
                                            <Autocomplete
                                                size="small"
                                                fullWidth
                                                disablePortal
                                                options={servicos}
                                                getOptionLabel={(option) =>
                                                    `${option.codigo} - ${option.discriminacao} - ${option.cnae ? option.cnae : 'CNAE não definido'}`
                                                }
                                                value={servicoSelecionado}
                                                onChange={(event, newValue) => {
                                                    setServicoSelecionado(newValue);
                                                    console.log("Serviço selecionado:", newValue);
                                                }}
                                                renderOption={(props, option) => (
                                                    <Box
                                                        component="li"
                                                        {...props}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            paddingY: 0.5,
                                                        }}
                                                    >
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                            codigo: {option.codigo} — cnae: {option.cnae ? option.cnae : 'Não definido'}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {option.discriminacao}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Serviço" placeholder='Selecione os serviço que foi prestado' variant="outlined" />
                                                )}
                                            />
                                            <div style={{ marginTop: "10px", display: 'flex', justifyContent: 'space-between' }}>
                                                <FormControl disabled={!servicoSelecionado} style={{ width: '33%' }} size='small'>
                                                    <InputLabel>Tipo tributação</InputLabel>
                                                    <Select
                                                        value={tipoTributacao}
                                                        label="Tipo tributação"
                                                        onChange={e => setTipoTributacao(e.target.value)}
                                                    >
                                                        <MenuItem value={0}>Não definido</MenuItem>
                                                        <MenuItem value={1}>Isento de ISS</MenuItem>
                                                        <MenuItem value={2}>Imune</MenuItem>
                                                        <MenuItem value={3}>Não Incidência no Município</MenuItem>
                                                        <MenuItem value={4}>Não Tributável</MenuItem>
                                                        <MenuItem value={5}>Retido</MenuItem>
                                                        <MenuItem value={6}>Tributável Dentro do Município</MenuItem>
                                                        <MenuItem value={7}>Tributável Fora do Município</MenuItem>
                                                        <MenuItem value={8}>Tributável Dentro do Município pelo tomador</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl disabled={!servicoSelecionado} style={{ width: '33%' }} size='small'>
                                                    <InputLabel>Exigibilidade</InputLabel>
                                                    <Select
                                                        value={exigibilidade}
                                                        label="Exigibilidade"
                                                        onChange={e => setExigibilidade(e.target.value)}
                                                    >
                                                        <MenuItem value={1}>Exigível</MenuItem>
                                                        <MenuItem value={2}>Não Incidência</MenuItem>
                                                        <MenuItem value={3}>Isenção</MenuItem>
                                                        <MenuItem value={4}>Exportação</MenuItem>
                                                        <MenuItem value={5}>Imunidade</MenuItem>
                                                        <MenuItem value={6}>Suspenso por Ação Judicial</MenuItem>
                                                        <MenuItem value={7}>Suspenso por Ação Administrativa</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <TextField disabled={!servicoSelecionado} size="small" label="Alíquota" value={aliquota} onChange={e => setAliquota(e.target.value)} variant="outlined" style={{ width: '33%' }} />
                                            </div>
                                            <div style={{ marginTop: "30px", display: 'flex', justifyContent: 'space-between' }}>
                                                <TextField size='small' label="Valor do Serviço" variant="outlined" style={{ width: '33%' }} value={MascaraValor(valorServico)} onChange={e => setValorServico(e.target.value)} />
                                                <TextField size='small' label="Desconto Condicionado" variant="outlined" style={{ width: '33%' }} value={MascaraValor(descontoCondicionado)} onChange={e => setDescontoCondicionado(e.target.value)} />
                                                <TextField size='small' label="Desconto Incondicionado" variant="outlined" style={{ width: '33%' }} value={MascaraValor(descontoIncondicionado)} onChange={e => setDescontoIncondicionado(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: "15px", backgroundColor: "#ffffffff", borderRadius: "0 0 5px 5px", marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                                    <Button variant="contained" size="small" sx={{ backgroundColor: "#0b243d" }} loading={notaLoading} onClick={handleEmitirNota}>Emitir Nota Fiscal</Button>
                                </div>
                            </Card >
                        </div>
                    </div>
                </div>
            </div>
            <ModalImage
                open={modalOpen}
                onClose={closeModal}
                imageUrl={selectedImage}
            />
        </div>
    );
}

export default PerfilUsuario;