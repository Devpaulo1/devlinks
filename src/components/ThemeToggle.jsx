import { MoonStarsIcon, SunIcon } from './icons'

function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className="theme-toggle group relative mx-auto mb-1 mt-1 block h-8 w-16 cursor-pointer rounded-full outline-offset-4 outline-text focus-visible:outline-2 focus-visible:outline-text"
      role="switch"
      aria-checked={isLight}
      aria-label="Tema claro"
      title={isLight ? 'Ativar tema escuro' : 'Ativar tema claro'}
      onClick={onToggle}
    >
      <span
        className="theme-toggle__track mt-1 block h-6 w-16 rounded-full border border-stroke bg-surface backdrop-blur-[4px]"
        aria-hidden="true"
      />
      <span
        className={`theme-toggle__thumb absolute top-0 left-0 flex size-8 items-center justify-center rounded-full bg-(--switch-thumb-color) text-(--switch-icon-color) transition-transform duration-200 ease-[ease] group-hover:outline-8 group-hover:outline-highlight ${
          isLight ? 'translate-x-8' : 'translate-x-0'
        }`}
        aria-hidden="true"
      >
        {isLight ? (
          <SunIcon className="theme-toggle__icon size-4" />
        ) : (
          <MoonStarsIcon className="theme-toggle__icon size-4" />
        )}
      </span>
    </button>
  )
}

export default ThemeToggle
