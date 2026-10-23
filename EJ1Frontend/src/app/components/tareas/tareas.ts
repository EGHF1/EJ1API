import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Tarea } from '../../models/tarea';
import { TareasService } from '../../services/tareas.service';
import { UiModalComponent } from '../ui-modal/ui-modal';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, DatePipe, ReactiveFormsModule, UiModalComponent],
  templateUrl: './tareas.html',
  styleUrl: './tareas.scss',
})
export class TareasComponent implements OnInit {
  private readonly tareasService = inject(TareasService);
  private readonly fb = inject(FormBuilder);

  // ── Estado ──────────────────────────────────────────────
  tareas = signal<Tarea[]>([]);
  cargando = signal(false);
  error = signal('');
  modalAbierto = signal(false);
  guardando = signal(false);
  notificacion = signal<{ tipo: 'exito' | 'error'; mensaje: string } | null>(null);

  // Categorías de ejemplo (podrían venir de otro endpoint)
  readonly categorias = [
    { id: 1, nombre: 'TraInstalación de Fibra Óptica Residencialbajo' },
    { id: 2, nombre: 'Atención de Avería Técnica Crítica' },
    { id: 3, nombre: 'EstudioMantenimiento Preventivo de Nodo' },
  ];

  // ── Formulario ───────────────────────────────────────────
  form: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: [''],
    fechaInicio: ['', Validators.required],
    fechaFin: [''],
    categoriaId: [null, Validators.required],
  });

  // Helpers para validación en el template
  hasError(campo: string, error: string): boolean {
    const ctrl = this.form.get(campo);
    return !!(ctrl?.invalid && ctrl?.touched && ctrl?.hasError(error));
  }

  // ── Ciclo de vida ────────────────────────────────────────
  ngOnInit(): void {
    this.cargarTareas();
  }

  // ── Carga del listado ────────────────────────────────────
  cargarTareas(): void {
    this.cargando.set(true);
    this.error.set('');

    this.tareasService.listar().subscribe({
      next: (tareas) => {
        this.tareas.set(tareas);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las tareas.');
        this.cargando.set(false);
      },
    });
  }

  // ── Modal ────────────────────────────────────────────────
  abrirModal(): void {
    this.form.reset();
    this.modalAbierto.set(true);
  }

  cerrarModal(): void {
    this.modalAbierto.set(false);
  }

  // ── Guardar tarea ────────────────────────────────────────
  guardarTarea(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    const payload: Tarea = {
      ...this.form.value,
      categoriaId: Number(this.form.value.categoriaId),
      fechaFin: this.form.value.fechaFin || null,
      descripcion: this.form.value.descripcion || null,
    };

    this.tareasService.crear(payload).subscribe({
      next: (nueva) => {
        // Agregar al listado sin recargar
        // this.tareas.update((lista) => [nueva, ...lista]);
        this.guardando.set(false);
        this.cerrarModal();
        this.mostrarNotificacion('exito', '¡Tarea creada exitosamente!');
        this.cargarTareas();
      },
      error: () => {
        this.guardando.set(false);
        this.mostrarNotificacion('error', 'Error al guardar la tarea. Intenta nuevamente.');
      },
    });
  }

  // ── Notificación toast ───────────────────────────────────
  private mostrarNotificacion(tipo: 'exito' | 'error', mensaje: string): void {
    this.notificacion.set({ tipo, mensaje });
    setTimeout(() => this.notificacion.set(null), 4000);
  }

  // ── Helper: nombre de categoría ──────────────────────────
  getNombreCategoria(id: number): string {
    return this.categorias.find((c) => c.id === id)?.nombre ?? `Cat. ${id}`;
  }
}