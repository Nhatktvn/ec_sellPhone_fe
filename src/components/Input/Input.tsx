import type { UseFormRegister } from 'react-hook-form'
interface Props {
  type: string
  name: string
  placeholder: string
  errorMessage?: string
  password?: string
  register: UseFormRegister<any>
}
export default function Input({ type, name, placeholder, password, errorMessage, register }: Props) {
  return (
    <div className='mt-4'>
      <input
        type={type}
        placeholder={placeholder}
        className='p-3 w-full border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        {...register(name)}
      />
      {errorMessage && <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errorMessage}</div>}
    </div>
  )
}
