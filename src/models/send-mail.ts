import { getModelForClass, ModelOptions, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { FUNCTIONS, MODULE } from "./enum";

class Abstract {
  _id: Types.ObjectId
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "send_mails"
  },
  options: {
    automaticName: false,
  }
})
export class SendMail extends Abstract {
  @prop({ type: String })
  triggerBy: string

  @prop({ type: String })
  subject: string

  @prop([{ type: String }])
  to: string[]

  @prop([{ type: String }])
  cc: string[]

  @prop([{ type: String }])
  bcc: string[]

  @prop({ type: String })
  content: string

  @prop({ type: String })
  module: MODULE

  @prop({ type: String })
  functions: FUNCTIONS.EMAIL_TEMPLATE

  @prop({ type: Object })
  input: Record<string, any>

  @prop({ type: Object })
  error: any

  @prop({ type: String })
  tenant: string

  createdAt: any
}

export const SendMailModel = getModelForClass(SendMail)