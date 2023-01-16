import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { Badge } from 'reactstrap'


function InfoSerie({match}) {

  const [form, setForm] = useState({name:''})
  const [succes, setSucces] = useState(false)
  const [data, setData] = useState({})
  const [mode, setMode] = useState('INFO')
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState('')


  useEffect(() => {
    axios.get('/api/series/' + match.params.id)
    .then( res => {
      setData(res.data)
      setForm(res.data)
    })
  }, [match.params.id])

  useEffect(() => {
    axios
    .get('/api/genres')
    .then(res => {
      setGenres(res.data.data)
      const genres = res.data.data
      const encontrado = genres.find(value => data.genre_name === value.name)
      if (encontrado) {
        setGenreId(encontrado.id)
      }
    })
  }, [data])


  // custom HEADER

  const masterHeader = {
    height: '50vh',
    minHeight: '350px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition:'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }

  const onChangeEvt = (e) => {
    setGenreId(e.target.value)
  }
  
  const save = () => {
    axios
    .put('/api/series/' + match.params.id, {
      ...form,
      genre_id: genreId
    })
    .then(res => {
      setSucces(true)
    })
  }

  if (succes) {
   return <Redirect to='/series'/>
  }

  const seleciona = value => () => {
    setForm({
      ...form,
      status:value
    })
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{background: 'rgba(0,0,0,0.7)'}}>
          <div className=' h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-2'>
                <img src={data.poster} className='img-fluid img-thumbnail' alt={data.name} />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
                <p className='font-weight-light text-white'>Gênero: {data.genre_name}</p>

              </div>
            </div>
          </div>  
        </div>
      </header>
      <div className='container'>
        <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
      </div>
      { 
        mode === 'EDIT' && 
        <div className='container'>
          <h1>Editar Série</h1>
          <div>
            <button className='btn btn-primary' onClick={() => setMode('INFO')}>Finalizar Edição</button>
          </div>
          <form>
            <div className='mb-3'>
            <label htmlFor='name' className='form-label'>Nome</label>
            <input 
              type='text'  
              value={form.name} 
              className='form-control' 
              id='name' 
              placeholder='Nova série'
              onChange={onChange('name')}
              />
              <label htmlFor='comentarios' className='form-label'>Comentários</label>
              <input 
              type='text'  
              value={form.comments} 
              className='form-control' 
              id='comentarios' 
              placeholder='Nova série'
              onChange={onChange('comments')}
              /> 
            </div>
            <div className="form-group">
            <label htmlFor='name'>Gêneros</label>
              <select className="form-control" onChange={onChangeEvt} value={genreId}>
              {
                genres.map((genero) => {
                  return <option key={genero.id} value={genero.id}>{genero.name}</option>
                })
     
              }
              </select>
            </div>
            <div className="form-check">
              <input className='form-check-input' type='radio' checked={form.status === 'ASSISTIDO'} name='status' id='assistido' value='ASSISTIDO' onChange={seleciona('ASSISTIDO')}/>
              <label className='form-check-label' htmlFor='assistido'>
                Assistido
              </label>
           </div>
            <div className="form-check">
              <input className='form-check-input' type='radio' checked={form.status === 'PARA_ASSISTIR'}  name='status' id='paraAssistir' value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')} />
              <label className='form-check-label' htmlFor='paraAssistir'>
                Para assistir
              </label>
            </div>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={save}>
              Salvar
              </button>
          </form>
        </div>
      }
    </div>


  )
}

export default InfoSerie;