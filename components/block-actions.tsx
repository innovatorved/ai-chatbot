import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { blockDefinitions, UIBlock } from './block';
import { Dispatch, memo, SetStateAction, useState } from 'react';
import { BlockActionContext } from './create-block';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BlockActionsProps {
  block: UIBlock;
  handleVersionChange: (type: 'next' | 'prev' | 'toggle' | 'latest') => void;
  currentVersionIndex: number;
  isCurrentVersion: boolean;
  mode: 'edit' | 'diff';
  metadata: any;
  setMetadata: Dispatch<SetStateAction<any>>;
}

function PureBlockActions({
  block,
  handleVersionChange,
  currentVersionIndex,
  isCurrentVersion,
  mode,
  metadata,
  setMetadata,
}: BlockActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const blockDefinition = blockDefinitions.find(
    (definition) => definition.kind === block.kind,
  );

  if (!blockDefinition) {
    throw new Error('Block definition not found!');
  }

  const actionContext: BlockActionContext = {
    content: block.content,
    handleVersionChange,
    currentVersionIndex,
    isCurrentVersion,
    mode,
    metadata,
    setMetadata,
  };

  return (
    <div className="flex flex-row gap-1">
      {blockDefinition.actions.map((action) => (
        <Tooltip key={action.description}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={cn('h-fit dark:hover:bg-zinc-700', {
                'p-2': !action.label,
                'py-1.5 px-2': action.label,
              })}
              onClick={async () => {
                setIsLoading(true);

                try {
                  await Promise.resolve(action.onClick(actionContext));
                } catch (error) {
                  toast.error('Failed to execute action');
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={
                isLoading || block.status === 'streaming'
                  ? true
                  : action.isDisabled
                    ? action.isDisabled(actionContext)
                    : false
              }
            >
              {action.icon}
              {action.label}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{action.description}</TooltipContent>
        </Tooltip>
      ))}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="h-fit dark:hover:bg-zinc-700 p-2"
            onClick={async () => {
              setIsLoading(true);

              try {
                // Call the function to draft a follow-up email
                const followUpEmail = await draftFollowUpEmail({
                  userMessage: { role: 'user', content: block.content },
                });
                toast.success('Follow-up email drafted successfully!');
                console.log(followUpEmail);
              } catch (error) {
                toast.error('Failed to draft follow-up email');
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading || block.status === 'streaming'}
          >
            Draft Follow-Up Email
          </Button>
        </TooltipTrigger>
        <TooltipContent>Draft a follow-up email</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="h-fit dark:hover:bg-zinc-700 p-2"
            onClick={async () => {
              setIsLoading(true);

              try {
                // Call the function to make content professional
                const professionalContent = await makeContentProfessional({
                  userMessage: { role: 'user', content: block.content },
                });
                toast.success('Content made professional successfully!');
                console.log(professionalContent);
              } catch (error) {
                toast.error('Failed to make content professional');
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading || block.status === 'streaming'}
          >
            Make Content Professional
          </Button>
        </TooltipTrigger>
        <TooltipContent>Make the content professional</TooltipContent>
      </Tooltip>
    </div>
  );
}

export const BlockActions = memo(PureBlockActions, (prevProps, nextProps) => {
  if (prevProps.block.status !== nextProps.block.status) return false;
  if (prevProps.currentVersionIndex !== nextProps.currentVersionIndex)
    return false;
  if (prevProps.isCurrentVersion !== nextProps.isCurrentVersion) return false;

  return true;
});
