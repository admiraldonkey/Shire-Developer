# Planned features:

- Clicker game with user & game state management via useReducer hooks & context providers.
- Purchasable upgrade data drawn from an API and customised to suit theme
- Dynamic UI as player progresses
- Players can login and independently save/load progress from local storage
- Extensive options including theme toggles

# Potential additions

- Progress saving to database or something with more permanence/cross platform utility

# Comments / points to raise

- For larger applications, it may make sense to split GameState and GameDispatch into separate providers. This would allow components that only dispatch actions to run without triggering unnecessary re-renders. As this is a small app, the decision was made to combine them into one GameContext provider to keep things simpler and easier to read.

# TODO

- Move logout function & button from splash screen to options menu
- UI setup
- Styling
- Accessibility with mobile-first approach
- Component & function refactoring
- Add music/sounds & UI themes (light/dark)
- Player feedback (logging in, when buying upgrades, loading saved progress, etc)
- Potentially add test cases (despite the problems with implementing vitest last time...)

- Fix theme switch reloading last saved state (overwriting unsaved progress)
- Fix click feedback only showing +1 regardless of per click value
- Add proper upgrade cards
- Upgrades need to display text based on type (currently all say hps/passive)
- Keyboard interactivity - users should be able to recruit by using spacebar or click
