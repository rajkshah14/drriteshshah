import page from './page.html?raw'

export default function App() {
  return <div className="template" dangerouslySetInnerHTML={{ __html: page }} />
}
