import {
  Component,
  input,
  output,
  ElementRef,
  viewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="modal-backdrop"
      [class.open]="open()"
      (click)="onBackdropClick($event)"
      #backdrop
    >
      <div class="modal-container" role="dialog" [attr.aria-label]="title()">
        <div class="modal-header">
          <h2 class="modal-title">{{ title() }}</h2>
          <button class="modal-close" (click)="closed.emit()" aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
      padding: 1rem;
    }
    .modal-backdrop.open {
      opacity: 1;
      pointer-events: all;
    }
    .modal-backdrop.open .modal-container {
      transform: translateY(0) scale(1);
    }
    .modal-container {
      background: #1a1d2e;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      width: 100%;
      max-width: 560px;
      max-height: 90vh;
      overflow-y: auto;
      transform: translateY(24px) scale(0.97);
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 1.75rem 1.25rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    }
    .modal-title {
      font-size: 1.15rem;
      font-weight: 600;
      color: #f0f2ff;
      margin: 0;
    }
    .modal-close {
      background: rgba(255,255,255,0.06);
      border: none;
      border-radius: 8px;
      color: #8b92b3;
      cursor: pointer;
      padding: 6px;
      display: flex;
      align-items: center;
      transition: background 0.15s, color 0.15s;
    }
    .modal-close:hover {
      background: rgba(255,255,255,0.12);
      color: #f0f2ff;
    }
    .modal-body {
      padding: 1.75rem;
    }
  `]
})
export class UiModalComponent {
  open = input(false);
  title = input('Modal');
  closed = output<void>();

  backdrop = viewChild<ElementRef>('backdrop');

  onBackdropClick(event: MouseEvent): void {
    if (event.target === this.backdrop()?.nativeElement) {
      this.closed.emit();
    }
  }
}
