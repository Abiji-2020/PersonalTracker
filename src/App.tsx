import CheckBoxCard from './components/checkbox'
import { MantineProvider } from '@mantine/core'
import './App.css'
import '@mantine/core/styles.css'
function App() {

  return (
    <MantineProvider>
      <div>
        <CheckBoxCard />
      </div>
    </MantineProvider>
  )
}

export default App
