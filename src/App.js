import './App.css';

const Title =()=><h1>test react</h1>
const Item =()=><p>Test Github</p>

function App() {
  return (
    <div className="app-navbarBG">
      <ul>
          <navbarBG></navbarBG>
          <Title/>
          <Item/>
      </ul>
    </div>
  );
}

export default App;
