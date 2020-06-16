let str: string = 'Hello RTB CLI!'
const arr: number[] = [1, 2, 3, 4, 5]
arr.map((item) => {
  str += item.toString()
})
document.body.innerHTML = str

export default str
