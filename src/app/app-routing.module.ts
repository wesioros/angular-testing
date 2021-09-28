import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AsyncSubjectSubPageComponent } from "./containers/async-subject-subpage.component";
import { BehaviourSubjectSubPageComponent } from "./containers/behaviour-subject-sub-page.component";
import { LoginComponent } from "./containers/login.page.component";
import { ReplaySubjectSubPageComponent } from "./containers/replay-subject-sub-page.component";
import { SubjectsComponent } from "./containers/subjects.component";
import { BreadcrumbInitializedGuard } from "./guards/bread-crumb.init.guard";

export const routes: Routes = [
  {
    path: "login",

    component: LoginComponent,
  },
  {
    path: "subjects",
    canActivate: [BreadcrumbInitializedGuard],
    data: {
      crumbs: [
        {
          label: "login",
          url: "login",
        },
        {
          label: "subjects",
          url: "subjects",
        },
        {
          label: "+",
          url: "behaviorSubject",
        },
      ],
    },
    component: SubjectsComponent,
  },
  {
    path: "behaviorSubject",
    canActivate: [BreadcrumbInitializedGuard],
    data: {
      crumbs: [
        {
          label: "login",
          url: "login",
        },
        {
          label: "subjects",
          url: "subjects",
        },
        {
          label: "behaviorSubject",
          url: "behaviorSubject",
        },
        {
          label: "+",
          url: "replaySubject",
        },
      ],
    },
    component: BehaviourSubjectSubPageComponent,
  },
  {
    path: "replaySubject",
    canActivate: [BreadcrumbInitializedGuard],
    data: {
      crumbs: [
        {
          label: "login",
          url: "login",
        },
        {
          label: "subjects",
          url: "subjects",
        },
        {
          label: "behaviorSubject",
          url: "behaviorSubject",
        },
        {
          label: "replaySubject",
          url: "replaySubject",
        },
        {
          label: "+",
          url: "asyncSubject",
        },
      ],
    },
    component: ReplaySubjectSubPageComponent,
  },
  {
    path: "asyncSubject",
    canActivate: [BreadcrumbInitializedGuard],
    data: {
      crumbs: [
        {
          label: "login",
          url: "login",
        },
        {
          label: "subjects",
          url: "subjects",
        },
        {
          label: "behaviorSubject",
          url: "behaviorSubject",
        },
        {
          label: "replaySubject",
          url: "replaySubject",
        },
        {
          label: "asyncSubject",
          url: "asyncSubject",
        },
      ],
    },
    component: AsyncSubjectSubPageComponent,
  },

  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
