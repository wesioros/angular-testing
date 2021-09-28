import { Injectable, OnDestroy, OnInit } from "@angular/core";
import * as Rx from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ClipsService implements OnInit, OnDestroy {
  eventClipboard$ = Rx.fromEvent(document, "copy");
  clip_subs = new Rx.Subscription();
  private clips: Rx.Subject<string>;
  clips$: Rx.Observable<string>;
  constructor() {
    this.clips = new Rx.ReplaySubject<string>(10);
    this.clips$ = this.clips.asObservable();
  }
  ngOnInit(): void {
    this.clip_subs = this.eventClipboard$.subscribe((clipboard) => {
      navigator.clipboard.readText().then((clip) => {
        console.log(clip);
        this.sendData(clip);
      });
    });
  }

  sendData(clip: string) {
    if (clip) {
      this.clips.next(clip);
    }
  }

  onClipBoardSave(): Rx.Observable<any> {
    return this.clips.asObservable();
  }

  ngOnDestroy(): void {
    this.clip_subs.unsubscribe();
  }
}
