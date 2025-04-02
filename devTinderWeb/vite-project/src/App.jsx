import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Body from './components/Body';
import Feed from './components/Feed';
import { Provider } from 'react-redux';
import appStore from './utils/appStore'
import Connections from './components/Connections';
import Request from './components/Request';
import Profile from './components/Profile';
import Chat from './components/Chat';

function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename='/'>  
      <Routes>
        <Route path='/' element={<Body />} >
          <Route path='/feed' element={<Feed />} />
          <Route path='/' element={<Login />} />
          <Route path='/connections' element= {<Connections />} />
          <Route path='/requests' element= {<Request />} />
          <Route path='/profile' element={ <Profile /> } />
          <Route path='/chat/:targetUserId' element = { <Chat/> }/>
        </Route>  
      </Routes>    
    </BrowserRouter>
    </Provider>
  );
}

export default App;
