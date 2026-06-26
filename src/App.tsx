import { GameProvider } from "./components/context/GameProvider";
import { UserProvider } from "./components/context/UserProvider";
import { useUserState } from "./components/hooks/UseUser";
import { GameLayout } from "./components/layout/GameLayout";
import { SplashScreen } from "./components/SplashScreen";

function AppContent() {
  const { currentUser } = useUserState();

  if (!currentUser) {
    return <SplashScreen />;
  }
  return (
    <GameProvider key={currentUser.name}>
      <GameLayout />
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
