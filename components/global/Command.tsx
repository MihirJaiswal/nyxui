import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "../../lib/utils";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface CommandProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  className?: string;
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-white dark:bg-black text-black dark:text-white",
        className,
      )}
      {...props}
    />
  ),
);
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  children: React.ReactNode;
  title?: string;
}

const CommandDialog: React.FC<CommandDialogProps> = ({
  children,
  title = "Command Menu",
  ...props
}) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg border border-zinc-300 dark:border-zinc-700">
        <DialogTitle className="sr-only text-black dark:text-white">
          {title}
        </DialogTitle>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
};

interface CommandInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  className?: string;
}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div
      className="flex items-center border-b border-zinc-300 dark:border-zinc-700 px-3"
      cmdk-input-wrapper=""
    >
      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
CommandInput.displayName = CommandPrimitive.Input.displayName;

interface CommandListProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
  className?: string;
}

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      className={cn(
        "max-h-[300px] overflow-y-auto overflow-x-hidden",
        className,
      )}
      {...props}
    />
  ),
);
CommandList.displayName = CommandPrimitive.List.displayName;

type CommandEmptyProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
>;

const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  (props, ref) => (
    <CommandPrimitive.Empty
      ref={ref}
      className="py-6 text-center text-sm"
      {...props}
    />
  ),
);
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

interface CommandGroupProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
  className?: string;
}

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden p-1 text-black dark:text-white [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
CommandGroup.displayName = CommandPrimitive.Group.displayName;

interface CommandSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {
  className?: string;
}
const CommandSeparator = React.forwardRef<
  HTMLDivElement,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  className?: string;
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none ",
        className,
      )}
      {...props}
    />
  ),
);
CommandItem.displayName = CommandPrimitive.Item.displayName;
interface CommandShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const CommandShortcut: React.FC<CommandShortcutProps> = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-black dark:text-white",
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
