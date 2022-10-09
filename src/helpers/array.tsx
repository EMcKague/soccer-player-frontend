export const isSingleObject = (key: string[]): Boolean => {
    const lastItem = key[key.length - 1]
    return !isNaN(Number(lastItem))
  }