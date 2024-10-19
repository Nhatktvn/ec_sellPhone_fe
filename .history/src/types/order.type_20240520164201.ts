import { cartItem } from './cart.type'

export interface order {
  address: string
  name: string
  phone: string
  deliveryTime: Date | undefined
  totalPrice: number | undefined
  statusOrder: string
  vnPayResponseDTO: VNPayRes
  cartLineItemResponseDTOs: cartItem[]
  id: number
}

interface VNPayRes {
  vnpAmount: string
  vnpBankCode: string
  vnpTransactionNo: string
  vnpOrderInfo: string
  vnpSecureHash: string
  vnpPayDate: string
  vnpTxnRef: string
}