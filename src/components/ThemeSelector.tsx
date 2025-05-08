
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/contexts/ThemeContext";
import { themes } from "@/lib/themes";
import { Check, Moon, Paintbrush, Sun, Layers, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ThemeSelector() {
  const { theme, setTheme, isDarkMode, toggleDarkMode, platformFilter, setPlatformFilter } = useTheme();
  
  const platforms = [
    { id: "all", name: "All Platforms" },
    { id: "twitch", name: "Twitch" },
    { id: "youtube", name: "YouTube" },
    { id: "tiktok", name: "TikTok" },
    { id: "snapchat", name: "Snapchat" }
  ];
  
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Filter platforms"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="end">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Filter Platforms</h4>
            <Tabs defaultValue={platformFilter || "all"} onValueChange={(value) => setPlatformFilter(value === "all" ? null : value)}>
              <TabsList className="w-full">
                {platforms.map((platform) => (
                  <TabsTrigger 
                    key={platform.id} 
                    value={platform.id}
                    className="flex-1"
                  >
                    {platform.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </PopoverContent>
      </Popover>
      
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
              {Object.entries(themes).filter(([key]) => key !== "dark" && key !== "light").map(([key, themeOption]) => (
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
