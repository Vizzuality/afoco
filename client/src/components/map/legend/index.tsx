import React, { useMemo, Children, isValidElement } from 'react';

import { cn } from '@/lib/classnames';

// import SortableList from './sortable/list';
import { LegendProps } from './types';

export const Legend: React.FC<LegendProps> = ({
  children,
  className = '',
}: // sortable,
// onChangeOrder,
LegendProps) => {
  const isChildren = useMemo(() => {
    return !!Children.count(Children.toArray(children).filter((c) => isValidElement(c)));
  }, [children]);

  return (
    <div
      className={cn({
        'relative flex grow flex-col space-y-2 overflow-hidden': true,
        hidden: !isChildren,
        [className]: !!className,
      })}
    >
      {/* {isChildren && (
        <div className="relative flex h-full flex-col overflow-hidden">
          <div className="flex flex-col space-y-1 overflow-y-auto overflow-x-hidden">
            {!!sortable.enabled && !!onChangeOrder && (
              <SortableList sortable={sortable} onChangeOrder={onChangeOrder}>
                {children}
              </SortableList>
            )}

            {!sortable.enabled && children}
          </div>
        </div>
      )} */}
      {children}
    </div>
  );
};

export default Legend;
