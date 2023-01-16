import axios from 'axios'
import React from 'react'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import style from './generos.module.css'
function Generos() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/api/genres')
    .then(res => {
      setData(res.data.data)
      console.log(res.data)
    })
  }, [])

  const deleteGeneros = id => {
    axios
    .delete('/api/genres/' + id)
    .then(res => {
      const filtrados = data.filter((dado) => dado.id !== id)
      setData(filtrados)
    })
  }

  const renderizaLinha = record => {
    return (
          <tr key={record.id}>
            <td>{record.name}</td>
            <td className={style.buttonArea}>
              <button className='btn btn-danger' onClick={() => deleteGeneros(record.id)}>Remover</button>
              <Link to={'generos/' + record.id} className='btn btn-warning'>Editar</Link>
            </td>
            
            </tr>
    )
  }

  if(data.length === 0) {
    return (
       <div className={style.alertContainer}>
          <h1>Gêneros</h1>
          <Link className='btn btn-secondary' to='/generos/novo/'>Novo gênero</Link>
          <div className={style.alertTextContainer}>
            <div className='alert alert-warning' role='alert'>
                Você não possui gêneros criados!
            </div>
          </div>
      </div>
    )
  }


  return (
    <div className={style.container}>
      <div className={style.tableTittle}>
        <h1>Gêneros</h1>
        <Link className='btn btn-secondary' to='/generos/novo/'>Novo gênero</Link>
      </div>
      <div className={style.tableArea}>
        <table className="table table-dark">
          <thead>
            <tr className={style.trTable}>
              <th scope="col">Nome</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {data.map(renderizaLinha)}
          </tbody>
        </table>  
      </div>
    </div>

  )
}

export default Generos