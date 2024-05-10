import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardActions, CardMedia, Typography, Button, Grid } from '@mui/material';
import Navbar from '../NavbarDashboard';
import fondo from "../../image/fondo.jpg"; // Importa la imagen de fondo

import image1 from "../../image/Simple21.jpg";
import image2 from "../../image/doble.jpg";
import image3 from "../../image/Triple.jpg";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Habitaciones = () => {
    const [habitacionSeleccionada, setHabitacionSeleccionada] = useState("Habitaciones simples");

    // Función para generar las tarjetas de habitación según la selección del ComboBox
    const generarTarjetas = () => {
        const tarjetas = [];
        switch (habitacionSeleccionada) {
            case "Habitaciones simples":
                for (let i = 1; i <= 15; i++) {
                    const imagen = image1;
                    tarjetas.push(
                        <Grid item xs={4} key={`simple-${i}`}>
                            <Tarjeta numero={i} contenido="Habitación Simple" imagen={imagen} />
                        </Grid>
                    );
                }
                break;
            case "Habitaciones dobles":
                for (let i = 1; i <= 8; i++) {
                    const imagen = image2;
                    const numero = i + 15; // Para asegurar que los números sean únicos
                    tarjetas.push(
                        <Grid item xs={4} key={`doble-${i}`}>
                            <Tarjeta numero={numero} contenido="Habitación Doble" imagen={imagen} />
                        </Grid>
                    );
                }
                break;
            case "Habitaciones triples":
                const imagenTriple = image3; // Asigna la imagen correspondiente a la habitación triple
                tarjetas.push(
                    <Grid item xs={4} key="triple">
                        <Tarjeta numero={24} contenido="Habitación Triple" imagen={imagenTriple} />
                    </Grid>
                );
                break;
            default:
                break;
        }
        return tarjetas;
    };

    return (
        <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', backgroundRepeat: 'no-repeat' }}>
            <Navbar />
            <h1 style={{ textAlign: 'center' }}>Reserva tu habitación</h1>
            <Box display="flex" justifyContent="center" mb={2}>
                {/* ComboBox para seleccionar el tipo de habitación */}
                <Autocomplete
                    disablePortal
                    id="combo-box-habitacion"
                    value={habitacionSeleccionada}
                    onChange={(event, newValue) => {
                        setHabitacionSeleccionada(newValue);
                    }}
                    options={habitaciones}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Tipo de habitación" />}
                />
            </Box>
            <Box display="flex" justifyContent="center">
                <Grid container spacing={2} style={{ justifyContent: 'flex-start', marginRight: 0 }}>
                    {generarTarjetas()}
                </Grid>
            </Box>
        </div>
    );
}

const Tarjeta = ({ numero, contenido, imagen }) => {
    return (
        <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
            <CardMedia
                component="img"
                image={imagen}
                alt="Imagen de la habitación"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Habitación {numero}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {contenido}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link}
                    to={`/Reservaciones?habitacion=${contenido}-${numero}`}
                    size="small"
                    color="primary"
                >
                    Ver más
                </Button>
            </CardActions>
        </Card>
    );
}

const habitaciones = [
    "Habitaciones simples",
    "Habitaciones dobles",
    "Habitaciones triples"
];

export default Habitaciones;
