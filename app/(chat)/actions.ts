'use server';

import { type CoreUserMessage, generateText, Message } from 'ai';
import { cookies } from 'next/headers';

import { customModel } from '@/lib/ai';
import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisiblityById,
} from '@/lib/db/queries';
import { VisibilityType } from '@/components/visibility-selector';

export async function saveModelId(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('model-id', model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: Message;
}) {
  const { text: title } = await generateText({
    model: customModel('llama-3.1-8b-instant'),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisiblityById({ chatId, visibility });
}

export async function draftFollowUpEmail({
  userMessage,
}: {
  userMessage: CoreUserMessage;
}) {
  const { text: followUpEmail } = await generateText({
    model: customModel('llama-3.1-8b-instant'),
    system: `\n
    - you will generate a follow-up email based on the user's message
    - ensure it is professional and concise
    - include a subject line and a body`,
    prompt: JSON.stringify(userMessage),
  });

  return followUpEmail;
}

export async function makeContentProfessional({
  userMessage,
}: {
  userMessage: CoreUserMessage;
}) {
  const { text: professionalContent } = await generateText({
    model: customModel('llama-3.1-8b-instant'),
    system: `\n
    - you will rewrite the user's message to make it professional
    - ensure it is clear and concise`,
    prompt: JSON.stringify(userMessage),
  });

  return professionalContent;
}
