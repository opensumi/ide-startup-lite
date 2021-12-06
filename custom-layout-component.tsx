import * as React from 'react';
import { SlotRenderer } from '@opensumi/ide-core-browser';
import { BoxPanel, SplitPanel, getStorageValue } from '@opensumi/ide-core-browser/lib/components';

// 插槽的划分
export function LayoutComponent() {
  const {colors, layout} = getStorageValue();

  return <BoxPanel direction='top-to-bottom'>
    <SlotRenderer color={colors.menuBarBackground} defaultSize={27} slot='top' />
    <SplitPanel overflow='hidden' id='main-horizontal' flex={1}>
      <SlotRenderer slot='left' color={colors.sideBarBackground}  defaultSize={layout.left?.currentId ? (layout.left?.size || 384) : 49} minResize={204} minSize={49} />
      <SplitPanel id='main-vertical' minResize={300} flexGrow={1} direction='top-to-bottom'>
        <SlotRenderer color={colors.editorBackground}  flex={2} flexGrow={1} minResize={200} slot='main' />
        <SlotRenderer color={colors.panelBackground} flex={1} defaultSize={layout.bottom?.size} minResize={160} slot='bottom' />
      </SplitPanel>
    </SplitPanel>
    <SlotRenderer color={colors.statusBarBackground} defaultSize={24} slot='statusBar' />
  </BoxPanel>;
}
