import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { LayoutCoreService } from '../../services/layout-core.service';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { List } from '../../models/list.model';
import { CapitalizeFirstLettersPipe } from '../../../shared/pipes/capitalize-first-letters.pipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddListDialogComponent } from '../../../components/add-list-dialog/add-list-dialog.component';
import { DataFacadeService } from '../../../shared/services/data-facade.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'main-container',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbar,
    MatIconButton,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    CapitalizeFirstLettersPipe,
    RouterLink,
    AsyncPipe,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block h-dvh',
  },
})
export class MainContainerComponent implements OnInit {
  layoutCoreService = inject(LayoutCoreService);
  private _dataService = inject(DataFacadeService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private readonly _dialog = inject(MatDialog);

  isMain = computed(() => {
    return this._activatedRoute.snapshot.url.pop()?.path === 'list';
  });

  lists$: Observable<List[] | null> | undefined;

  ngOnInit() {
    this.lists$ = this._dataService.lists$;
    this._dataService.getLists();
  }

  navigateToList(drawer: MatSidenav, list: List | undefined = undefined) {
    this._router.navigate(
      ['', 'list', list?.title.split(' ').join('-') ?? ''],
      { state: { list } }
    );
    drawer.toggle();
  }

  openAddListDialog() {
    const dialogRef = this._dialog.open(AddListDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._dataService.getLists();
      }
    });
  }

  openEditListDialog(list: List) {
    const dialogRef = this._dialog.open(AddListDialogComponent, {
      data: list,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this._dataService.getLists();
      }
    });
  }
}
