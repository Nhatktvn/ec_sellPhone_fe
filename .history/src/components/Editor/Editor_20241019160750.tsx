import { useState } from 'react'

function Editor() {
  const [value, setValue] = useState('')

  return <ReactQuill theme='snow' value={value} onChange={setValue} />
}

export default Editor
