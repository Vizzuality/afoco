import { PropsWithChildren } from 'react';

import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListeners } from '@dnd-kit/core/dist/hooks/utilities';
import { LucideIcon } from 'lucide-react';

import { LayerSettings } from '@/types/layers';

type Sortable = {
  enabled: boolean;
  handle?: boolean;
  handleIcon?: React.ReactNode;
};

type OnChangeOrder = (id: string[]) => void;
type OnChangeOpacity = (opacity: LayerSettings['opacity']) => void;
type OnChangeVisibility = (visibility: LayerSettings['visibility']) => void;
type OnChangeExpand = (expand: boolean) => void;
type OnChangeColumn = (column: string) => void;

export type Settings = Record<string, unknown> & {
  opacity?: number;
  visibility?: 'visible' | 'none';
  expand?: boolean;
};

export type SettingsManager = {
  opacity?: LayerSettings['opacity'];
  visibility?: LayerSettings['visibility'];
  expand?: boolean;
  info?: boolean;
};

export type LegendItemEvents = {
  onChangeOpacity?: OnChangeOpacity;
  onChangeVisibility?: OnChangeVisibility;
  onChangeExpand?: OnChangeExpand;
  onChangeColumn?: OnChangeColumn;
};
/*
 * Legend
 */
export interface LegendProps extends PropsWithChildren {
  className?: string;
  sortable: Sortable;
  onChangeOrder?: OnChangeOrder;
}

export interface LegendItemProps extends LegendItemEvents {
  id: string;
  name?: string;
  className?: string;

  // components
  info?: string;

  // sortable
  sortable?: Sortable;
  listeners?: SyntheticListeners;
  attributes?: DraggableAttributes;

  // settings
  // I extends Dataset['id'] so you can get the correct setting depending on the dataset id
  settings?: Settings;
  settingsManager?: SettingsManager;
}

export interface LegendItemToolbarProps extends LegendItemEvents {
  className?: string;
  // components
  info?: string;
  // settings
  settings?: Settings;
  settingsManager?: SettingsManager;
}

export interface LegendItemButtonProps {
  Icon: LucideIcon;
  selected?: boolean;
  className?: string;
  value?: number;
}

/*
 * Sortable
 */
export interface SortableListProps extends PropsWithChildren {
  className?: string;
  sortable: Sortable;
  onChangeOrder: OnChangeOrder;
}

export interface SortableItemProps extends PropsWithChildren {
  id: string;
  sortable: Sortable;
}

export interface LegendTypeProps {
  className?: string;
  items: Array<{
    value: string;
    color: string;
  }>;
}

export interface LegendMatrixIntersectionsProps {
  intersections: Array<{
    id: number;
    color: string;
  }>;
}
