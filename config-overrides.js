// eslint-disable-next-line @typescript-eslint/no-var-requires
const { isEqual } = require('lodash')

// https://github.com/wojtekmaj/react-pdf/issues/280#issuecomment-468276055
module.exports = function override(config) {
  const updatedRules = config.module.rules.filter(
    rule => !isEqual(rule, { parser: { requireEnsure: false } })
  )
  config.module.rules = updatedRules
  return config
}
