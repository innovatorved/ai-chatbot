// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'llama3-8b-8192',
    label: 'Llama3 8b 8192',
    apiIdentifier: 'llama3-8b-8192',
    description: 'For simple, single-step tasks',
  },
  {
    id: 'llama3-70b-8192',
    label: 'Llama3 70b 8192',
    apiIdentifier: 'llama3-70b-8192',
    description: 'For complex, multi-step tasks',
  },
  {
    id: 'llama-3.3-70b-versatile',
    label: 'Llama 3.3 70b Versatile',
    apiIdentifier: 'llama-3.3-70b-versatile',
    description: 'For complex, multi-step tasks',
  },
  {
    id: 'llama-3.3-70b-specdec',
    label: 'Llama 3.3 70b SpecDec',
    apiIdentifier: 'llama-3.3-70b-specdec',
    description: 'For complex, multi-step tasks',
  },
  {
    id: 'llama-3.2-90b-vision-preview',
    label: 'Llama 3.2 90b Vision Preview',
    apiIdentifier: 'llama-3.2-90b-vision-preview',
    description:
      'For complex, multi-step tasks, including vision. Tools are not availble with attachments',
  },
  {
    id: 'deepseek-r1-distill-llama-70b',
    label: 'DeepSeek R1 Distill Llama 70b',
    apiIdentifier: 'deepseek-r1-distill-llama-70b',
    description: 'For complex, multi-step tasks, thinking and reasoning',
  },
  {
    id: 'deepseek-r1-distill-qwen-32b',
    label: 'DeepSeek R1 Distill Qwen 32b',
    apiIdentifier: 'deepseek-r1-distill-qwen-32b',
    description: 'For complex, multi-step tasks, thinking and reasoning',
  },
  {
    id: 'qwen-2.5-32b',
    label: 'Qwen 2.5 32b',
    apiIdentifier: 'qwen-2.5-32b',
    description: 'For simple, single-step tasks',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'llama3-70b-8192';
