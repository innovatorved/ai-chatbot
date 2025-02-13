import { cookies } from 'next/headers';

import { DEFAULT_MODEL_NAME, models } from '@/lib/ai/models';
import { PrivateCodeChat } from '@/components/chat';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://chatbot-in.vercel.app/rephrase-text-professionally',
  ),
  title: 'Rephrase Text Professionally',
};

const chatId = 'rephrase-text-professionally';
const title = 'Rephrase Text Professionally';
const SYSTEM_PROMPT = `
You are an expert communication assistant. For every professional text:
Rephrase the text, correct the grammatic errors to make it more professional.
`;
export default async function PrivateCodeChatPage() {
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('model-id')?.value;
  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  return (
    <PrivateCodeChat
      id={chatId}
      selectedModelId={selectedModelId}
      systemPrompt={SYSTEM_PROMPT}
    />
  );
}
