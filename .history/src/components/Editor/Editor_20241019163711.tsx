import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function Editor() {
  const [value, setValue] = useState('')
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        // ['link', 'image', 'video', 'formula'],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        // insertStar: insertStar
      }
    }
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color'
  ]
  return (
    <div>
      <ReactQuill theme='snow' value={value} onChange={setValue} modules={modules} formats={formats} />
      <h2>{value}</h2>
    </div>
  )
}
export default Editor
