import './App.css';
import {Route, Routes} from 'react-router-dom';
import Card from './components/Card';
import Detail from './components/Detail/index.js';
import Home from './components/Home'
// import Searchbar from './components/Searchbar';
import NavBarCompoment from './components/Navbar';

function App() {
  
  return (
   <div>
   
   <Routes>
    
    <Route exact path='/' element={<Home/>}/> /// navbar no toma algunos css
    <Route path='/casa' element={<Card/>}/> /// renderiza las recetas en general
    <Route path='/navbar' element={<NavBarCompoment/>}/>
    <Route path='/detail/:id' element={<Detail/>}/>
    {/* <Route path='/recipes/:ingredients' element={<Searchbar/>}/> */}
    </Routes>
    </div>
  );
}

export default App;
