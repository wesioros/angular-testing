import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { Breadcrumb } from "../models/app.models";

@Injectable()
export class BreadcrumbService {
  private crumbs: Subject<Breadcrumb[]>;
  crumbs$: Observable<Breadcrumb[]>;

  constructor() {
    this.crumbs = new ReplaySubject<Breadcrumb[]>();
    this.crumbs$ = this.crumbs.asObservable();
  }

  setCrumbs(items: Breadcrumb[]) {
    this.crumbs.next(
      (items || []).map((item) => {
        return Object.assign({}, item, {
          routerLinkActiveOptions: { exact: true },
        });
      })
    );
  }
}
