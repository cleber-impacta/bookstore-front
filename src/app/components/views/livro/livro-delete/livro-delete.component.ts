import { Router, ActivatedRoute } from '@angular/router';
import { LivroService } from './../livro.service';
import { Livro } from './../livro.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {
  id_cat: String = '';

  livro: Livro = {
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  constructor(private service: LivroService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findLivroById();
  }

  findLivroById(): void {
    this.service.findLivroById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta;
    })
  }

  excluir():void {
    this.service.excluir(this.livro.id!).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Livro excluído com sucesso!");
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Falha ao excluír livro! Tente mais tarde.');
      console.log(err);
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
