function LinkButton({ href, children }) {
  const isExternal = /^https?:\/\//.test(href)
  const externalProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a
      className="link-button flex min-h-14 items-center justify-center rounded-lg border border-stroke bg-surface px-6 text-center font-medium no-underline backdrop-blur-[4px] outline-offset-2 outline-text transition duration-200 hover:border-text hover:bg-surface-hover hover:shadow-[inset_0_0_0_0.5px_var(--text-color)] focus-visible:outline-2 focus-visible:outline-text"
      href={href}
      {...externalProps}
    >
      {children}
    </a>
  )
}

export default LinkButton
