import './App.css';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Main from './Main';
import Menu from './menu/Menu';

function App({match, history}) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path={"/"} element={<Main/>}/>
            <Route exact path={"/menu"} element={<Menu/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
