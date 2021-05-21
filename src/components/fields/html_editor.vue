<template>
    <div class="editor">
        <div class="editor__header">
            {{ label }}
        </div>
        <!--<ckeditor :editor="editor" v-model="valueMirror" :config="config" />-->
        <froala v-model="valueMirror" :config="config" />
    </div>
</template>

<script>
    //import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import imageUploader from "../../middleware/api/v1/requests/imageUploader";
    //import VueFroala from 'vue-froala-wysiwyg';

    export default {
        name: "Editor",
        props: {
            label: {
                type: String,
                default: ''
            },
            value: {
                required: true
            }
        },
        components: {
            //ckeditor: CKEditor.component
        },
        data () {
            return {
                editor: ClassicEditor,
                config_old: {
                    allowedContent: true,
                    extraPlugins: [ this.uploader ],
                    language: 'ru',
                },
                config: {
                    toolbarButtons: [ '|', 'fontSize', '|', 'paragraphFormat', '|', 'bold', 'italic', 'underline', 'undo', 'redo', 'codeView', 'insertVideo'],
                    fontFamilySelection: true,
                    fontSizeSelection: true,
                    paragraphFormat: {
                        h1: 'Заголовок H1',
                        h2: 'Заголовок H2',
                        h3: 'Заголовок H3',
                        h4: 'Заголовок H4',
                        p: 'Текст'
                    },
                    imageUploadURL: 'https://sys.malikov.space/api/v1/uploader/upload_picture_link',// 'https://webhook.site/67897f5a-4cec-4e0f-9d0b-b97c5093f95e',
                    imageUploadMethod: 'post',
                    requestWithCORS: false,
                    paragraphFormatSelection: true,
                    language: "ru"
                }
            }
        },
        computed: {
            valueMirror: {
                get: function() {
                    return this.value
                },
                set: function(val) {
                    this.$emit('input', val)
                    return val
                }
            }
        },
        methods: {
            uploader(editor) {
                const UploadAdapter = class UploadAdapter {
                    constructor( loader ) {
                        // The file loader instance to use during the upload.
                        this.loader = loader;
                    }

                    // Starts the upload process.
                    upload() {
                        // Update the loader's progress.

                        // Return a promise that will be resolved when the file is uploaded.

                        //return this.loader.file
                        /*return new Promise(resolve => resolve({
                            default: {
                                srcset: 'https://amitcms.website.yandexcloud.net/main/a4b963fe-e1f8-48b6-ba38-43962eacd148.jpg'
                            }
                        }))*/
                        return new Promise((resolve,reject) => {
                            let img = null
                            this.loader.file
                                .then( file => img = file)
                                .then(() => {
                                    imageUploader.uploadImage(img)
                                        .then(res => {
                                            console.log(res)
                                            resolve({
                                                default: res
                                            })
                                        })
                                        .catch(err => {
                                            alert(err.toString())
                                            reject(false)
                                        })
                                })
                        })
                    }

                    // Aborts the upload process.
                    abort() {
                        // Reject the promise returned from the upload() method.
                        console.log('aborted')
                    }
                }
                editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                    return new UploadAdapter( loader );
                };
            },
        }
    }
</script>

<style lang="scss">
    .editor {
        margin-top: 20px;

        &__header {
            text-align: left;
            margin-bottom: 2px;
        }
        .ck.ck-editor__main .ck-content {
            min-height: 200px;
        }
    }

</style>
