const calculateHeightImgAre = () => {
  const screenHeight = window.innerHeight
  const header = document.getElementById('header')
  const bottomHeader = header.getBoundingClientRect().bottom
  return screenHeight - bottomHeader
}

export default calculateHeightImgAre
