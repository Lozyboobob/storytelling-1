import {trigger, state, animate, style, transition} from '@angular/animations';

export function slideTransition() {
  return slideSwitch();
}


function slideSwitch() {
  return trigger('routerTransition', [
    state('void', style({position:'fixed', width:'100%'}) ),
    state('*', style({position:'fixed', width:'100%'}) ),

    transition('* => 1', [
      style({transform: 'translateX(100%)'}),
      animate('1.0s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition('* => -1', [
      style({transform: 'translateX(-100%)'}),
      animate('1.0s ease-in-out', style({transform: 'translateX(0%)'}))
    ])
  ]);
}

