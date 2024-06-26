/* eslint-disable react/prop-types */
import * as React from "react";
import { cn } from "@/lib/utils";

import { Check, X, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

function MultiSelect({ options, selected, onChange, className, placeholder, ...props }) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item, e) => {
    e.stopPropagation();
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props} className="w-full">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${
            selected.length > 1 ? "h-full" : "h-10"
          }`}
          onClick={() => setOpen(!open)}
        >
          {selected.length > 0 ? (
            <div className="flex gap-1 flex-wrap">
              {selected.map((item) => {
                const selectedOption = options.find(
                  (option) => option.value === item
                );
                return (
                  <Badge
                    variant="default"
                    key={item}
                    className="mr-1 mb-1"
                    onClick={(e) => handleUnselect(item, e)}
                  >
                    {selectedOption ? selectedOption.label : item}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(item, e);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => handleUnselect(item, e)}
                    >
                      <X className="h-3 w-3 hover:text-red-400" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}

          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    selected.includes(option.value)
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value]
                  );
                  setOpen(true);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
