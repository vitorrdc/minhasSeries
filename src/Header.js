import { useState, useEffect } from 'react'
import { 
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Nav,
  Input,
  Button
 } from 'reactstrap'
 import { Link } from 'react-router-dom'
 import style from './header.module.css'
 import axios from 'axios'

function Header() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [searchSerie, setSearchSerie] = useState('')
  const [idFound, setIdFound] = useState('')
  const [stopSearch, setStopeSearch] = useState(false)

  useEffect(() => {
    axios.get('/api/series')
    .then((res) => {
      setData(res.data.data)
      const encontrado = data.find((element) =>  searchSerie === element.name)
    setIdFound(encontrado.id)
    })  
  },[searchSerie, idFound])

  function toggle() {
    setOpen(!open)
  }
  return (
      <Navbar  color='dark' light expand='md' className={style.navBar} dark='true'>
        <NavbarBrand tag={Link} to='/'>Minhas Séries</NavbarBrand>
        <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={open} navbar>
            <Nav className='ml-auto' navbar >
            <NavItem>
                <NavLink tag={Link} to='/series'>Séries</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/generos'>Gêneros</NavLink>
              </NavItem>
              <NavItem>
                <Input
                  bsSize="sm"
                  type="search"
                  className={style.input}
                  placeholder='Buscar séries'
                  value={searchSerie}
                  onChange={(e) => (setSearchSerie(e.target.value))}
                />
              </NavItem>
              <div className={style.buttonArea}>
                <NavItem>
                  <Link to={'/series/' + idFound}>
                    <Button color='success'>Ir</Button>
                  </Link>
                </NavItem>
              </div>
            </Nav>
          </Collapse>
      </Navbar>
  )
}

export default Header