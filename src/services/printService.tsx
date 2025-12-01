import axios, { type AxiosResponse } from "axios";
import type { Order } from "@interfaces/order";

interface PrintResponse {
  success: boolean;
  message?: string;
}

const PRINT_API_URL = import.meta.env.VITE_PRINT_API_URL;

if (!PRINT_API_URL) {
  throw new Error("VITE_PRINT_API_URL chưa được cấu hình trong .env");
}

const printClient = axios.create({
  baseURL: PRINT_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const printService = {
  // Gửi lệnh in hóa đơn ra máy in (direct API)
  printOrder(order: Order): Promise<AxiosResponse<PrintResponse>> {
    return printClient.post<PrintResponse>("/order", order);
  },
};

export default printService;
