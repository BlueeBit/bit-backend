import { TransformableInfo } from "../types/logger"

export const templateFunction = (info: TransformableInfo) => {
  let template = ""
  template += `${new Date()} `
  template += `${info.level}\ntraceId: `
  template += `${info.traceId}:\n\t`
  template += `${info.message}\n\n`
  return template
}
