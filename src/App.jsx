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
import './App.css'

const THEME_STORAGE_KEY = 'devlinks-theme'

// TODO: substituir os hrefs provisórios pelas URLs reais fornecidas pelo responsável.
const links = [
  { id: 'curso', label: 'Inscreva-se no Curso', href: '#' },
  { id: 'ebook', label: 'Baixe meu e-book', href: '#' },
  { id: 'portfolio', label: 'Veja meu portfólio', href: '#' },
  { id: 'meu-curso', label: 'Conheça meu curso', href: '#' },
]

const socialLinks = [
  { id: 'github', label: 'GitHub', href: '#', Icon: GithubIcon },
  { id: 'instagram', label: 'Instagram', href: '#', Icon: InstagramIcon },
  { id: 'youtube', label: 'YouTube', href: '#', Icon: YoutubeIcon },
  { id: 'linkedin', label: 'LinkedIn', href: '#', Icon: LinkedinIcon },
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
    <div className="app">
      <main>
        <Profile avatarSrc="/img/avatar.png" name="@seu.perfil" />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <nav aria-label="Links principais">
          <ul className="links">
            {links.map(({ id, label, href }) => (
              <li key={id}>
                <LinkButton href={href}>{label}</LinkButton>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks links={socialLinks} />
      </main>
      <footer className="footer">
        Feito com{' '}
        <span role="img" aria-label="amor">
          ♥
        </span>{' '}
        pela{' '}
        <a
          className="footer__link"
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
