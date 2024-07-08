import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

export function SwitchDemo() {
  const { setTheme, theme } = useTheme()
  return (
    <div className="flex items-center space-x-1 mr-2 " onClick={() => {
      if (theme == "light") {
        setTheme("dark")
      } else {
        setTheme("light")
      }
      console.log("setTheme")
      console.log(theme)
    }} >
      <Switch id="toggle-theme" className="bg-gray-50 dark:bg-gray-700" />
    </div>
  )
}

