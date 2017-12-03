import partialRight from 'lodash/partialRight'
import formSerialize from 'form-serialize'

export const serialize = partialRight(formSerialize, { hash: true })

export default serialize
