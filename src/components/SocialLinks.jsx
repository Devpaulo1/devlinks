function SocialLinks({ links }) {
  return (
    <nav className="social-links py-4" aria-label="Redes sociais">
      <ul className="social-links__list flex justify-center">
        {links.map(({ id, label, href, Icon }) => {
          const isExternal = /^https?:\/\//.test(href)
          const externalProps = isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {}

          return (
            <li key={id}>
              <a
                className="social-links__link flex items-center justify-center rounded-full p-4 outline-offset-2 outline-text transition-colors duration-200 hover:bg-highlight focus-visible:outline-2 focus-visible:outline-text"
                href={href}
                aria-label={label}
                {...externalProps}
              >
                <Icon className="social-links__icon size-6" />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default SocialLinks
