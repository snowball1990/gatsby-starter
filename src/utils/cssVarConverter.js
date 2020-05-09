import { CSS_VAR_PREFIX } from "@/utils/constants"

const toVarName = key => `--${CSS_VAR_PREFIX}-${key}`
const join = (...args) => args.filter(Boolean).join('-')

export const objectToVars = (prefix, obj) => {
  let vars = {}
  for (let key in obj) {
    if (key === 'modes') continue
    const name = join(prefix, key)
    const value = obj[key]
    if (value && typeof value === 'object') {
      vars = {
        ...vars,
        ...objectToVars(name, value),
      }
    } else {
      vars[toVarName(name)] = value
    }
  }
  return vars
}