export const useColor = () => {
  const randomColor = () => {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)
  }

  return {
    randomColor
  }
}
