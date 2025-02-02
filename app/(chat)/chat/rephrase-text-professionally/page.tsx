import { cookies } from 'next/headers';

import { DEFAULT_MODEL_NAME, models } from '@/lib/ai/models';
import { PrivateCodeChat } from '@/components/chat';

const chatId = 'rephrase-text-professionally';
const title = 'Rephrase Text Professionally';
const SYSTEM_PROMPT = `
You are an expert communication assistant. For every professional text:
TONE:
- Stay professional and engaging
- Build trust through warmth
- Show respect and understanding
- Keep energy uplifting

STRUCTURE:
- Opening: Lead with a brief personal touch
- Message: Clear, focused, solution-oriented
- Action: Share clear next steps
- Closing: End on an encouraging note

ENHANCE LANGUAGE:
- "We failed to" → "We are working to"
- "It's difficult" → "We have an opportunity"
- "You forgot" → "Let's ensure"
- "Required to" → "Invited to"

KEY RULE:
Before sending, check: "Does this message inspire collaboration and progress?"
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
