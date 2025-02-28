import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Sliders } from 'lucide-react';
import DatePickerWithRange from './date-pickers';
import { Switch } from '@/components/ui/switch';
import { IFilters } from './posts';

interface IFiltersPopoverProps {
  currentFilters: IFilters;
  handleFilters: (filter: IFilters) => void;
}
export const FiltersPopover = ({
  currentFilters,
  handleFilters,
}: IFiltersPopoverProps) => {


  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Sliders /> Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-80">
        <div className="grid gap-4 justify-center">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Post Filters</h4>
            <p className="text-sm text-muted-foreground">
              Filter your post results.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-row-3 items-center gap-2">
              <Label htmlFor="IncludeArchived">Include archived</Label>
              <Switch
                defaultChecked={currentFilters.includeArchived}
                onCheckedChange={(checked) =>
                  handleFilters({ ...currentFilters, includeArchived: checked })
                }
                id="archive-included"
              />
            </div>
            <div className="grid grid-row-3 items-center gap-2">
              <Label htmlFor="height">Include unpublished</Label>
              <Switch
                defaultChecked={currentFilters.includeUnpublished}
                onCheckedChange={(checked) =>
                  handleFilters({
                    ...currentFilters,
                    includeUnpublished: checked,
                  })
                }
                id="unpublished-included"
              />
            </div>
            <div className="grid grid-row-3 items-center gap-2">
              <Label htmlFor="width">Date range</Label>
              <DatePickerWithRange />
            </div>
            <div className="grid grid-row-3 items-center gap-2">
              <Label htmlFor="minApplicants">Min. applicants</Label>
              <Input
                defaultValue={currentFilters.minApplicants}
                onChange={({ currentTarget }) =>
                  handleFilters({
                    ...currentFilters,
                    minApplicants: parseInt(currentTarget.value),
                  })
                }
                id="minApplicants"
                type="number"
              />
            </div>
            <div className="grid grid-row-3 items-center gap-2">
              <Label htmlFor="maxApplicants">Max. applicants</Label>
              <Input
                defaultValue={currentFilters.maxApplicants}
                onChange={({ currentTarget }) =>
                  handleFilters({
                    ...currentFilters,
                    maxApplicants: parseInt(currentTarget.value),
                  })
                }
                id="maxApplicants"
                type="number"
              />
            </div>
          </div>
          <div>
            <Button variant={'destructive'} className="w-full">
              Reset filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
