import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRepos, UsersService } from '@features/users';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent {
  public data$ = this.activatedRoute.params
    .pipe(
      map((data) => data['id']),
      switchMap((id) => this.usersService.getReposByUsername(id))
    );

  public reposData: IRepos | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalService: NgbModal,
    private readonly usersService: UsersService,
  ) { }

  public onModalOpen(content: TemplateRef<any>, data: IRepos) {
		this.reposData = data;

    this.modalService.open(content);
  }
}
