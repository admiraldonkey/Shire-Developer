import { useGameDispatch, useGameState } from "./hooks/UseGame";
import type { Upgrade } from "../types/Game.types";

export const Upgrades = () => {
  const upgrades = useGameState().upgrades;
  const hobbits = useGameState().hobbits;
  const dispatch = useGameDispatch();

  const handleUpgrade = (id: number) => {
    const upgrade = upgrades.find((u) => u.id === id);
    if (!upgrade) return;
    if (hobbits >= upgrade.costNext) {
      dispatch({ type: "BUY_UPGRADE", payload: id });
    } else {
      console.log(
        `You need another ${upgrade.costNext - hobbits} hobbits to buy ${upgrade.name}!`,
      );
    }
  };

  return (
    <div>
      <h2>Upgrades:</h2>
      {upgrades.length > 1 && (
        <div>
          {upgrades.map((upgrade: Upgrade) => {
            return (
              <div className="border border-black-100 m-1 p-1" key={upgrade.id}>
                <button
                  className="border border-black-200 p-2 mx-1"
                  onClick={() => handleUpgrade(upgrade.id)}
                >
                  {upgrade.name}
                </button>
                <p>Buy Cost: {upgrade.costNext}</p>
                <p>Hobbits Per Second: {upgrade.effect.value}</p>
                <p>Owned: {upgrade.owned}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
