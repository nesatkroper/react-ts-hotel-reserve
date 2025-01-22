import { Button } from "@/components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Button>Button</Button>
      </ThemeProvider>
    </>
  );
};

export default App;
