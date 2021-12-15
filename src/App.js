import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container,  Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
const data =[];

class Ambiente extends Component {
  state={
    data:data,
    form:{
      id:'',
      numeroambiente:'',
      numeropiso:'',
      capacidad:''
    },
    modalInsertar: false,
    modalEditar: false,
  };

  handlerChange = e =>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false})
  }

  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id = this.state.data.length+1;
    var  lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false})
  }

  mostrarModalEditar=(dato)=>{
    this.setState({form: dato, modalEditar: true});
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar: false})
  }

  editar=(dato)=>{
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(dato.id == registro.id){
        lista[contador].numeroambiente = dato.numeroambiente;
        lista[contador].numeropiso = dato.numeropiso;
        lista[contador].capacidad = dato.capacidad;
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false});
  }

  eliminar = (dato)=>{
    var opcion = window.confirm("Esta seguro que desea eliminar el ambiente "+dato.numeroambiente+" del piso "+ dato.numeropiso);
    if(opcion == true){
      var contador = 0;
      var lista = this.state.data;
      lista.map((registro)=>{
        if(dato.id == registro.id){
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({data: lista, modalEditar: false});
    }
  }

  render(){
    return(
    <>
    <Container>
    <br/>
    <Button color = "success" onClick={()=>this.mostrarModalInsertar()}>Agregar Ambiente</Button>
    <br/><br/>

    <Table>
      <thead><tr>
      <th>ID</th>
      <th>Numero Ambiente</th>
      <th>Piso</th>
      <th>Capacidad</th>
      </tr></thead>
      
      <tbody>
        {this.state.data.map((dato)=>(
          <tr>
            <td>{dato.id}</td>
            <td>{dato.numeroambiente}</td>
            <td>{dato.numeropiso}</td>
            <td>{dato.capacidad}</td>
            <td>
              <Button color="success" onClick={()=>this.mostrarModalEditar(dato)}>Editar</Button>
              {" "}
              <Button color="danger" onClick={()=>this.eliminar(dato)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>

    <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>
        <div><h3>Insertar Registro</h3></div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>ID:</label>
          <input className="form-control" readOnly type="number" value={this.state.data.length+1}/>
        </FormGroup>

        <FormGroup>
          <label>Ambiente:</label>
          <input className="form-control" name="numeroambiente" type="text" onChange={this.handlerChange}/>
        </FormGroup>

        <FormGroup>
          <label>Piso:</label>
          <input className="form-control" name="numeropiso" type="text" onChange={this.handlerChange}/>
        </FormGroup>

        <FormGroup>
          <label>Capacidad:</label>
          <input className="form-control" name="capacidad" type="number" onChange={this.handlerChange}/>
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={()=>this.insertar()}>Insertar</Button>
        <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
      </ModalFooter>
    </Modal>


    <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>
        <div><h3>Editar Registro</h3></div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>ID:</label>
          <input className="form-control" readOnly type="number" value={this.state.form.id}/>
        </FormGroup>

        <FormGroup>
          <label>Nombre:</label>
          <input className="form-control" name="numeroambiente" type="text" onChange={this.handlerChange} value={this.state.form.numeroambiente}/>
        </FormGroup>

        <FormGroup>
          <label>Sigla:</label>
          <input className="form-control" name="numeropiso" type="number" onChange={this.handlerChange} value={this.state.form.numeropiso}/>
        </FormGroup>

        <FormGroup>
          <label>Carga Horaria:</label>
          <input className="form-control" name="capacidad" type="number" onChange={this.handlerChange} value={this.state.form.capacidad}/>
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={()=>this.editar(this.state.form)} >Editar</Button>
        <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
      </ModalFooter>
    </Modal>
    </>)
  }
}
export default Ambiente;
