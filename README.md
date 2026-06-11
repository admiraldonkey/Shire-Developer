# Hobbit Recruitment Agency

### Part of the Shire Redevelopment Initiative

A themed incremental web game built with React, TypeScript, and Tailwind, where players recruit hobbits, purchase upgrades, and help restore the Shire after the Scouring.

## Premise

Reeling from the damage caused by Sharkey and his ruffian allies, the Shire lies scarred by ruin and corruption. Many brave hobbits were killed or wounded at the Battle of Bywater, and the work of restoration has only just begun.

Will you help rebuild what was lost and bring comfort, peace, and prosperity back to the Shire?

## Current Features

- React, TypeScript, and Tailwind front end
- Reducer-driven game state with Context architecture
- User-specific localStorage saves
- API upgrade data transformed into strongly typed game models
- Passive and click-based upgrade effects
- Responsive upgrade card deck
- Mobile-friendly layout with touch-friendly upgrade carousel
- Interactive click feedback for player actions
- Collapsible/overlay upgrade drawer
- Options menu for save/load/testing actions

## In Progress

- Upgrade deck keyboard navigation
- Keyboard-first interaction
- Improved purchase feedback
- Chronicle/event panel
- Restoration stages to drive dynamic UI changes
- Full visual polish: cards, textures, typography, atmosphere, and artwork
- Accessibility-minded design, with ongoing WCAG-focused improvements

## Planned Features

- Dynamic visual progression as the Shire is restored
- Themed Chronicle entries and milestone messages
- Sound and music options
- Reduced motion / accessibility settings
- Planned support for mouse, keyboard, and touch interaction
- Component and utility test coverage

## Future Considerations

- Cloud persistence / cross-device saves

## Comments / points to raise

For a larger application, it may make sense to split game state and dispatch into separate providers. This would allow components that only dispatch actions to avoid re-rendering when state changes. For this project, game state and dispatch are currently combined in one GameContext provider to keep the architecture simpler and easier to follow.

## Development Checklist

- Test new and existing user flows
- Test click and passive income behaviour
- Test passive and click upgrade purchases
- Test save/load/reset behaviour
- Test mobile and desktop layouts
- Continue refactoring components and utility functions as features stabilise

## Additional

Further planning notes and future feature ideas are tracked in `docs/roadmap.md`.
