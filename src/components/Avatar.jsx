import { createAvatar } from "@dicebear/core"
import { funEmoji, initials } from "@dicebear/collection"

const Avatar = ({ seed, type = "all" }) => {
  const avatar = createAvatar(funEmoji, {
    seed: seed,
  })
  const avataTwo = createAvatar(initials, {
    seed: seed,
  })
  if (type === "all") {
    return (
      <div>
        <img src={avatar.toDataUri()} alt="Avatar" />
      </div>
    )
  }

  if (type === "customer") {
    return (
      <div>
        <img src={avataTwo.toDataUri()} alt="Avatar" />
      </div>
    )
  }
}

export default Avatar

