
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { IUserPage } from 'src/app/model/model.interfaces';
import { IReplyPage } from 'src/app/model/model.interfaces';
import { IReply } from './../../../model/model.interfaces';

@Component({
  selector: 'app-admin-reply-plist-unrouted',
  templateUrl: './admin-reply-plist-unrouted.component.html',
  styleUrls: ['./admin-reply-plist-unrouted.component.css']
})
export class AdminReplyPlistUnroutedComponent implements OnInit {

  oPage: any = [];
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  showConfirmation: boolean = false;
  IReply: any;

  constructor(
    private oHttpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oHttpClient.get<IUserPage>("http://localhost:8083/reply" + "?size=" + this.oPaginatorState.rows + "&page=" + this.oPaginatorState.page + "&sort=" + this.orderField + "," + this.orderDirection).subscribe({
      next: (data: IUserPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.oPage.error = error;
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  
  confirmDelete(IReply: string) {
    this.showConfirmation = true;
    this.IReply = IReply;
}

deleteReply(IReply: string) {
    this.oHttpClient.delete("http://localhost:8083/reply/" + IReply).subscribe({
        next: () => {
            console.log("Reply eliminado con éxito.");
            this.getPage();
            this.showConfirmation = false;
        },
        error: (error: any) => {
            console.error("Se produjo un error al eliminar el thread.", error);
            this.showConfirmation = false;
        }
    });
}

cancelDelete() {
    console.log("Eliminación cancelada por el usuario.");
    this.showConfirmation = false;
}

}
