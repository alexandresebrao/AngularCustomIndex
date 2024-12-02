import {Component, computed, inject, makeStateKey, REQUEST_CONTEXT, signal, TransferState} from '@angular/core';
import {Router} from 'express';

@Component({
  template: '<div>Profile {{userName()}}</div>'
})
export class ProfileComponent {
  user = signal<{username: string} | null>(null)
  requestContext = inject(REQUEST_CONTEXT, {optional: true}) as {user: {username: string}}
  userKey = makeStateKey<{username: string}>("userKey")
  transferState = inject(TransferState)
  userName = computed(() => this.user()?.username)

  constructor() {
    if (this.requestContext?.user) {
      this.transferState.set(this.userKey, this.requestContext.user)
    } else {
      this.user.set(this.transferState.get(this.userKey, null))
    }
  }
}
