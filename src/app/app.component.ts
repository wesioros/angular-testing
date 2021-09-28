import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Rx from "rxjs";
import { ClipsService } from "./services/injectable-subject.service";
@Component({
  selector: "app-root",
  template: `
    <div class="toolbar" role="banner">
      <img
        width="40"
        alt="Angular Logo"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
      />
      <span>Angular testing</span>
    </div>

    <router-outlet></router-outlet>
  `,
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "angular-testing";
  eventClipboard$ = Rx.fromEvent(document, "copy");
  constructor(public ds: ClipsService, private router: Router) {}

  ngOnInit(): void {
    this.eventClipboard$.subscribe((clipboard) => {
      navigator.clipboard.readText().then((clip) => {
        this.ds.sendData(clip);
      });
    });

    //   this.ds.onClipBoardSave().pipe(Rx.finalize(() => console.log("complete")));
    //    this.ds.onClipBoardSave().subscribe((data) => console.log(data));
  }
}
