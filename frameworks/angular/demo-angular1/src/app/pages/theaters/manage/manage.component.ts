import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode:number // 1: View 2: Create 3: Update
  theater:Theater
  theFormGroup: FormGroup; // Policía de formulario
  trySend:boolean

  constructor(
    private activatedRoute: ActivatedRoute,
    private theatersService:TheaterService,
    private router:Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false
    this.theater = {id: 0}
    this.configFormGroup()
  }

  ngOnInit(): void {
    const currentUrl = this.activatedRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activatedRoute.snapshot.params.id) {
      this.theater.id = this.activatedRoute.snapshot.params.id
      this.getTheater(this.theater.id)
    }

  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      id: [0, []], // Se valdia en el backend
      capacity: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      location: ['', [Validators.required, Validators.minLength(2)]]
    })
  }
  
  
  get getTheFormGroup() {
    return this.theFormGroup.controls
  }

  getTheater(id:number){
    // Get data theater by id from backend.
    this.theatersService.view(id).subscribe({
      next: (response) => {
        this.theater = response;
        console.log(response)
        this.theFormGroup.patchValue({
          id: this.theater.id, // Traído del backend
          capacity: this.theater.capacity,
          location: this.theater.location
        });
      },
      error: (error) => {
        console.error('Error fetching theater:', error);
      }
    });
  }

  back(){
    this.router.navigate(['theaters/list'])
  }
  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'error',
      })
      return;
    }
    this.theatersService.create(this.theFormGroup.value).subscribe({
      next: (theater) => {
        console.log('Theater created successfully:', theater);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        })
        this.router.navigate(['/theaters/list']);
      },
      error: (error) => {
        console.error('Error creating theater:', error);
      }
    });
  }
  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'error',
      })
      return;
    }
    this.theatersService.update(this.theFormGroup.value).subscribe({
      next: (theater) => {
        console.log('Theater updated successfully:', theater);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        })
        this.router.navigate(['/theaters/list']);
      },
      error: (error) => {
        console.error('Error updating theater:', error);
      }
    });
  }

}
