import { useEffect, useRef, useState, useId } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import styles from "../styles/editor.module.scss";
import type { ProductInfoProps } from "./ProductInfo";
import ProductInfo from "./ProductInfo";

const cx = classNames.bind(styles);

const CustomToolbar = ({ toolbarId }: { toolbarId: string }) => (
  <div id={toolbarId}>
    <span className="ql-formats">
      <button className="ql-code-block" />
    </span>

    <span className="ql-formats">
      <select className="ql-header" defaultValue="">
        <option value="1">Tiêu đề 1</option>
        <option value="2">Tiêu đề 2</option>
        <option value="">Đoạn</option>
      </select>

      <select className="ql-size" defaultValue="normal">
        <option value="small">12</option>
        <option value="normal">14</option>
        <option value="large">18</option>
      </select>
    </span>

    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <select className="ql-color" />
    </span>

    <span className="ql-formats">
      <select className="ql-align" />
    </span>

    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>

    <span className="ql-formats">
      <button className="ql-clean" />
    </span>
  </div>
);

const Editor = ({
  label,
  isSummary = false,
  productInfos,
  onChange,
}: {
  label: string;
  isSummary: boolean;
  productInfos: ProductInfoProps;
  onChange: (productInfos: ProductInfoProps) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [htmlLength, setHtmlLength] = useState(0);
  const maxLength = 100000;
  const toolbarId = useId();

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: `#${toolbarId}`,
      },
      placeholder: "Nhập nội dung...",
    });

    quillRef.current.on("text-change", () => {
      const content = quillRef.current?.root.innerHTML || "";
      setHtmlLength(content.length);
      if (isSummary) {
        onChange({ ...productInfos, summary: content });
      } else {
        onChange({ ...productInfos, content });
      }
    });
  }, [toolbarId, onChange]);

  useEffect(() => {
    if (!quillRef.current) return;

    const initialContent = isSummary
      ? productInfos?.summary || ""
      : productInfos?.content || "";

    if (initialContent && quillRef.current.root.innerHTML !== initialContent) {
      quillRef.current.root.innerHTML = initialContent;
      setHtmlLength(initialContent.length);
    }
  }, []);

  return (
    <div className={cx("wrapper")}>
      <label className={cx("label")}>{label}</label>

      <div className={cx("editorContainer")}>
        <CustomToolbar toolbarId={toolbarId} />
        <div ref={editorRef} />

        <div className={cx("footer")}>
          <span>
            HTML: {htmlLength}/{maxLength}
          </span>
          <span className={cx("infoIcon")}>ⓘ</span>
        </div>
      </div>
    </div>
  );
};

export default Editor;
