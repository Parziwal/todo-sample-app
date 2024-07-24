import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  signal,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matContrast,
  matDarkMode,
  matFactCheck,
  matLightMode,
  matMenu,
} from '@ng-icons/material-icons/baseline';
import { CommonModule } from '@angular/common';
import { Theme } from '../../theme/theme.enum';
import { ThemeService } from '../../theme/theme.service';

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
  readonly theme = this.themeService.currentTheme;
  readonly ThemeEnum = Theme;

  private isDrawerOpenInternal = signal(true);

  constructor(private themeService: ThemeService) {}

  get isDrawerOpen(): Signal<boolean> {
    return this.isDrawerOpenInternal.asReadonly();
  }

  openDrawer(): void {
    this.isDrawerOpenInternal.update(isDrawerOpen => !isDrawerOpen);
  }

  changeTheme(): void {
    this.themeService.changeThemeToNextOne();
  }
}
