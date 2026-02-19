import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalImage = ({ open, onClose, imageUrl }) => {
    const [isZoomed, setIsZoomed] = useState(false); // Controle do zoom

    // Alterna o zoom
    const toggleZoom = () => {
        setIsZoomed((prev) => !prev);
    };

    return (
        <Modal
            open={open}
            onClose={onClose} // Fechar o modal ao clicar fora da imagem
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: 'white',
                    padding: '20px',
                    maxWidth: '90%',
                    maxHeight: '90%',
                    overflow: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Imagem dentro do modal com efeito de zoom */}
                <img
                    src={imageUrl}
                    alt="Imagem Modal"
                    style={{
                        width: isZoomed ? '100%' : '80%', // Aumenta o tamanho quando `isZoomed` for true
                        height: 'auto',
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                        transform: isZoomed ? 'scale(1.5)' : 'scale(1)', // Aplica o efeito de zoom
                        cursor: 'pointer', // Indica que a imagem pode ser clicada
                    }}
                    onClick={toggleZoom} // Alterna entre zoom e tamanho normal
                />

                {/* Botão para fechar o modal */}
                <IconButton
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 1,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </Modal>
    );
};

export default ModalImage;
