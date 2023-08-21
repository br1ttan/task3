import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IUser, UsersService } from '@features/users';
import { Subject, takeUntil, Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  public users$: Observable<IUser[] | null> = of([]);
  public errorMessage: string | null = null;
  public isColumns = true;
  private readonly subject$ = new Subject<void>();
  private searchFieldValue = '';

  constructor(
    private readonly usersService: UsersService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.users$ = this.usersService.getAllUsers();
  }

  public ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

  public onToggleColumns(): void {
    this.isColumns = !this.isColumns;
  }

  public onSearchFieldChange(value: string): void {
    if (value == this.searchFieldValue || !value) return;

    this.searchFieldValue = value;
    this.errorMessage = null;

    this.usersService.getUsersByUsername(value)
      .pipe(takeUntil(this.subject$))
      .subscribe({
        next: (data) => this.users$ = of(data),
        error: (error) => this.errorMessage = `Error: ${error.message}`,
        complete: () => this.changeDetector.detectChanges()
    });
  }
}
