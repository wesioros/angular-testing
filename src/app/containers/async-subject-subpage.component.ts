import { Component, OnDestroy, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AsyncSubject, Observable, Subscription } from "rxjs";
import { Breadcrumb } from "../models/app.models";
import { BreadcrumbService } from "../services/bread-crumb.service";
import { ClipsService } from "../services/injectable-subject.service";
@Component({
  selector: "app-async-subject-subpage",
  template: `
    <app-breadcrumb [breadcrumbs]="breadcrumbs$ | async"> </app-breadcrumb>
    <h1 class="mt-10">AsyncSubject</h1>
    <mat-form-field class="example-full-width mt-10" appearance="fill">
      <mat-label>Valor a emitir</mat-label>
      <input matInput #input /> </mat-form-field
    ><br />
    <button mat-raised-button (click)="asyncSubject.next(input.value)">
      Emitir valor
    </button>
    <button mat-raised-button (click)="completeSubs()">Completar</button>
  `,
  styles: [""],
})
export class AsyncSubjectSubPageComponent implements OnInit, OnDestroy {
  breadcrumbs$: Observable<Breadcrumb[]>;
  asyncSubject = new AsyncSubject();
  subs = new Subscription();

  constructor(
    public ds: ClipsService,
    private toastr: ToastrService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbs$ = breadcrumbService.crumbs$;
  }

  ngOnInit(): void {
    this.subs = this.asyncSubject.subscribe((data) =>
      this.openToast(data, "Valor", "toast-bottom-left")
    );
  }

  openToast(data, sub, pos) {
    this.toastr.success(data, sub, {
      positionClass: pos,
    });
  }

  openToastWarn(data, sub, pos) {
    this.toastr.warning(data, sub, {
      positionClass: pos,
    });
  }

  completeSubs() {
    this.asyncSubject.complete();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
