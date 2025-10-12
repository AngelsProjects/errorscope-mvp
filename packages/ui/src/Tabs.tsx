import { cn } from './lib/utils';
import styles from './Tabs.module.css';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(styles.tab, activeTab === tab.id && styles.activeTab)}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined && <span className={styles.count}>({tab.count})</span>}
        </button>
      ))}
    </div>
  );
}
