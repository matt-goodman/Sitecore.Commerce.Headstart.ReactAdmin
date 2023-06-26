import * as fieldNames from "./fieldNames"
import {ValuesType} from "types/type-helpers/ValuesType"

type FieldName = ValuesType<typeof fieldNames>

export const defaultValues: Record<FieldName, any> = {
  [fieldNames.ACTIVE]: true,
  [fieldNames.NAME]: "Default Name",
  [fieldNames.ALL_BUYERS_CAN_ORDER]: true
}
