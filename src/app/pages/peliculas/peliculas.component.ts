import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PeliculasService, Pelicula } from '../../services/peliculas.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '../../services/translate.service';


@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  currentYear = new Date().getFullYear();

  peliculas: Pelicula[] = [];
  sub: Subscription | undefined;
  lang = 'es';
  labels: Record<string, Record<string, string>> = {
    title: { es: 'Películas', en: 'Movies' },
    placeholder_titulo: { es: 'Título', en: 'Title' },
    placeholder_genero: { es: 'Género', en: 'Genre' },
    placeholder_anio: { es: 'Año', en: 'Year' },
    placeholder_duracion: { es: 'Duración', en: 'Duration' },
    button_save: { es: 'Guardar', en: 'Save' },
    button_clear: { es: 'Limpiar', en: 'Clear' },
    button_edit: { es: 'Editar', en: 'Edit' },
    button_delete: { es: 'Borrar', en: 'Delete' },
    table_title: { es: 'Título', en: 'Title' },
    table_genero: { es: 'Género', en: 'Genre' },
    table_anio: { es: 'Año', en: 'Year' },
    table_duracion: { es: 'Duración', en: 'Duration' },
    table_actions: { es: 'Acciones', en: 'Actions' }
  };

  constructor(private fb: FormBuilder, private svc: PeliculasService, private translate: TranslateService) {
    this.lang = this.translate.currentLang || 'es';
    this.translate.language$.subscribe((l) => (this.lang = l));
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      titulo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      anio: [this.currentYear, [Validators.required, Validators.min(1900)]],
      duracion: ['', [Validators.required]]
    });

    this.sub = this.svc.getAll().subscribe((d) => (this.peliculas = d));
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  async save() {
    if (this.form.invalid) return;
    const val = this.form.value as Pelicula;
    if (val.id) {
      await this.svc.update(val.id, { titulo: val.titulo, genero: val.genero, anio: val.anio, duracion: val.duracion });
    } else {
      await this.svc.add({ titulo: val.titulo, genero: val.genero, anio: val.anio, duracion: val.duracion });
    }
    this.resetForm();
  }

  edit(p: Pelicula) {
    this.form.setValue({ id: p.id || '', titulo: p.titulo, genero: p.genero, anio: p.anio, duracion: p.duracion });
  }

  async remove(id?: string) {
    if (!id) return;
    const msg = this.translate.translate('peliculas.confirm.delete');
    if (!confirm(msg)) return;
    await this.svc.delete(id);
  }

  resetForm() {
    this.form.reset({ anio: this.currentYear });
  }
}
