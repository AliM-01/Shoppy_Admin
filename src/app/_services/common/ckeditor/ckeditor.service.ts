import { Injectable } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Injectable({
  providedIn: 'root'
})
export class CkeditorService {

  private ckeditorInternal;

  constructor() { }

  initCkeditor(ckeditor:any) {
    ClassicEditor
      .create(document.querySelector('#editor'), {
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          '|',
          'fontSize',
          'fontColor',
          '|',
          'imageUpload',
          'blockQuote',
          'undo',
          'redo',
        ],
        language: { ui: 'ar', content: 'ar' },
        heading: {
          options: [
            { model: 'paragraph', title: 'پاراگراف' },
            { model: 'heading1', view: 'h1', title: 'عنوان 1' },
            { model: 'heading2', view: 'h2', title: 'عنوان 2' },
            { model: 'heading3', view: 'h3', title: 'عنوان 3' },
          ]
        }
      })
      .then(editor => {
        ckeditor = editor;
        this.ckeditorInternal = editor;
      })
      .catch(err => {
        console.error(err.stack);
      });
  }

  getValue(): string{
    return this.ckeditorInternal.getData().toString();
  }

  setValue(value: string): void{
    this.ckeditorInternal.setData(value);
  }
}