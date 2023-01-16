import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'


function EditarGenero({match}) {

  const [name, setName] = useState('')
  const [succes, setSucces] = useState(false)

  useEffect(() => {
    axios
    .get('/api/genres/' + match.params.id)
    .then(res => {
      setName(res.data.name)
    })
  },[match.params.id])

  const save = () => {
    axios
    .put('/api/genres/' + match.params.id , {
      name: name
    })
    .then(res => {
      setSucces(true)
    })
  }

  if (succes) {
    return <Redirect to='/generos'/>
  }

  return (
    <div className='container'>
      <h1>Editar Gênero</h1>
      <form>
        <div className='mb-3'>
        <label htmlFor='name' className='form-label'>Nome</label>
        <input 
          type='text'  
          value={name} 
          className='form-control' 
          id='name' 
          placeholder='Nome do Gênero'
          onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={save}>
          Salvar
          </button>
      </form>
    </div>


  )
}

export default EditarGenero;