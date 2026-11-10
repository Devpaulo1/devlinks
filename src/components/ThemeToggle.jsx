import { MoonStarsIcon, SunIcon } from './icons'

function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isLight}
      aria-label="Tema claro"
      title={isLight ? 'Ativar tema escuro' : 'Ativar tema claro'}
      onClick={onToggle}
    >
      <span className="theme-toggle__track" aria-hidden="true" />
      <span className="theme-toggle__thumb" aria-hidden="true">
        {isLight ? (
          <SunIcon className="theme-toggle__icon" />
        ) : (
          <MoonStarsIcon className="theme-toggle__icon" />
        )}
      </span>
    </button>
  )
}

export default ThemeToggle
