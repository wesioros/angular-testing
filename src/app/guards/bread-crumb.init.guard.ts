import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";
import { BreadcrumbService } from "../services/bread-crumb.service";

@Injectable()
export class BreadcrumbInitializedGuard implements CanActivate {
  constructor(private service: BreadcrumbService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const crumbs = route.data["crumbs"];
    this.service.setCrumbs(crumbs);
    return true;
  }
}
