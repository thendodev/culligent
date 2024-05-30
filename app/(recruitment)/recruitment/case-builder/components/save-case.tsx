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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { CaseSchema, TCase } from '../../../../../validations/cases';
import { toast } from '@/components/ui/use-toast';
import { createCaseHandler } from '@/handlers/handleCases';

type TSaveCaseProps = {
  form: UseFormReturn<TCase>;
};

const SaveCase = ({ form }: TSaveCaseProps) => {
  const onSubmit = async () => {
    //get form from react forms
    const newCase = form.getValues();

    //validate form
    const isValid = CaseSchema.safeParse(newCase);
    if (!isValid.success) {
      return isValid.error.errors.map((error) =>
        toast({
          title: error.path[0] as string,
          description: error.message,
        }),
      );
    }
    await createCaseHandler(newCase);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ml-auto">Save Case</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Save Case</SheetTitle>
          <SheetDescription>
            Almost done !, Add the final case details and click save to publish
            it.
          </SheetDescription>
        </SheetHeader>
        <div>
          <Form {...form}>
            <form className="grid gap-2 py-4">
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
              <div className="grid grid-cols-2 items-center gap-4">
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
            </form>
          </Form>
          <Button type="submit" onClick={onSubmit}>
            Save changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SaveCase;
