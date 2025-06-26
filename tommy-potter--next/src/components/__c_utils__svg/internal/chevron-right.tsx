export const ChevronRight = ({ size = 24, fill = "#fff" }: { size?: number; fill?: string }) => {
  return (
    <svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width={`${size}`} fill={`${fill}`}>
      <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
    </svg>
  )
}
