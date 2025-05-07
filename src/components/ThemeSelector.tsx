
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/lib/themes";
import { Check, Moon, Paintbrush, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeSelector() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className="rounded-full"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Change theme"
          >
            <Paintbrush className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="end">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Theme Colors</h4>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(themes).map(([key, themeOption]) => (
                <Button
                  key={key}
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(key)}
                  className={cn(
                    "justify-start gap-2 rounded-full w-10 h-10 p-0",
                    theme === key && "border-2"
                  )}
                  style={{
                    backgroundColor: `hsl(${themeOption.colors.primary})`,
                  }}
                >
                  <span className="sr-only">{themeOption.label}</span>
                  {theme === key && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
