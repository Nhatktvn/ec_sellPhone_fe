import http from '../utils/http'
interface dataAddCoupon {
  codeCoupon : string,
  typeCoupon : string
  couponValue: number
  private double minimumAmount;
  private int quantity;
  private LocalDateTime startTime;
  private LocalDateTime endTime;
}
export const addCoupon = (data:) => http.post('/admin/coupon')
