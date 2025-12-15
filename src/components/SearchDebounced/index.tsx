// import { useEffect } from "react";
// import { useDebounce } from "@/hooks";
// import classNames from "classnames/bind";
// import styles from "./SearchDebounced.module.scss";
// import { Icon } from "@iconify/react";

// const cx = classNames.bind(styles);

// interface SearchDebouncedProps {
//   value: string;
//   onChange: (value: string) => void;

//   /** gọi ra ngoài khi search đã debounce */
//   onDebouncedChange: (value: string) => void;

//   placeholder?: string;
//   delay?: number;
// }

// export default function SearchDebounced({
//   value,
//   onChange,
//   onDebouncedChange,
//   placeholder = "Tìm kiếm...",
//   delay = 300,
// }: SearchDebouncedProps) {
//   const debounced = useDebounce(value, delay);

//   // notify parent when debounced changed
//   useEffect(() => {
//     onDebouncedChange(debounced);
//   }, [debounced]);

//   return (
//     <div className={cx("search")}>
//       <Icon icon="ic:round-search" className={cx("search-icon")} />
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className={cx("search-input")}
//       />
//     </div>
//   );
// }
