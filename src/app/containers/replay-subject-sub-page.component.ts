import { Component, OnDestroy, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, ReplaySubject, Subscription } from "rxjs";
import { Breadcrumb } from "../models/app.models";
import { BreadcrumbService } from "../services/bread-crumb.service";
import { ClipsService } from "../services/injectable-subject.service";

@Component({
  selector: "app-replay-subject-subpage",
  template: `
    <app-breadcrumb [breadcrumbs]="breadcrumbs$ | async"> </app-breadcrumb>
    <h1 class="mt-10">ReplaySubject</h1>
    <mat-form-field class="example-full-width mt-10" appearance="fill">
      <mat-label>Valor a emitir</mat-label>
      <input matInput #input />
    </mat-form-field>
    <br />
    <button mat-raised-button (click)="replaySubject.next(input.value)">
      Emitir valor
    </button>
    <button mat-raised-button (click)="newSubscription()">
      Añadir Suscripción
    </button>
    <li *ngFor="let clip of clips">{{ clip }}</li>
    <!--<button mat-raised-button (click)="clear()">Borrar</button>-->
  `,
  styleUrls: [],
})
export class ReplaySubjectSubPageComponent implements OnInit, OnDestroy {
  breadcrumbs$: Observable<Breadcrumb[]>;
  clips$: Observable<string[]>;
  clips = [];
  replaySubject = new ReplaySubject(10);
  subs = new Subscription();

  constructor(
    public ds: ClipsService,
    private toastr: ToastrService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbs$ = breadcrumbService.crumbs$;

    this.subs.add(
      this.replaySubject.subscribe((data) =>
        this.openToast(data, "Valor", "toast-bottom-left")
      )
    );
  }
  ngOnInit(): void {
    this.clips = [];
    this.subs.add(this.ds.clips$.subscribe((data) => this.clips.push(data)));
  }

  newSubscription() {
    this.subs.add(
      this.replaySubject.subscribe((data) =>
        this.openToastWarn(data, "Nueva Subscripción", "toast-bottom-left")
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
  clear() {
    this.replaySubject?.unsubscribe();
    this.replaySubject?.next("");
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
