import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import FeedList from 'pages/FeedList'
import FeedDetail from 'pages/FeedDetail'
import Profile from 'pages/Profile'
import ProfileEdit from 'pages/ProfileEdit'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import NotFound from 'pages/NotFound'
import Home from 'pages/Home'
import { getLoginCookie } from 'utils/loginCookie'
import ProductList from 'pages/ProductList'
import ProductCreate from 'pages/ProductCreate'
import ProductDetail from 'pages/ProductDetail'
import FeedCreate from 'pages/FeedCreate'

const App = () => {
  const PublicRoutes = () => {
    return getLoginCookie() ? <Navigate to='/' replace /> : <Outlet />
  }
  const PrivateRoutes = () => {
    return getLoginCookie() ? <Outlet /> : <Navigate to='/signin' replace />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        {/* Public Route */}
        <Route element={<PublicRoutes />}>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
        {/* Private Route */}
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<ProductList />} />
          <Route path='/product/create' element={<ProductCreate />} />
          <Route path='/product/detail/:id' element={<ProductDetail />} />
          <Route path='/feed' element={<FeedList />} />
          <Route path='/feed/create' element={<FeedCreate />} />
          <Route path='/feed/detail/:id' element={<FeedDetail />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/edit' element={<ProfileEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
