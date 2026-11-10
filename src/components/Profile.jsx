function Profile({ avatarSrc, name }) {
  return (
    <header className="profile">
      <img
        className="profile__avatar"
        src={avatarSrc}
        alt={`Avatar de ${name}`}
        width="112"
        height="112"
      />
      <h1 className="profile__name">{name}</h1>
    </header>
  )
}

export default Profile
