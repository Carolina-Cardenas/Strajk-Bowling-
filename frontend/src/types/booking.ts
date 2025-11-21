export interface BookingRequest {
  when: string;
  lanes: number;
  people: number;
  shoes: number[];
}

export interface BookingResponse {
  bookingDetails: {
    when: string;
    lanes: number;
    people: number;
    shoes: number[];
    price: number;
    id: string;
    active: boolean;
  };
}
