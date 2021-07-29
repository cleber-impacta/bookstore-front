import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from './../categoria.service';
import { Categoria } from './../categoria.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria = resposta;
    });
  }

  update():void {
    this.service.update(this.categoria.id!, this.categoria).subscribe((resposta) => {
      this.router.navigate(["categorias"]);
      this.service.mensagem("Categoria atualizada com sucesso!");
    }, err => {
      this.service.mensagem('Validar se todos os campos estão preenchidos corretamente!');
      console.log(err);
    });
  }

  cancel(){
    this.router.navigate(["categorias"]);
  }

}
