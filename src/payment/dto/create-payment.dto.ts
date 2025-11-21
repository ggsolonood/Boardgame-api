export class CreatePaymentDto {
  user: string;
  bookingId: string;
  amount: number;
  method?: string;
  status: string;
  paid_at?: Date;
}
