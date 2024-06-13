import { inject, Injectable } from '@angular/core';
import { LayoutCoreService } from '../../core/services/layout-core.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private _layoutCoreService = inject(LayoutCoreService);

  setLayout(
    layout: Partial<{
      toolbarVisibility: boolean;
      title: string;
      hasMenu: boolean;
      hasBackButton: boolean;
      firstButtonIcon: string;
      firstButtonAction: () => void;
      secondButtonIcon: string;
      secondButtonAction: () => void;
    }>
  ) {
    if (layout.toolbarVisibility) {
      this._setToolbarVisibility(layout.toolbarVisibility);
    }
    if (layout.title) {
      this._setTitle(layout.title);
    }
    if (layout.hasMenu) {
      this._setHasMenu(layout.hasMenu);
    }
    if (layout.hasBackButton) {
      this._setHasBackButton(layout.hasBackButton);
    }
    if (layout.firstButtonIcon) {
      this._setFirstButtonIcon(layout.firstButtonIcon);
    }
    if (layout.firstButtonAction) {
      this._setFirstButtonAction(layout.firstButtonAction);
    }
    if (layout.secondButtonIcon) {
      this._setSecondButtonIcon(layout.secondButtonIcon);
    }
    if (layout.secondButtonAction) {
      this._setSecondButtonAction(layout.secondButtonAction);
    }
  }

  private _setToolbarVisibility(toolbarVisibility: boolean): void {
    this._layoutCoreService.toolbarVisibility.set(toolbarVisibility);
  }

  private _setTitle(title: string) {
    this._layoutCoreService.title.set(title);
  }

  private _setHasMenu(hasMenu: boolean) {
    this._layoutCoreService.hasMenu.set(hasMenu);
  }

  private _setHasBackButton(hasBackButton: boolean) {
    this._layoutCoreService.hasBackButton.set(hasBackButton);
  }

  private _setFirstButtonIcon(firstButtonIcon: string) {
    this._layoutCoreService.firstButtonIcon.set(firstButtonIcon);
  }

  private _setFirstButtonAction(firstButtonAction: () => void) {
    this._layoutCoreService.firstButtonAction.set(firstButtonAction);
  }

  private _setSecondButtonIcon(secondButtonIcon: string) {
    this._layoutCoreService.secondButtonIcon.set(secondButtonIcon);
  }

  private _setSecondButtonAction(secondButtonAction: () => void) {
    this._layoutCoreService.secondButtonAction.set(secondButtonAction);
  }

  switchMenu(force?: boolean | undefined) {
    this._layoutCoreService.switchMenu(force);
  }

  isMenuOpened() {
    return this._layoutCoreService.menuOpened();
  }
}
