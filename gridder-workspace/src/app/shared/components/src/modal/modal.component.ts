import { Component, ChangeDetectionStrategy, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { GameWinner } from '@models';

@Component({
  selector: 'gridder-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ModalComponent {
  @Input() playerScore!: number;
  @Input() computerScore!: number;
  @Input() winner!: GameWinner;

  @Output() ondismiss = new EventEmitter<void>();
  @Output() onrestart = new EventEmitter<void>();

  @HostListener('window:keydown.escape', [])
  dismiss(): void {
    this.ondismiss.emit();
  }

  preventPropagation(e: Event): void {
    e.stopPropagation();
    e.preventDefault();
  }

  restart(): void {
    this.onrestart.emit();
  }
}
