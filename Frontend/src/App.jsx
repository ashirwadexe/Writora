import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import BlogDetails from './Pages/BlogDetails'
import NotFound404 from './Pages/NotFound404'
import Dashboard from './Pages/Dashboard'
import DashboardLayout from './Components/Layout/DashboardLayout'
import MyBlogs from './Pages/MyBlogs'
import CreateBlog from './Pages/CreateBlog'
import EditBlog from './Pages/EditBlog'
import WritoraAI from './Pages/WritoraAI'
import AccountSettngs from './Pages/AccountSettngs'
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/blogs/:id' element={<BlogDetails/>} />

        <Route path='dashboard' element={<DashboardLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='blogs' element={<MyBlogs/>} />
          <Route path='blogs/new' element={<CreateBlog/>} />
          <Route path='blogs/:id/edit' element={<EditBlog/>} />
          <Route path='ai' element={<WritoraAI/>} />
          <Route path='settings' element={<AccountSettngs/>} />
        </Route>

        <Route path='*' element={<NotFound404/>} />
      </Routes>
    </>
  )
}

export default App