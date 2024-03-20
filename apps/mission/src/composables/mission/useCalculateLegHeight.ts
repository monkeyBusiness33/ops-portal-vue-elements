export const calculateLegHeight = () => {
  const fuelingSections = document.querySelectorAll('.fueling-section') as NodeListOf<HTMLElement>
  const legSections = document.querySelectorAll('.leg-section') as NodeListOf<HTMLElement>

  Array.from(fuelingSections).forEach((leg, index) => {
    const fuelingSectionHeight = fuelingSections[index]?.clientHeight
    if (legSections[index]?.clientHeight) {
      legSections[index].style.height = `${fuelingSectionHeight}px`
    }
  })
}
