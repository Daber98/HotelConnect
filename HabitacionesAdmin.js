import React, { useState, useEffect } from "react";
import NavbarDashboard from "../NavbarDashboard";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';


const tiposHabitacion = ['Habitación simple', 'Habitación doble', 'Habitación triple'];
const HabitacionesAdmin = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [editingHabitacionId, setEditingHabitacionId] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [newHabitacionData, setNewHabitacionData] = useState({
        tipo: "",
        precioNoche: "",
        disponible: ""
    });

    useEffect(() => {
        axios.get('http://localhost:3001/habitacion')
            .then(response => {
                setHabitaciones(response.data.Rooms);
            })
            .catch(error => {
                console.error('Error fetching habitaciones:', error);
            });
    }, []);

    const handleEditHabitacion = (habitacionId) => {
        setEditingHabitacionId(habitacionId);
        const selectedHabitacion = habitaciones.find(habitacion => habitacion.id_habitacion === habitacionId);
        setEditedData(selectedHabitacion);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleSaveEdit = () => {
        axios.put(`http://localhost:3001/habitacion/${editingHabitacionId}`, editedData)
            .then(response => {
                if (response.data.Status === "Success") {
                    setHabitaciones(habitaciones.map(habitacion => habitacion.id_habitacion === editingHabitacionId ? { ...habitacion, ...editedData } : habitacion));
                    setOpenEditDialog(false);
                }
            })
            .catch(error => {
                console.error('Error updating habitacion:', error);
            });
    };

    const handleDeleteHabitacion = (habitacionId) => {
        axios.delete(`http://localhost:3001/habitacion/${habitacionId}`)
            .then(response => {
                if (response.data.Status === "Success") {
                    setHabitaciones(habitaciones.filter(habitacion => habitacion.id_habitacion !== habitacionId));
                }
            })
            .catch(error => {
                console.error('Error deleting habitacion:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleNewHabitacionChange = (e) => {
        const { name, value } = e.target;
        setNewHabitacionData({ ...newHabitacionData, [name]: value });
    };

    const handleCreateHabitacion = () => {
        axios.post('http://localhost:3001/habitacion', newHabitacionData)
            .then(response => {
                if (response.data.Status === "Success") {
                    setHabitaciones([...habitaciones, { id_habitacion: response.data.InsertId, ...newHabitacionData }]);
                    setNewHabitacionData({ tipo: "", precioNoche: "", disponible: "" });
                    setOpenCreateDialog(false);
                }
            })
            .catch(error => {
                console.error('Error creating habitacion:', error);
            });
    };

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <NavbarDashboard />
            <div style={{ margin: 30 }}>
            <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)} style={{ marginLeft: 15, marginBottom: 15 }}>Crear Habitación</Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Tipo</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Precio/Noche</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Disponible</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {habitaciones.map(habitacion => (
                                <TableRow key={habitacion.id_habitacion}>
                                    <TableCell>{habitacion.id_habitacion}</TableCell>
                                    <TableCell>{habitacion.tipo}</TableCell>
                                    <TableCell>{habitacion.precioNoche}</TableCell>
                                    <TableCell>{habitacion.disponible}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleEditHabitacion(habitacion.id_habitacion)}>Editar</Button>
                                        <Button variant="contained" color="secondary" onClick={() => handleDeleteHabitacion(habitacion.id_habitacion)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Editar Habitacion</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tipo"
                        label="Tipo"
                        type="text"
                        name="tipo"
                        fullWidth
                        value={editedData.tipo || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="precioNoche"
                        label="Precio/Noche"
                        type="text"
                        name="precioNoche"
                        fullWidth
                        value={editedData.precioNoche || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="disponible"
                        label="Disponible"
                        type="text"
                        name="disponible"
                        fullWidth
                        value={editedData.disponible || ""}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEditDialog}>Cancelar</Button>
                        <Button onClick={handleSaveEdit}>Guardar</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                <DialogTitle>Crear Habitacion</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="tipo-label">Tipo</InputLabel>
                        <Select
                            labelId="tipo-label"
                            id="tipo"
                            name="tipo"
                            value={newHabitacionData.tipo}
                            onChange={handleNewHabitacionChange}
                        >
                            {tiposHabitacion.map((tipo, index) => (
                                <MenuItem key={index} value={tipo}>{tipo}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="precioNoche"
                        label="Precio/Noche"
                        type="text"
                        name="precioNoche"
                        fullWidth
                        value={newHabitacionData.precioNoche}
                        onChange={handleNewHabitacionChange}
                    />
                    <TextField
                        margin="dense"
                        id="disponible"
                        label="Disponible"
                        type="text"
                        name="disponible"
                        fullWidth
                        value={newHabitacionData.disponible}
                        onChange={handleNewHabitacionChange}
                    />
                </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
                <Button onClick={handleCreateHabitacion}>Guardar</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}

export default HabitacionesAdmin;
