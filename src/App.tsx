import BabylonScene from "./BabylonScene";

const App: React.FC = () => {
  console.log("vite base url: ", import.meta.env.VITE_BASE_URL);

  return (
    <div className="App">
      <BabylonScene />
    </div>
  );
};

export default App;
