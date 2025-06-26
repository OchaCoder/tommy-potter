export const ChevronLeft = ({ size = 24, fill = "#fff" }: { size?: number; fill?: string }) => {
  return (
    <svg role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={`${size}px`} fill={`${fill}`} height="24px">
      <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
    </svg>
  )
}
