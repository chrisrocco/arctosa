declare let Object: any

export const noArrays = (D) => Array.isArray(D) ? D[0] : D

export const normalizeProps = mapper => (obj) => {
    if (typeof obj !== 'object') return obj
    for (let key of Object.keys(obj))
        obj[key] = normalizeProps(mapper)(mapper(obj[key]))
    return obj
}