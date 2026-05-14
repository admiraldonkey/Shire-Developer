import { useGameState } from "./hooks/UseGame";

export const Upgrades = () => {
  const upgrades = useGameState().upgrades;
  console.log(upgrades);
  return (
    <div>
      <h2>Upgrades:</h2>
      {upgrades.length > 1 && (
        <div>
          <h3>Upgrades successfully pulled from API!</h3>
          <p>
            First upgrade name is {upgrades[0].name}, providing{" "}
            {upgrades[0].increase} hobbits per second, and costing{" "}
            {upgrades[0].cost} to upgrade.
          </p>
          <p>
            Fourth upgrade name is {upgrades[3].name}, providing{" "}
            {upgrades[3].increase} hobbits per second, and costing{" "}
            {upgrades[3].cost} to upgrade.
          </p>
        </div>
      )}
    </div>
  );
};
