export interface order {
  address: string
  name: string
  phone: string
  deliveryTime: Date
  totalPrice: number
  statusOrder: string
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
