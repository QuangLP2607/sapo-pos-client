import classNames from "classnames/bind";
import { Icon } from "@iconify/react";
import styles from "./TabsBar.module.scss";
import type { TabItem } from "@/interfaces/salesTabs";

const cx = classNames.bind(styles);

interface TabsBarProps {
  tabs: TabItem[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  addTab: () => void;
  closeTab: (id: string) => void;
}

export default function TabsBar({
  tabs,
  activeTab,
  setActiveTab,
  addTab,
  closeTab,
}: TabsBarProps) {
  return (
    <div className={cx("tabs")}>
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTab;
        const showClose = tabs.length > 1;

        return (
          <div key={tab.id} className={cx("tab")}>
            <button
              className={cx("tab-btn", { active: isActive })}
              onClick={() => setActiveTab(tab.id)}
              onMouseDown={(e) => {
                // Middle click → close tab (only if more than 1 tab)
                if (e.button === 1 && tabs.length > 1) {
                  e.preventDefault();
                  closeTab(tab.id);
                }
              }}
            >
              <span className={cx("tab-label")}>Đơn {index + 1}</span>

              {showClose && (
                <span
                  className={cx("tab-close")}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <Icon icon="ion:close" />
                </span>
              )}
            </button>

            <div className={cx("tab-indicator", { active: isActive })} />
          </div>
        );
      })}

      <div className={cx("tabs__add")}>
        <button className={cx("tabs__add-btn")} onClick={addTab}>
          <Icon icon="tabler:plus" />
        </button>
      </div>
    </div>
  );
}
