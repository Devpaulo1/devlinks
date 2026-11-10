function Profile({ avatarSrc, name }) {
  return (
    <header className="profile p-6 text-center">
      <img
        className="profile__avatar mx-auto size-28 rounded-full"
        src={avatarSrc}
        alt={`Avatar de ${name}`}
        width="112"
        height="112"
      />
      <h1 className="profile__name mt-2 text-base font-medium leading-6">{name}</h1>
    </header>
  )
}

export default Profile
