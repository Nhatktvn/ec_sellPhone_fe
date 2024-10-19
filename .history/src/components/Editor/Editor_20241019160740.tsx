function Editor() {
  const [value, setValue] = useState('')

  return <ReactQuill theme='snow' value={value} onChange={setValue} />
}

export default Editor
