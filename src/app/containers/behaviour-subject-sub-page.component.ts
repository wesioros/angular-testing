import { Component, OnDestroy, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Breadcrumb } from "../models/app.models";
import { BreadcrumbService } from "../services/bread-crumb.service";
import { ClipsService } from "../services/injectable-subject.service";
@Component({
  selector: "app-behaviour-subject-subpage",
  template: `
    <app-breadcrumb [breadcrumbs]="breadcrumbs$ | async"> </app-breadcrumb>
    <h1 class="mt-10">BehaviorSubject</h1>
    <mat-form-field class="example-full-width mt-10" appearance="fill">
      <mat-label></mat-label>
      <input matInput placeholder="Valor a emitir" #input />
    </mat-form-field>

    <button mat-raised-button (click)="behaviorSubject.next(input.value)">
      Emitir valor
    </button>

    <button mat-raised-button (click)="newSubscription()">
      Añadir Suscripción
    </button>
    <li *ngFor="let clip of clips">{{ clip }}</li>
  `,
  styles: [``],
})
export class BehaviourSubjectSubPageComponent implements OnInit, OnDestroy {
  breadcrumbs$: Observable<Breadcrumb[]>;
  clips$: Observable<string[]>;
  clips = [];

  behaviorSubject = new BehaviorSubject(null);
  subs = new Subscription();

  constructor(
    public ds: ClipsService,
    private toastr: ToastrService,

    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbs$ = breadcrumbService.crumbs$;
    this.subs.add(
      this.behaviorSubject.subscribe((data) =>
        data ? this.openToast(data, "Valor", "toast-bottom-left") : null
      )
    );
  }
  ngOnInit(): void {
    this.clips = [];
    this.subs.add(this.ds.clips$.subscribe((data) => this.clips.push(data)));
  }

  newSubscription() {
    this.subs.add(
      this.behaviorSubject.subscribe((data) =>
        this.openToast(data, "1-Subscription Subject", "toast-bottom-left")
      )
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
  ngOnDestroy(): void {
    this.behaviorSubject?.unsubscribe();
    this.subs.unsubscribe();
  }
}
