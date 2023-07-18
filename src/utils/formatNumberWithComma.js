const formatNumberWithComma = number => {
  return number?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}
export default formatNumberWithComma
