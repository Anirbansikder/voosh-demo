import { BrowserRouter , Route ,Routes } from 'react-router-dom';
import Register from './components/register'
import Login from './components/login'
import Dashboard from './components/dashboard'
import Orders from './components/orders'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/add-user" exact element={<Register/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/orders" exact element={<Orders/>} />
          <Route path="/" exact element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;