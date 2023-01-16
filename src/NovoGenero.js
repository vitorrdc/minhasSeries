import React, {useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import style from './novoGenero.module.css'


function NovoGenero() {

  const [name, setName] = useState('')
  const [succes, setSucces] = useState(false)

  const save = () => {
    axios
    .post('/api/genres', {
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
    <div className={style.container}>
      <h1>Novo Gênero</h1>
      <form className={style.formContainer}>
        <div className='mb-3'>
        <label htmlFor='name' className='form-label'>Nome</label>
        <input 
          type='text'  
          value={name} 
          className='form-control' 
          id='name' 
          placeholder='Nova série'
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

export default NovoGenero