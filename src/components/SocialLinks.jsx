function SocialLinks({ links }) {
  return (
    <nav className="social-links" aria-label="Redes sociais">
      <ul className="social-links__list">
        {links.map(({ id, label, href, Icon }) => {
          const isExternal = /^https?:\/\//.test(href)
          const externalProps = isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {}

          return (
            <li key={id}>
              <a
                className="social-links__link"
                href={href}
                aria-label={label}
                {...externalProps}
              >
                <Icon className="social-links__icon" />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default SocialLinks
