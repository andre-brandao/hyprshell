import GLib from "gi://GLib"
const img = `/var/lib/AccountsService/icons/${GLib.getenv("USER")}`
const size = 70

export default function Avatar() {
	return (
		<box
			className="Avatar"
			css={`
        min-width: ${size}px;
        min-height: ${size}px;
        background-image: url("${img}");
        background-size: cover;
      `}
		/>
	)
}
