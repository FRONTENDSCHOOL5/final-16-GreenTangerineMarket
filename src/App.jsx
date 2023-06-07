import { BrowserRouter, Route, Routes } from 'react-router-dom'

import FeedList from 'pages/FeedList'
import FeedDetail from 'pages/FeedDetail'
import Profile from 'pages/Profile'
import ProfileEdit from 'pages/ProfileEdit'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import NotFound from 'pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FeedList />} />
        <Route path='/detail' element={<FeedDetail />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit' element={<ProfileEdit />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
