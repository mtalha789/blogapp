import React from 'react'
import { Logo,LogoutButton,Container } from "../";
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state)=>state.status)

  const navItems = [
    {
      name: 'Home',
      slug : '/',
      active:true
    },
    {
      name :'Login',
      slug : '/login',
      active: !authStatus
    },
    {
      name:'Signup',
      slug: '/signup',
      active:!authStatus
    },
    {
      name:'All Post',
      slug:'/all-post',
      active:authStatus
    },
    {
      name:'Add Post',
      slug:'/add-post',
      active:authStatus
    },
  ]

  return (
    <header className='py-3 shadow bg-slate-900'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-3'>
            <Link to='/'>
              <Logo/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item)=>
            item.active && 
            <li key={item.name}>
              <button
              onClick={()=>navigate(item.slug)}
              className='inline-bock text-gray-400 px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
              >
                {item.name}
              </button>
            </li>
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
