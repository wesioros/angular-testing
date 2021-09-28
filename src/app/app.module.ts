import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ToastrModule } from "ngx-toastr";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppEffects } from "./app.effects";
import { AsyncSubjectComponent } from "./components/async-subject.component";
import { BehaviorSubjectComponent } from "./components/behavior-subject.component";
import { BreadCrumbComponent } from "./components/bread-crumb.component";
import { LoremComponentComponent } from "./components/lorem-component.component";
import { ReplaySubjectComponent } from "./components/replay-subject.component";
import { AsyncSubjectSubPageComponent } from "./containers/async-subject-subpage.component";
import { BehaviourSubjectSubPageComponent } from "./containers/behaviour-subject-sub-page.component";
import { LoginComponent } from "./containers/login.page.component";
import { ReplaySubjectSubPageComponent } from "./containers/replay-subject-sub-page.component";
import { SubjectsComponent } from "./containers/subjects.component";
import { BreadcrumbInitializedGuard } from "./guards/bread-crumb.init.guard";
import { metaReducers, reducers } from "./reducers";
import { BreadcrumbService } from "./services/bread-crumb.service";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubjectsComponent,
    ReplaySubjectComponent,
    BreadCrumbComponent,
    BehaviourSubjectSubPageComponent,
    ReplaySubjectSubPageComponent,
    LoremComponentComponent,
    BehaviorSubjectComponent,
    AsyncSubjectComponent,
    AsyncSubjectSubPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    ToastrModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    BrowserAnimationsModule,
  ],
  providers: [BreadcrumbService, BreadcrumbInitializedGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
