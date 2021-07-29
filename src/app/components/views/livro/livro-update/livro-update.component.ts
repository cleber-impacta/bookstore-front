import { Router, ActivatedRoute } from '@angular/router';
import { LivroService } from './../livro.service';
import { FormControl, Validators } from '@angular/forms';
import { Livro } from './../livro.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {
  id_cat: String = '';

  livro: Livro = {
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  titulo = new FormControl('', [Validators.required, Validators.minLength(3)]);
  nome_autor = new FormControl('', [Validators.required, Validators.minLength(3)]);
  texto = new FormControl('', [Validators.required, Validators.minLength(10)]);

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

  update():void {
    this.service.update(this.livro).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Livro atualizada com sucesso!");
    }, err => {
      this.service.mensagem('Falha ao atualizar livro! Tente mais tarde.');
      console.log(err);
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessageTitulo(){
    if(this.titulo.invalid){
      return 'O campo Titulo deve conter entre 3 e 100 caracteres';
    }
    return false;
  }
  
  getMessageAutor(){
    if(this.nome_autor.invalid){
      return 'O campo Nome do Autor deve conter entre 3 e 100 caracteres';
    }
    return false;
  }

  getMessageTexto(){
    if(this.texto.invalid){
      return 'O campo Texto deve conter entre 10 e 2000000 caracteres';
    }
    return false;
  }
}
