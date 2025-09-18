import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star';
import DiscountIcon from '@mui/icons-material/Discount';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StyleIcon from '@mui/icons-material/Style';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PolicyIcon from '@mui/icons-material/Policy';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const verificarSessao = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/verificarTokenAdmin`, {}, {
                    headers: { Authorization: token }
                });

                if (response.data.status !== 200) {
                    localStorage.removeItem('token');
                    navigate("../")
                }
            } else {
                navigate("../")
            }
        }
        verificarSessao();
    }, [navigate])

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("../Assinaturas")}>
                        <ListItemIcon>
                            <StarIcon sx={{ color: "yellow" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Assinaturas"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("../Descontos")}>
                        <ListItemIcon>
                            <DiscountIcon sx={{ color: "yellowgreen" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Descontos"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <NotificationsIcon sx={{ color: "purple" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Notificações"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("../Planos")}>
                        <ListItemIcon>
                            <StyleIcon sx={{ color: "orange" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Planos"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("../Usuarios")}>
                        <ListItemIcon>
                            <PeopleAltIcon sx={{ color: "black" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Usuarios"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("../TermosDeUso")}>
                        <ListItemIcon>
                            <PolicyIcon sx={{ color: "blue" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Termos de uso"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                        localStorage.removeItem('token');
                        navigate("../");
                    }}>
                        <ListItemIcon>
                            <LogoutIcon color='error' />
                        </ListItemIcon>
                        <ListItemText primary={"Sair"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#233344" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Contblack ADM
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}

export default Header;
