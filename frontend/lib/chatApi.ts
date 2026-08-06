import { postJson } from "./api";
import type { ChatMessage, NdaFormData } from "./types";

export interface NdaChatResult {
  reply: string;
  fields: NdaFormData;
}

export function sendNdaChatMessage(
  messages: ChatMessage[],
  fields: NdaFormData
): Promise<NdaChatResult> {
  return postJson("/api/nda/chat", { messages, fields });
}
