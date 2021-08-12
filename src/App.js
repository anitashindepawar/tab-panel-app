//import './App.css';
import Tab from './Components/Tab/Tab';

function App() {

  const australiaStates = [{
    link: "NSW",
    details: {
      header: "NSW",
      text: "NSW is a State from australia"
    }
  },
  {
    link: "VIC",
    details: {
      header: "VIC",
      text: "Victoria is a State from australia"
    }
  },
  {
    link: "SA",
    details: {
      header: "SA",
      text: "South Australia is a State from australia"
    }
  }];

  return (
    <div className="App">
      {/* <header className="App-header">
        Tabs Panel
      </header>
      <main>
        <h2>Tabs</h2>
        <p>Click on the buttons inside the tabbed menu:</p> */}
        <Tab data={[...australiaStates]} id="tab1" key="tab1"></Tab>
      {/* </main> */}
    </div>
  );
}

export default App;
