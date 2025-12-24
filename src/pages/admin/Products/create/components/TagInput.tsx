import { useEffect, useState, type KeyboardEvent } from "react";
import classNames from "classnames/bind";
import styles from "../styles/tag-input.module.scss";
import { Icon } from "@iconify/react";

const cx = classNames.bind(styles);

const TagInput = ({
  initialTags,
  onTagsChange,
  placeholder,
}: {
  initialTags: string[];
  onTagsChange: (tags: any) => void;
  placeholder: string;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // load data, if it existed.
  useEffect(() => {
    if (initialTags.length > 0) {
      setTags(initialTags);
    }
  }, []);

  useEffect(() => {
    onTagsChange(tags);
  }, [tags]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = inputValue.trim();
      if (!value) return;

      if (tags.includes(value)) {
        setInputValue("");
        return;
      }

      setTags((prev) => [...prev, value]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={cx("container")}>
      {tags.map((value, index) => (
        <div key={index} className={cx("tag")}>
          <span className={cx("text")}>{value}</span>
          <button
            type="button"
            className={cx("remove")}
            onClick={() => handleRemove(index)}
          >
            <span className={cx("delete-icon")}>
              <Icon icon="roentgen:x-5" />
            </span>
          </button>
        </div>
      ))}

      <input
        className={cx("input")}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TagInput;
