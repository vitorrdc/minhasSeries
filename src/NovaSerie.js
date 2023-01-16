import React, {useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import style from './novaSerie.module.css'


function NovaSerie() {

  const [name, setName] = useState('')
  const [succes, setSucces] = useState(false)

  const save = () => {
    axios
    .post('/api/series', {
      name: name
    })
    .then(res => {
      setSucces(true)
    })
  }

  if (succes) {
    return <Redirect to='/series'/>
  }

  return (
    <div className={style.container}>
      <h1>Nova Série</h1>
      <form className={style.formContainer}>
        <div className='mb-3'>
        <input 
          type='text'  
          value={name} 
          className='form-control' 
          id='name' 
          placeholder='Adicionar'
          onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={save}>
          Salvar
          </button>
      </form>
    </div>


  )
}

export default NovaSerie;