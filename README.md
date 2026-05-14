# Planned features:

- Clicker game with state management
- Purchasable upgrade data drawn from an API and names adjusted to suit theme
- Dynamic UI as player progresses
- Local storage to save progress
- Extensive options including theme toggles

# Potential additions

- Consider adding login/logout functionality to add profiles
- Saving progress to a database in keeping with above

# Comments / points to raise

- For larger applications, it may make sense to split GameState and GameDispatch into separate providers. This would allow components that only dispatch actions to run without triggering unnecessary re-renders. As this is a small app, the decision was made to combine them into one GameContext provider to keep things simpler and easier to read.

# TODO

- Update upgrades component
- Complete GameReducer switch cases
