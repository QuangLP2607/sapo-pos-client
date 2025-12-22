import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AddCustomerModal.module.scss";
import { Icon } from "@iconify/react";
import customerApi from "@/services/customerService";
import type { Gender } from "@/interfaces/customer";

const cx = classNames.bind(styles);

export interface CreateCustomerForm {
  name: string;
  phoneNum: string;
  gender: Gender;
  note?: string;
}

interface Props {
  onSuccess?: () => void;
}

export function AddCustomerModal({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CreateCustomerForm>({
    name: "",
    phoneNum: "",
    gender: "NaN",
    note: "",
  });

  const update = <K extends keyof CreateCustomerForm>(
    key: K,
    value: CreateCustomerForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phoneNum) return;

    try {
      setLoading(true);

      await customerApi.createCustomer({
        name: form.name,
        phoneNum: form.phoneNum,
        gender: form.gender,
        note: form.note || undefined,
      });

      setOpen(false);
      setForm({
        name: "",
        phoneNum: "",
        gender: "NaN",
        note: "",
      });

      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ADD BUTTON */}
      <button className={cx("add-btn")} onClick={() => setOpen(true)}>
        <Icon icon="mdi:plus" />
        Thêm khách hàng
      </button>

      {/* MODAL */}
      {open && (
        <div className={cx("overlay")} onClick={() => setOpen(false)}>
          <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className={cx("modal__header")}>
              <h3>Thêm khách hàng</h3>
              <button onClick={() => setOpen(false)}>
                <Icon icon="mdi:close" />
              </button>
            </div>

            {/* Body */}
            <div className={cx("modal__body")}>
              <div className={cx("field")}>
                <label>Họ và tên *</label>
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div className={cx("field")}>
                <label>Số điện thoại *</label>
                <input
                  value={form.phoneNum}
                  onChange={(e) => update("phoneNum", e.target.value)}
                  placeholder="0987xxxxxx"
                />
              </div>

              <div className={cx("field")}>
                <label>Giới tính</label>
                <select
                  value={form.gender}
                  onChange={(e) => update("gender", e.target.value as Gender)}
                >
                  <option value="OTHER">Khác</option>
                  <option value="MALE">Nam</option>
                  <option value="FEMALE">Nữ</option>
                </select>
              </div>

              <div className={cx("field")}>
                <label>Ghi chú</label>
                <textarea
                  rows={3}
                  value={form.note}
                  onChange={(e) => update("note", e.target.value)}
                  placeholder="Ghi chú thêm (nếu có)"
                />
              </div>
            </div>

            {/* Footer */}
            <div className={cx("modal__footer")}>
              <button
                className={cx("btn", "btn--ghost")}
                onClick={() => setOpen(false)}
              >
                Huỷ
              </button>
              <button
                className={cx("btn", "btn--primary")}
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Đang tạo..." : "Tạo khách hàng"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
