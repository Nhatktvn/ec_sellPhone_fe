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

const modules = {
  toolbar: {
    container: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote']],
    [{'list' : 'ordered'},{'list' : 'bullet'}, {'indent' : '-1'}, {'indent' : '+1'}]
  }
}
export default Editor
