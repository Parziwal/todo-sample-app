import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matContrast,
  matDarkMode,
  matFactCheck,
  matLightMode,
  matMenu,
} from '@ng-icons/material-icons/baseline';
import { ThemeService } from '../../theme/theme.service';
import { Theme } from '../../theme/theme.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      matMenu,
      matFactCheck,
      matLightMode,
      matDarkMode,
      matContrast,
    }),
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [],
})
export class HeaderComponent {
  private _isDrawerOpen = signal(true);

  isDrawerOpen = this._isDrawerOpen.asReadonly();
  theme = this.themeService.theme;
  ThemeEnum = Theme;

  constructor(private themeService: ThemeService) {}

  openDrawer(): void {
    this._isDrawerOpen.update((isDrawerOpen) => !isDrawerOpen);
  }

  changeTheme() {
    this.themeService.changeThemeToNextOne();
  }
}
