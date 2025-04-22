import { Body } from "./components/bodySelects/Body";
import { ScannerProvider } from "./contexts/ScannerContext";

function App() {
  return (
    <>
      <ScannerProvider>
        <Body></Body>
      </ScannerProvider>
    </>
  );
}

export default App;
