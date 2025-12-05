import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CinesService, Cine } from '../../services/cines.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-cines',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cines.component.html',
  styleUrls: ['./cines.component.css']
})
export class CinesComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  cines: Cine[] = [];
  sub: Subscription | undefined;
  lang = 'es';
  labels: Record<string, Record<string, string>> = {
    title: { es: 'Cines', en: 'Cinemas' },
    placeholder_nombre: { es: 'Nombre', en: 'Name' },
    placeholder_ciudad: { es: 'Ciudad', en: 'City' },
    placeholder_capacidad: { es: 'Capacidad', en: 'Capacity' },
    button_save: { es: 'Guardar', en: 'Save' },
    button_clear: { es: 'Limpiar', en: 'Clear' },
    button_edit: { es: 'Editar', en: 'Edit' },
    button_delete: { es: 'Borrar', en: 'Delete' },
    table_nombre: { es: 'Nombre', en: 'Name' },
    table_ciudad: { es: 'Ciudad', en: 'City' },
    table_capacidad: { es: 'Capacidad', en: 'Capacity' },
    table_actions: { es: 'Acciones', en: 'Actions' }
  };

  constructor(private fb: FormBuilder, private svc: CinesService, private translate: TranslateService) {
    this.lang = this.translate.currentLang || 'es';
    this.translate.language$.subscribe((l) => (this.lang = l));
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      capacidad: [0, [Validators.required, Validators.min(1)]]
    });

    this.sub = this.svc.getAll().subscribe((d) => (this.cines = d));
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }

  async save() {
    if (this.form.invalid) return;
    const val = this.form.value as Cine;
    if (val.id) {
      await this.svc.update(val.id, { nombre: val.nombre, ciudad: val.ciudad, capacidad: val.capacidad });
    } else {
      await this.svc.add({ nombre: val.nombre, ciudad: val.ciudad, capacidad: val.capacidad });
    }
    this.form.reset({ capacidad: 0 });
  }

  edit(c: Cine) { this.form.setValue({ id: c.id || '', nombre: c.nombre, ciudad: c.ciudad, capacidad: c.capacidad }); }

  async remove(id?: string) {
    if (!id) return;
    const msg = this.translate.translate('cines.confirm.delete');
    if (!confirm(msg)) return;
    await this.svc.delete(id);
  }
}
