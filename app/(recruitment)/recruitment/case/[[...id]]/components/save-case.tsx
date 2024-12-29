'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { createCaseHandler, updateCaseHandler } from '@/handlers/handleCases';
import { Switch } from '@/components/ui/switch';
import { CaseSchema, TCase } from '@/validations/cases';
import { useMutation } from '@tanstack/react-query';
import { TWithId } from '@/global/types';
type TSaveCaseProps = {
  id?: string | null;
};

const SaveCase = ({ id }: TSaveCaseProps) => {
  const form = useFormContext<TWithId<TCase>>();

  const { mutate } = useMutation({
    mutationFn: id
      ? form.handleSubmit(updateCaseHandler)
      : form.handleSubmit(createCaseHandler),
    onSuccess: () => {
      toast({
        title: 'Case saved successfully',
      });
    },
  });

  console.log(form.formState.errors);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ml-auto">
          {!id ? <span>Save Case </span> : <span>Update Case</span>}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {' '}
            {!id ? <span>Save Case </span> : <span>Update Case</span>}
          </SheetTitle>
          <SheetDescription>
            {!id ? (
              <span>Add the case details and click save to publish it</span>
            ) : (
              <span>
                Update necessary case details and click save to publish it
              </span>
            )}
          </SheetDescription>
        </SheetHeader>
        <div>
          <Form {...form}>
            <form onSubmit={mutate} className="grid gap-2 py-4">
              <div>
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ex. React Junior developer"
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  name="duration"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ex. 10" name="name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  name="isFeatured"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-[100%] flex flex-col">
                      <FormLabel>Published</FormLabel>
                      <FormControl>
                        <Switch
                          onCheckedChange={field.onChange}
                          defaultChecked={true}
                          checked={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-[100%]">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Ex. This case is made to assess the skills of a junior react developer"
                          name="description"
                          cols={10}
                          rows={12}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button>
                {!id ? <span>Save Case </span> : <span>Update Case</span>}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SaveCase;
