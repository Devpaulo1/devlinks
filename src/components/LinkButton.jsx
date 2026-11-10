function LinkButton({ href, children }) {
  const isExternal = /^https?:\/\//.test(href)
  const externalProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a className="link-button" href={href} {...externalProps}>
      {children}
    </a>
  )
}

export default LinkButton
