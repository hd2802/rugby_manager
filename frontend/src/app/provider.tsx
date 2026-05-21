import { ThemeProvider } from "@/components/theme-provider" 


function Provider({ children }: any) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  )
}

export default Provider;