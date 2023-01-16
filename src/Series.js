import axios from 'axios'
import React from 'react'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import style from './series.module.css'

function Series() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/api/series/')
    .then(res => {
      setData(res.data.data)
    })
  }, [])

  const deleteSerie = id => {
    axios
    .delete('/api/series/' + id)
    .then(res => {
      const filtrados = data.filter((dado) => dado.id !== id)
      setData(filtrados)
    })
  }

  const renderizaLinha = record => {
    return (
          <tr key={record.id}>
            <th scope="row">{record.name}</th>
            <td>{ <img src={record.background} alt="poster"/>}</td>
            <td className={style.button_area}>
              <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Remover</button>
              <Link to={'series/' + record.id} className='btn btn-warning'>Info</Link>
            </td>
            </tr>
    )
  }

  if(data.length === 0) {
    return (
       <div className={style.alertContainer} >
          <h1 className={style.alertTittle}>Séries</h1>
          <Link className='btn btn-secondary' to='/series/novo/'>Nova série</Link>
          <div className={style.alertTextContainer}>
            <div className='alert alert-warning' role='alert'>
                Você não possui séries lançadas!
            </div>
          </div>
      </div>
    )
  }


  return (
    <div className={style.container}>
      <div className={style.tableTittle}>
        <h1>Séries</h1>
        <Link className='btn btn-secondary' to='/series/novo/'>Nova série</Link>
      </div>
      <div className={style.tableContainer}>
        <table className='table table-dark' hover>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Gênero</th>
              <th scope="col">Ações</th>
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

export default Series