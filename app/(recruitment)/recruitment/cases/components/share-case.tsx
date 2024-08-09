import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Share2Icon } from 'lucide-react';
import ShareOptions from './share-options';

const ShareCase = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Share2Icon className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <Tabs defaultValue="shared" className="w-[400px] p-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
          </TabsList>
          <TabsContent value="shared">
            <ScrollArea className="h-72 w-full">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Shared with
                </h4>
                <ShareOptions name={''} email={''} userId={''} caseId={''} />
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="share">
            <div className="flex items-center border border-[var(--cruto-border)] rounded-[var(--cruto-radius)] gap-2">
              <Input placeholder="Email" className="border-none" />
              <Button
                variant={'ghost'}
                className="rounded-none rounded-r-[var(--cruto-radius)] hover:bg-[var(--cruto-black)] hover:text-white"
              >
                Search
              </Button>
            </div>
            <div className="p-4">
              <ScrollArea className="h-72 w-full ">
                <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">
                    Share with
                  </h4>
                  <ShareOptions name={''} email={''} userId={''} caseId={''} />
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareCase;
