import type { Order } from "@interfaces/order";
import type { Customer } from "@interfaces/customer";
import type { Product } from "@interfaces/product";

// Fake Customers đúng interface mới
const fakeCustomers: Customer[] = [
  {
    id: "c1",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    address: "Hà Nội",
    gender: "Nam",
    birthday: "1995-03-15",
  },
  {
    id: "c2",
    name: "Trần Thị B",
    phone: "0912345678",
    address: "Hồ Chí Minh",
    gender: "Nữ",
    birthday: "1998-08-22",
  },
];

// Fake Products đúng interface bạn gửi
const fakeProducts: Product[] = [
  {
    id: "1",
    name: "iPhone X",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/vn/f2507/gallery/vn-galaxy-z-fold7-f966-sm-f966bdbgxxv-thumb-547553260",
    sku: "IPX001",
    stock: 50,
    price: 1000000,
  },
  {
    id: "2",
    name: "iPhone 11",
    image:
      "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/samsung_galaxy_s25_plus_dd_48960d536c.png",
    sku: "IP11-001",
    stock: 30,
    price: 1200000,
  },
  {
    id: "3",
    name: "Samsung S24",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-1.jpg",
    sku: "SS24-001",
    stock: 20,
    price: 1100000,
  },
  {
    id: "4",
    name: "Macbook Pro 16",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s24-fe_3__4.png",
    sku: "MBP16-001",
    stock: 10,
    price: 2500000,
  },
  {
    id: "5",
    name: "iPad Air",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-1.jpg",
    sku: "IPAD-AIR",
    stock: 25,
    price: 1500000,
  },
  {
    id: "6",
    name: "AirPods Pro",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-1.jpg",
    sku: "AIRPODS-PRO",
    stock: 40,
    price: 5000000,
  },
  {
    id: "7",
    name: "Samsung Galaxy Watch",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-1.jpg",
    sku: "SWATCH-001",
    stock: 15,
    price: 8000000,
  },
  {
    id: "8",
    name: "Xiaomi 13",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-1.jpg",
    sku: "XM13-001",
    stock: 35,
    price: 9000000,
  },
];

// Fake Orders - Generate more orders for testing pagination
const generateFakeOrders = (): Order[] => {
  const orders: Order[] = [];
  const dates = [
    "2025-11-10",
    "2025-11-11",
    "2025-11-12",
    "2025-11-13",
    "2025-11-14",
    "2025-11-15",
    "2025-11-16",
    "2025-11-17",
    "2025-12-18",
    "2025-12-19",
    "2025-12-20",
    "2025-12-21",
    "2025-12-22",
    "2025-12-23",
    "2025-12-24",
  ];

  for (let i = 1; i <= 25; i++) {
    const dateIndex = (i - 1) % dates.length;
    const customerIndex = (i - 1) % fakeCustomers.length;

    // Mỗi đơn hàng có 2-5 sản phẩm
    const numProducts = Math.floor(Math.random() * 4) + 2;
    const selectedProducts: (Product & { qty: number })[] = [];
    const usedProductIndices = new Set<number>();

    // Chọn ngẫu nhiên các sản phẩm không trùng lặp
    while (selectedProducts.length < numProducts) {
      const randomIndex = Math.floor(Math.random() * fakeProducts.length);
      if (!usedProductIndices.has(randomIndex)) {
        usedProductIndices.add(randomIndex);
        const product = fakeProducts[randomIndex];
        const qty = Math.floor(Math.random() * 3) + 1; // 1-3 sản phẩm mỗi loại
        selectedProducts.push({ ...product, qty });
      }
    }

    // Tính tổng tiền từ tất cả sản phẩm
    const totalAmount = selectedProducts.reduce(
      (sum, p) => sum + p.price * p.qty,
      0
    );
    const vat = Math.floor(totalAmount * 0.1);
    const discount = i % 5 === 0 ? Math.floor(totalAmount * 0.1) : 0;
    const payable = totalAmount + vat - discount;

    orders.push({
      id: String(i),
      customer: fakeCustomers[customerIndex],
      note: i % 3 === 0 ? `Ghi chú đơn hàng ${i}` : undefined,
      products: selectedProducts,
      totalAmount,
      vat,
      discount,
      payable,
      paidAt: new Date(
        `${dates[dateIndex]}T${10 + (i % 8)}:${(i * 5) % 60}:00`
      ),
    });
  }

  return orders;
};

const fakeOrders: Order[] = generateFakeOrders();

// Fake API
const orderApi = {
  getOrders(query?: string): Promise<{ data: Order[] }> {
    const q = query?.trim().toLowerCase() ?? "";

    const filtered = q
      ? fakeOrders.filter((o) => {
          const customerName = o.customer?.name?.toLowerCase() ?? "";
          const phone = o.customer?.phone?.toLowerCase() ?? "";
          const note = o.note?.toLowerCase() ?? "";
          return (
            customerName.includes(q) || phone.includes(q) || note.includes(q)
          );
        })
      : fakeOrders;

    return Promise.resolve({ data: filtered });
  },
};

export default orderApi;
