import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

const baseTrigger =
  "flex items-center justify-between w-full text-sm rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-slate-500";
const variants = {
  default: "bg-gray-50 border border-gray-200 text-slate-700 hover:bg-gray-100 transition-colors",
  ghost: "px-3 bg-transparent border border-transparent hover:border-slate-200 text-slate-700",
};

export const Select = ({
  value,
  onValueChange,
  options,
  placeholder,
  className = "",
  dir,
  variant = "default",
}) => {
  const triggerClasses = `${baseTrigger} ${variants[variant] || variants.default} ${className}`;
  const iconColor = variant === "ghost" ? "text-slate-500" : "text-gray-400";

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} dir={dir}>
      <SelectPrimitive.Trigger className={triggerClasses}>
        <SelectPrimitive.Value
          placeholder={<span className="text-slate-400">{placeholder}</span>}
        />
        <SelectPrimitive.Icon>
          <ChevronDown
            className={`w-4 h-4 ${iconColor}`}
            strokeWidth={2}
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="z-50 overflow-hidden bg-white border border-gray-200 rounded-md shadow-lg min-w-[200px]"
          position="popper"
          sideOffset={5}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-sm cursor-default select-none hover:bg-slate-100 focus:bg-slate-100 outline-none"
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 flex items-center justify-center">
                  <Check className="w-4 h-4" strokeWidth={2} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
