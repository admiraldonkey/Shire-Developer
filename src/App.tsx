import { GameProvider } from "./components/context/GameProvider";
import { UserContextProvider } from "./components/context/UserProvider";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <UserContextProvider>
        <GameProvider>
          <Header />
        </GameProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
