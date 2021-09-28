import { Component, OnDestroy, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  fromEvent,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
  zip,
} from "rxjs";
import { Breadcrumb } from "../models/app.models";
import { BreadcrumbService } from "../services/bread-crumb.service";
import { ClipsService } from "../services/injectable-subject.service";
@Component({
  selector: "app-subjects",
  template: `
    <app-breadcrumb [breadcrumbs]="breadcrumbs$ | async"> </app-breadcrumb>
    <h1 class="mt-10">Subjects</h1>
  `,
  styles: [],
})
export class SubjectsComponent implements OnInit, OnDestroy {
  constructor(
    private toastr: ToastrService,
    private ds: ClipsService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbs$ = breadcrumbService.crumbs$;
  }
  subs = new Subscription();

  breadcrumbs$: Observable<Breadcrumb[]>;

  clickObservable$ = fromEvent(document, "click");

  mathRandomSubject$ = new Subject();

  mathRandomObservable$;

  ngOnInit(): void {
    this.subs.add(
      this.eventClipboard$.subscribe((clipboard) => {
        navigator.clipboard.readText().then((clip) => {
          this.emitTextClipBoard(clip);
        });
      })
    );
    this.clickObservable$.subscribe(() => {
      this.mathRandomSubject$.next(Math.random());
    });
    this.mathRandomObservable$ = new Observable((observer) => {
      this.clickObservable$.subscribe(() => observer.next(Math.random()));
    });

    this.subs.add(
      this.mathRandomSubject$.subscribe((data) => {
        this.openToast(data, "1-Subscription Subject", "toast-bottom-left");
      })
    );
    this.subs.add(
      this.mathRandomSubject$.subscribe((data) =>
        this.openToast(data, "2-Subscription Subject", "toast-bottom-center")
      )
    );
    this.subs.add(
      this.mathRandomObservable$.subscribe((data) => {
        this.openToastWarn(
          data,
          "1-Subscription Observable",
          "toast-bottom-left"
        );
      })
    );
    this.subs.add(
      this.mathRandomObservable$.subscribe((data) =>
        this.openToastWarn(
          data,
          "2-Subscription Observable",
          "toast-bottom-center"
        )
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

  textClipBoards$ = new ReplaySubject(10);

  zipClips$ = zip(this.textClipBoards$);
  eventClipboard$ = fromEvent(document, "copy");
  emitTextClipBoard(clip) {
    // this.ds.sendData(clip);
    //  this.textClipBoards$.next(clip);
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
