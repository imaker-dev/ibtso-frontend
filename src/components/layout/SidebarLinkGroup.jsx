import { useState } from "react"

function SidebarLinkGroup({
  children,
  activecondition,
  sidebarExpanded = true,
  itemName = "",
}) {
  
  const [open, setOpen] = useState(activecondition)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <li
      className={`relative mb-0.5 last:mb-0 ${activecondition ? "bg-secondary-50" : ""} ${
        sidebarExpanded
          ? "px-3 py-2 rounded-sm"
          : "px-2 py-2 rounded-lg mx-1 hover:bg-gray-100 transition-colors duration-200"
      }`}
    >
      {children(handleClick, open)}
    </li>
  )
}

export default SidebarLinkGroup
