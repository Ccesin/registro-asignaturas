// src/FormularioAsignatura.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormularioAsignatura = () => {
  const [nombre, setNombre] = useState('');
  const [unidadesCredito, setUnidadesCredito] = useState('');
  const [profesor, setProfesor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [horario, setHorario] = useState('');
  const [aula, setAula] = useState('');
  const [prerrequisitos, setPrerrequisitos] = useState('');
  const [cupoMaximo, setCupoMaximo] = useState('');
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
  const newErrors = {};
      if (!nombre) newErrors.nombre = 'El nombre es requerido';
      if (!unidadesCredito || ((unidadesCredito <= 0)&&(unidadesCredito > 6))) newErrors.unidadesCredito = 'Las unidades de crédito deben ser un número positivo Menor o igual que 6';
      if (!profesor) newErrors.profesor = 'El profesor es requerido';
      if (!descripcion) newErrors.descripcion = 'La descripción es requerida';
      if (!horario) newErrors.horario = 'El horario es requerido';
      if (!aula || ((aula <= 0) && (aula > 30)) ) newErrors.aula = 'El aula es requerida y debe ser un número entre 1 y 30';
      if (!prerrequisitos) newErrors.prerrequisitos = 'Los prerrequisitos son requeridos';
      if (!cupoMaximo || ((cupoMaximo <= 0) && (cupoMaximo > 35)) ) newErrors.cupoMaximo = 'El cupo máximo debe ser un número positivo Menor o igual que 35';
  return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const nuevaAsignatura = {
      nombre,
      unidadesCredito,
      profesor,
      descripcion,
      horario,
      aula,
      prerrequisitos,
      cupoMaximo,
    };

    const asignaturas = JSON.parse(localStorage.getItem('asignaturas')) || [];
    asignaturas.push(nuevaAsignatura);
    localStorage.setItem('asignaturas', JSON.stringify(asignaturas));

    // Limpiar el formulario
    setNombre('');
    setUnidadesCredito('');
    setProfesor('');
    setDescripcion('');
    setHorario('');
    setAula('');
    setPrerrequisitos('');
    setCupoMaximo('');

    // Mostrar snackbar
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Registro de Asignaturas
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setErrors((prev) => ({ ...prev, nombre: '' })); // Limpiar error al cambiar
              }}
              required
              error={!!errors.nombre}
              helperText={errors.nombre}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Unidades de Crédito"
              variant="outlined"
              fullWidth
              type="number"
              value={unidadesCredito}
              onChange={(e) => {
                setUnidadesCredito(e.target.value);
                setErrors((prev) => ({ ...prev, unidadesCredito: '' })); // Limpiar error al cambiar
              }}
              required
              error={!!errors.unidadesCredito}
              helperText={errors.unidadesCredito}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Profesor"
              variant="outlined"
              fullWidth
              value={profesor}
              onChange={(e) => {
                setProfesor(e.target.value);
                setErrors((prev) => ({ ...prev, profesor: '' })); // Limpiar error al cambiar
              }}
              required
              error={!!errors.profesor}
              helperText={errors.profesor}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value)
                setErrors((prev) => ({ ...prev, descripcion: '' })); // Limpiar error al cambiar
              }}
              required
              error={!!errors.descripcion}
              helperText={errors.descripcion}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Horario"
              variant="outlined"
              fullWidth
              value={horario}
              onChange={(e) => {
                setHorario(e.target.value)
                setErrors((prev) => ({ ...prev, horario: '' })); // Limpiar error al cambiar
              }}
              required
              error={!!errors.horario}
              helperText={errors.horario}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Aula"
              variant="outlined"
              fullWidth
              value={aula}
              onChange={(e) => {
                setAula(e.target.value)
                setErrors((prev) => ({ ...prev, aula: '' })); // Limpiar error al cambiar
              }}
              required
              error={!!errors.aula}
              helperText={errors.aula}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Prerrequisitos"
              variant="outlined"
              fullWidth
              value={prerrequisitos}
              onChange={( e) => {
                setPrerrequisitos(e.target.value)
                setErrors((prev) => ({ ...prev, prerrequisitos: '' })); // Limpiar error al cambiar
              }}
              required
              error={!!errors.prerrequisitos}
              helperText={errors.prerrequisitos}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cupo Máximo"
              variant="outlined"
              fullWidth
              type="number"
              value={cupoMaximo}
              onChange={(e) => {
                setCupoMaximo(e.target.value)
                setErrors((prev) => ({ ...prev, cupoMaximo: '' })); // Limpiar error al cambiar
              }}
              required
              error={!!errors.cupoMaximo}
              helperText={errors.cupoMaximo}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar Asignatura
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Asignatura registrada con éxito!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FormularioAsignatura;