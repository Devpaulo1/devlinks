import { useEffect, useState } from 'react'
import LinkButton from './components/LinkButton'
import Profile from './components/Profile'
import SocialLinks from './components/SocialLinks'
import ThemeToggle from './components/ThemeToggle'
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from './components/icons'

const THEME_STORAGE_KEY = 'devlinks-theme'

// Os links de curso, e-book e portfólio usam destinos públicos provisórios
// indicados pelo responsável. Substitua quando as URLs definitivas existirem.
const links = [
  {
    id: 'curso',
    label: 'Inscreva-se no Curso',
    href: 'https://www.rocketseat.com.br/formacao/fullstack',
  },
  { id: 'ebook', label: 'Baixe meu e-book', href: 'https://www.rocketseat.com.br/ebook' },
  { id: 'portfolio', label: 'Veja meu portfólio', href: 'https://github.com/Devpaulo1' },
  { id: 'meu-curso', label: 'Conheça meu curso', href: 'https://www.rocketseat.com.br/' },
]

const socialLinks = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Devpaulo1', Icon: GithubIcon },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/rocketseat/',
    Icon: InstagramIcon,
  },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@KillRockts', Icon: YoutubeIcon },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/devpaulo1/',
    Icon: LinkedinIcon,
  },
]

function getInitialTheme() {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    return storedTheme === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Sem localStorage, o tema ainda funciona durante a sessão.
    }
  }, [theme])

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app mx-auto w-full max-w-[588px] px-6 pt-14">
      <main>
        <Profile avatarSrc="/img/avatar.png" name="@seu.perfil" />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <nav aria-label="Links principais">
          <ul className="links flex flex-col gap-4 py-6">
            {links.map(({ id, label, href }) => (
              <li key={id}>
                <LinkButton href={href}>{label}</LinkButton>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks links={socialLinks} />
      </main>
      <footer className="footer py-6 text-center text-sm leading-6">
        Feito com{' '}
        <span role="img" aria-label="amor">
          ♥
        </span>{' '}
        pela{' '}
        <a
          className="footer__link rounded-xs no-underline outline-offset-2 outline-text hover:underline focus-visible:outline-2 focus-visible:outline-text"
          href="https://rocketseat.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  )
}

export default App
