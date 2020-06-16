let str: string = 'Hello RTB CLI!'
const arr: number[] = [1, 2, 34]
arr.map((item) => {
  str += item.toString()
})
document.body.innerHTML = str

const env = process.env.NODE_ENV
console.log(env)

document.write(
  '<script src="http://' +
    (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1"></' +
    'script>'
)

export default str
