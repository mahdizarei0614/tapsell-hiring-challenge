import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { LayoutCoreService } from '../../services/layout-core.service';

@Component({
  selector: 'main-container',
  standalone: true,
  imports: [MatIcon, MatToolbar, MatIconButton],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainerComponent {
  layoutCoreService = inject(LayoutCoreService);
}
