import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

const baseTrigger =
  "group flex w-full items-center justify-between gap-3 rounded-xl border text-sm font-medium leading-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20 disabled:cursor-not-allowed disabled:opacity-60";
const variants = {
  default:
    "h-12 border-slate-200 bg-white px-4 text-slate-800 shadow-sm shadow-slate-900/5 hover:border-slate-300 hover:bg-slate-50 focus:border-slate-400",
  ghost:
    "h-10 border-transparent bg-transparent px-3 text-slate-700 hover:border-slate-200 hover:bg-white/80 focus:border-slate-300",
};
const joinClasses = (...classes) => classes.filter(Boolean).join(" ");

export const Select = ({
  value,
  onValueChange,
  options,
  placeholder,
  className = "",
  dir,
  variant = "default",
}) => {
  const isRtl = dir === "rtl";
  const triggerClasses = joinClasses(
    baseTrigger,
    variants[variant] || variants.default,
    isRtl && "flex-row-reverse text-right",
    className,
  );
  const iconColor = variant === "ghost" ? "text-slate-500" : "text-slate-400";

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} dir={dir}>
      <SelectPrimitive.Trigger className={triggerClasses}>
        <span className="min-w-0 flex-1 truncate">
          <SelectPrimitive.Value
            placeholder={<span className="text-slate-400">{placeholder}</span>}
          />
        </span>
        <SelectPrimitive.Icon className="flex shrink-0 items-center">
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180 ${iconColor}`}
            strokeWidth={2}
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="z-50 max-h-[320px] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl shadow-slate-900/10"
          position="popper"
          sideOffset={8}
          align={isRtl ? "end" : "start"}
          collisionPadding={12}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className={joinClasses(
                  "relative flex min-h-10 cursor-default select-none items-center rounded-lg py-2.5 text-sm font-medium text-slate-700 outline-none transition-colors data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-100 data-[state=checked]:bg-slate-900 data-[state=checked]:text-white data-[disabled]:opacity-50",
                  isRtl ? "pr-9 pl-3 text-right" : "pl-9 pr-3 text-left",
                )}
              >
                <SelectPrimitive.ItemIndicator
                  className={joinClasses(
                    "absolute flex items-center justify-center",
                    isRtl ? "right-3" : "left-3",
                  )}
                >
                  <Check className="w-4 h-4" strokeWidth={2} />
                </SelectPrimitive.ItemIndicator>
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
