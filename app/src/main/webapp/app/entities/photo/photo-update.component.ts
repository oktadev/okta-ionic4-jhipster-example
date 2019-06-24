import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPhoto, Photo } from 'app/shared/model/photo.model';
import { PhotoService } from './photo.service';
import { IAlbum } from 'app/shared/model/album.model';
import { AlbumService } from 'app/entities/album';
import { ITag } from 'app/shared/model/tag.model';
import { TagService } from 'app/entities/tag';

@Component({
  selector: 'jhi-photo-update',
  templateUrl: './photo-update.component.html'
})
export class PhotoUpdateComponent implements OnInit {
  isSaving: boolean;

  albums: IAlbum[];

  tags: ITag[];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [],
    image: [null, [Validators.required]],
    imageContentType: [],
    taken: [],
    album: [],
    tags: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected photoService: PhotoService,
    protected albumService: AlbumService,
    protected tagService: TagService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ photo }) => {
      this.updateForm(photo);
    });
    this.albumService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAlbum[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAlbum[]>) => response.body)
      )
      .subscribe((res: IAlbum[]) => (this.albums = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tagService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITag[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITag[]>) => response.body)
      )
      .subscribe((res: ITag[]) => (this.tags = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(photo: IPhoto) {
    this.editForm.patchValue({
      id: photo.id,
      title: photo.title,
      description: photo.description,
      image: photo.image,
      imageContentType: photo.imageContentType,
      taken: photo.taken != null ? photo.taken.format(DATE_TIME_FORMAT) : null,
      album: photo.album,
      tags: photo.tags
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const photo = this.createFromForm();
    if (photo.id !== undefined) {
      this.subscribeToSaveResponse(this.photoService.update(photo));
    } else {
      this.subscribeToSaveResponse(this.photoService.create(photo));
    }
  }

  private createFromForm(): IPhoto {
    return {
      ...new Photo(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      description: this.editForm.get(['description']).value,
      imageContentType: this.editForm.get(['imageContentType']).value,
      image: this.editForm.get(['image']).value,
      taken: this.editForm.get(['taken']).value != null ? moment(this.editForm.get(['taken']).value, DATE_TIME_FORMAT) : undefined,
      album: this.editForm.get(['album']).value,
      tags: this.editForm.get(['tags']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhoto>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackAlbumById(index: number, item: IAlbum) {
    return item.id;
  }

  trackTagById(index: number, item: ITag) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
