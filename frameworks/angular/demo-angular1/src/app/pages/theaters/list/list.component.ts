import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  theaters: Theater[] = []
  constructor(private theatersService: TheaterService, private router: Router) { }

  ngOnInit(): void {
    this.list()
  }

  list(){
    this.theatersService.list().subscribe({
      next: (theaters) => {
        this.theaters = theaters;
      }
    });
  }
  create(){
    this.router.navigate(['theaters/create'])
  }
  edit(id: number){
    console.log(`I'm in edit`)
    this.router.navigate([`theaters/update/${id}`])
  }
  view(id:number){
    this.router.navigate([`theaters/view/${id}`])
  }
  delete(id: number){
    console.log("Delete theater with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "Está seguro que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.theatersService.delete(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'Registro eliminado correctamente.',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }
}
