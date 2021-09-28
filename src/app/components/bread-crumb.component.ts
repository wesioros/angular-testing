import { Component, Input } from "@angular/core";
import { Breadcrumb } from "../models/app.models";

@Component({
  selector: "app-breadcrumb",
  template: `
    <ul class="breadcrumb">
      <li *ngFor="let breadcrumb of breadcrumbs">
        <span
          [routerLink]="['/' + breadcrumb.url]"
          routerLinkActive="router-link-active"
        >
          {{ breadcrumb.label }}
        </span>
      </li>
    </ul>
  `,
  styles: [
    `
      ul.breadcrumb {
        padding: 10px 16px;
        list-style: none;
        background-color: #eee;
      }
      ul.breadcrumb li {
        display: inline;
        font-size: 18px;
        cursor: pointer;
        hover {
          text-decoration: underline;
        }
      }
      ul.breadcrumb li + li:before {
        padding: 8px;
        color: black;
        content: ">";
      }
      ul.breadcrumb li a {
        color: #0275d8;
        text-decoration: none;
      }
    `,
  ],
})
export class BreadCrumbComponent {
  @Input() breadcrumbs: Breadcrumb[];
}
