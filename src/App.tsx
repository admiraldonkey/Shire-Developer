import { GameProvider } from "./components/context/GameProvider";
import { UserProvider } from "./components/context/UserProvider";
import { Header } from "./components/Header";
import { useUserState } from "./components/hooks/UseUser";
import { SplashScreen } from "./components/SplashScreen";
import { Upgrades } from "./components/Upgrades";

function AppContent() {
  const { currentUser } = useUserState();

  if (!currentUser) {
    return <SplashScreen />;
  }
  return (
    <GameProvider>
      <Header />
      <Upgrades />
    </GameProvider>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
