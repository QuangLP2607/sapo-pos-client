import type { Product } from "@interfaces/product";

const fakeProducts: Product[] = [
  {
    id: "1",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/vn/f2507/gallery/vn-galaxy-z-fold7-f966-sm-f966bdbgxxv-thumb-547553260",
    name: "Quần jean uniqlo",
    sku: "ST215",
    stock: 5,
    price: 900000,
  },
  {
    id: "2",
    image:
      "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/samsung_galaxy_s25_plus_dd_48960d536c.png",
    name: "iPhone X",
    sku: "IPX001",
    stock: 50,
    price: 1000000,
  },
  {
    id: "3",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-1.jpg",
    name: "iPhone 11",
    sku: "IP11-001",
    stock: 30,
    price: 1200000,
  },
  {
    id: "4",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-z-flip-7-1.jpg",
    name: "Samsung S24",
    sku: "SS24-001",
    stock: 20,
    price: 1100000,
  },
  {
    id: "5",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s24-fe_3__4.png",
    name: "Macbook Pro 16",
    sku: "MBP16-001",
    stock: 10,
    price: 2500000,
  },
  {
    id: "6",
    name: "Áo thun nam",
    sku: "ATN001",
    stock: 25,
    price: 200000,
  },
  {
    id: "7",
    name: "Quần short thể thao",
    sku: "QST002",
    stock: 15,
    price: 350000,
  },
  {
    id: "8",
    name: "Giày thể thao Nike",
    sku: "GTN003",
    stock: 8,
    price: 1500000,
  },
  {
    id: "9",
    name: "Túi xách da",
    sku: "TXD004",
    stock: 12,
    price: 800000,
  },
  {
    id: "10",
    name: "Đồng hồ thông minh",
    sku: "DHT005",
    stock: 18,
    price: 2000000,
  },
  {
    id: "11",
    name: "Tai nghe không dây",
    sku: "TNK006",
    stock: 22,
    price: 500000,
  },
  {
    id: "12",
    name: "Balo du lịch",
    sku: "BDL007",
    stock: 7,
    price: 600000,
  },
  {
    id: "13",
    name: "Kính mát",
    sku: "KM008",
    stock: 14,
    price: 400000,
  },
  {
    id: "14",
    name: "Ví da nam",
    sku: "VDN009",
    stock: 9,
    price: 300000,
  },
  {
    id: "15",
    name: "Thắt lưng da",
    sku: "TLD010",
    stock: 16,
    price: 250000,
  },
];

const productApi = {
  getProducts(query?: string): Promise<{ data: Product[] }> {
    const q = query?.trim().toLowerCase() ?? "";

    const filtered = q
      ? fakeProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
        )
      : fakeProducts;

    return Promise.resolve({ data: filtered });
  },
};

export default productApi;
