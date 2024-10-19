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
function insertStar() {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, '★')
  this.quill.setSelection(cursorPosition + 1)
}
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ],
    handlers: {
      insertStar: insertStar
    }
  }
}
export default Editor
