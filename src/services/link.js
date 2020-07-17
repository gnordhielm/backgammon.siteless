export const makeLink = id => {
  if (!id) {
    console.error('makeLink called without an id')
    return ''
  }

  return `${window.location.origin}/link/${id}`
}
