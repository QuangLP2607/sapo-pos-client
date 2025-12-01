import type { Customer } from "@interfaces/customer";

const fakeCustomers: Customer[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    address: "Hà Nội",
    gender: "Nam",
    birthday: "1998-05-12",
  },
  {
    id: "2",
    name: "Trần Thị B",
    phone: "0912345678",
    address: "TP Hồ Chí Minh",
    gender: "Nữ",
    birthday: "2000-08-20",
  },
  {
    id: "3",
    name: "Lê Minh C",
    phone: "0923456789",
    address: "Đà Nẵng",
    gender: "Nam",
    birthday: "1995-02-10",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    phone: "0934567890",
    address: "Cần Thơ",
    gender: "Nữ",
    birthday: "1999-11-05",
  },
];

const customerApi = {
  getCustomers(query?: string): Promise<{ data: Customer[] }> {
    const q = query?.trim().toLowerCase() ?? "";

    const filtered = q
      ? fakeCustomers.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.phone.toLowerCase().includes(q)
        )
      : fakeCustomers;

    return Promise.resolve({ data: filtered });
  },
};

export default customerApi;
