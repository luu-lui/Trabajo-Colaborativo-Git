import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reserva as ReservaModel } from '../../models/reserva.interface';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css',
})
export class ReservaComponent implements OnInit {
  reservaForm!: FormGroup;
  submitted = false;
  successMessage = '';
  minDate: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.reservaForm = this.fb.group({
      nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
      emailCliente: ['', [Validators.required, Validators.email]],
      telefonoCliente: ['', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]],
      cantidadPersonas: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      observaciones: ['']
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.reservaForm.valid) {
      const reservaData: ReservaModel = this.reservaForm.value;
      console.log('Reserva recibida:', reservaData);
      
      this.successMessage = '¡Gracias! Tu reserva ha sido registrada con éxito. Te esperamos.';
      this.reservaForm.reset({
        cantidadPersonas: 1,
        fecha: '',
        hora: ''
      });
      this.submitted = false;
      
      setTimeout(() => {
        this.successMessage = '';
      }, 5000);
    }
  }
}
