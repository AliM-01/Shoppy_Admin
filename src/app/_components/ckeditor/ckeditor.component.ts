import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-ckeditpr',
    templateUrl: './ckeditor.component.html'
})
export class CkeditorComponent implements OnInit {

    ckeditor;

    constructor() { }

    ngOnInit(): void {
        this.ckeditorInit();
    }

    ckeditorInit() {
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
            this.ckeditor = editor;
          })
          .catch(err => {
            console.error(err.stack);
          });
      }

}
