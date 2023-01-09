// import logo from './logo.svg';
import './App.css'
// import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from 'axios';



const App = () => {
  const [show, setShow] = useState(true)
  const [saveButton, setSaveButton] = useState(true)
  const [showAlert, setAlert] = useState(false)
  const [showAlertDelete, setAlertDelete] = useState(false)
  const [showAlertUpdate, setAlertUpdate] = useState(false)
  const [showAlertError, setAlertError] = useState(false)
  const [showAlertName, setAlertName] = useState(false)
  const [showAlertCount, setAlertCount] = useState(false)
  const [showAlertValue, setAlertValue] = useState(false)
  const [showAlertAge, setAlertAge] = useState(false)
  const [data, setData] = useState([])
  const [idproduct, setIdProduct] = useState(0)
  const [name, setName] = useState("")
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)
  const [age, setAge] = useState(0)

  const onNameChange = event => setName(event.target.value)
  const onCountChange = event => setCount(event.target.value)
  const onValueChange = event => setValue(event.target.value)
  const onAgeChange = event => setAge(event.target.value)

  const getData = async () => {
    try {
      const { data: response } = await axios.get('http://localhost:3001/products')
      setData(response)
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getData()
    validateErrorName()

  }, [])
  const validateErrorName = () => {
    if (name.length > 0) {
      setAlertName(false)
    }
  }
  const showForm = () => {
    if (show) {
      setShow(false)
      setSaveButton(true)
    }
  }
  const cancel = () => {
    if (!show) {
      setName("")
      setCount(0)
      setValue(0)
      setAge(0)
      setShow(true)
      setAlertError(false)
    }
  }

  const showTable = () => {


    if (name === "") {
      setAlertError(true)
      setAlertName(true)
      return
    }
    if (count === 0) {
      setAlertError(true)
      setAlertCount(true)
      return
    }
    if (value === 0) {
      setAlertError(true)
      setAlertValue(true)
      return
    }
    if (age === 0) {
      setAlertError(true)
      setAlertAge(true)
      return
    }
    else {
      axios.post('http://localhost:3001/addProduct', {
        productName: name,
        count: count,
        value: value,
        age: age


      }).then((response) => {
        setName("")
        setCount(0)
        setValue(0)
        setAge(0)
        setShow(true)
        setAlert(true)
        getData()
        setAlertError()
        setAlertName(false)
        setAlertCount(false)
        setAlertValue(false)
        setAlertAge(false)

        console.log(response)
      })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const showData = ((object) => {
    setSaveButton(false)
    setIdProduct(object.idproduct)
    setName(object.productName)
    setCount(object.count)
    setValue(object.value)
    setAge(object.age)
    setShow(false)


  })

  const update = () => {
    if (name === "") {
      setAlertError(true)
      setAlertName(true)
      return
    }
    if (count < 1) {
      setAlertError(true)
      setAlertCount(true)
      return
    }
    if (value < 1) {
      setAlertError(true)
      setAlertValue(true)
      return
    } if (age < 1) {
      setAlertError(true)
      setAlertAge(true)
      return
    } else {
      axios.put(`http://localhost:3001/update/${idproduct}`, {
        productName: name,
        count: count,
        value: value,
        age: age
      }).then(() => {
        setName("")
        setCount(0)
        setValue(0)
        setAge(0)
        setShow(true)
        setAlertUpdate(true)
        setAlertError(false)
        setAlertName(false)
        setAlertCount(false)
        setAlertValue(false)
        getData()
      })
    }
  }
  const peticionDelete = () => {

    axios.delete(`http://localhost:3001/delete/${idproduct}`).then(() => {
      setName("")
      setCount(0)
      setValue(0)
      setAge(0)
      setShow(true)
      setAlertDelete(true)
      setAlertError(false)
      setAlertName(false)
      setAlertCount(false)
      setAlertValue(false)
      getData()
    })
  }
  return (
    <Box sx={{
      width: 1000,
      height: 1000,
      p: 2,
      ml: 12,
      flexGrow: 3,
      backgroundColor: '#D4D4D4'
    }}>
      {show &&
        <Grid container spacing={2}>
          {showAlert &&
            <Grid item xs={10} sx={{ mb: 2, }}>
              <Alert value={showAlert} severity="success"> Vehiculo creado correctamente.</Alert>


            </Grid>
          }
          <Grid item xs={8}>
            <Button onClick={() => { showForm() }} variant="contained"
              color="success">Agregar</Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500, pl: 2, }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id vehiculo</TableCell>
                    <TableCell align="left">Referencia</TableCell>
                    <TableCell align="left">año de fabricacion</TableCell>
                    <TableCell align="left">Valor</TableCell>
                    <TableCell align="left">Cantidad</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.name}
                      onClick={() => { showData(row) }}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.idproduct}
                      </TableCell>
                      <TableCell align="left">{row.productName}</TableCell>
                      <TableCell align="left">{row.age}</TableCell>
                      <TableCell align="left">{row.value}</TableCell>
                      <TableCell align="left">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      }
      {!show &&
        <Box
          component="form"
          noValidate
          autoComplete="off"
          justifyContent="center"
        >
          <Grid sx={{ mt: 12, }} container justifyContent="center">
            {
              showAlertError &&
              <Grid item xs={10} sx={{ mb: 2, }}>
                <Alert value={showAlertError} severity="error">
                  Debes de llenar los campos que esten vacios.
                </Alert>
              </Grid>
            }

            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Referencia"
                variant="outlined"
                error={showAlertName}
                onChange={onNameChange}
                value={name} />
            </Grid>

            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Año de fabricacion"
                variant="outlined"
                error={showAlertAge}
                onChange={onAgeChange}
                value={age}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Cantidad"
                variant="outlined"
                error={showAlertCount}
                onChange={onCountChange}
                value={count} />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Valor"
                variant="outlined"
                error={showAlertValue}
                onChange={onValueChange}
                value={value} />
            </Grid>
          </Grid>
          <Grid sx={{ mt: 6, }} container justifyContent="center" >
            <Grid item sx={{ mr: 2 }}  >
              <Button onClick={() => { cancel() }} variant="contained" color="error">Cancelar</Button>
            </Grid>
            {
              saveButton &&
              <Grid item sx={{ mr: 2 }} >
                <Button onClick={() => { showTable() }} variant="contained" color="success">Guardar</Button>
              </Grid>
            }
            {
              !saveButton &&
              <Grid item sx={{ mr: 2 }} >
                <Button onClick={() => { update() }} variant="contained" color="success">Actualizar</Button>
              </Grid>
            }
            {
              !saveButton &&
              <Grid item sx={{ mr: 2 }} >

                <Button onClick={() => { peticionDelete() }} variant="contained" color="error">Borrar</Button>
              </Grid>
            }


          </Grid>
        </Box>
      }
    </Box>
  )
}

export default App;
