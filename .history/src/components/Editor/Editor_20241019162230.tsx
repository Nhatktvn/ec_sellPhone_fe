import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
function Editor() {
  const [value, setValue] = useState('')

  return (
    <div>
      <ReactQuill theme='snow' value={value} onChange={setValue} />
    </div>
  )
}

const modules = []
export default Editor
