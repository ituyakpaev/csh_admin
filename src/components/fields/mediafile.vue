<template>
    <div class="media-file" :class="{'not-uploaded': !value.value && !value.preview}">
        <input type="file" :disabled="disabled" :multiple="multiple" @change="upload" class="media-file__input" :accept="$settings.media.accepted_img.join(',')">
        <div class="media-file__inner" v-if="!value.value && !value.preview">
            <div class="media-file__img">
                <button @click="console.log('aa')">url</button>
            </div>
            <div class="media-file__title">
                Загрузить
            </div>
        </div>
        <div class="media-file__inner" v-else>
            <img :src="value.preview || value.value || img" class="media-file__image-absolute">
            <img :src="value.preview || value.value || img" class="media-file__image">
            <div class="media-file__image-redact">
                <div @click="$emit('delete')">
                    <icon name="delete"/>
                </div>
                <div @click="$emit('open')">
                    <icon name="expand"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mediafile.vue",
        props: {
            img: String,
            value: {
                type: Object
            },
            disabled: {
              type: Boolean,
              default: false
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            upload(e) {
                e.preventDefault();
                let files = e.target.files
                console.log(files)
                for (let file of files) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (res) => {
                        console.log('onload')
                        this.$emit('input', { value: file, preview: res.target.result })
                        this.$emit('upload', { value: file, preview: res.target.result })
                        e.target.value = ''
                    }
                }
            },
            deleteImage() {
                this.$emit('input', { value: null, preview: null })
            }
        }
    }
</script>

<style scoped lang="scss">
    .media-file.not-uploaded {
        border: 3px dashed rgb(219, 219, 219);
        transition: border-color .3s;

        &:hover {
            border-color: #3e49c1;
        }

        .media-file__inner {
            min-height: 120px;
        }
    }

    .media-file {
        border-radius: 5px;
        position: relative;
        cursor: pointer;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        box-sizing: border-box;
        overflow: hidden;
        height: auto;
        border: 1px solid $color-grey;

        &__input {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            cursor: pointer;
            width: 100%;
        }

        &__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
        }

        &__input {
            opacity: 0;
            z-index: 1;

            &:hover + .media-file__inner .media-file__image-redact {
                transform: translateY(0);
            }
        }

        &__inner {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            background-color: #f4f6f8;
        }

        &__image {
            cursor: pointer;
            object-fit: contain;
            border-radius: 5px;
            backdrop-filter: blur(5px);
            background-color: rgba(255,255,255,.1);
            max-height: 200px;

            &-absolute {
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
            }

            &-background {
                border-radius: 5px;
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
            }

            &-redact {
                background-color: white;
                border-radius: 3px;
                display: flex;
                align-content: center;
                position: absolute;
                top: 0;
                z-index: 2;
                right: 0;
                margin: 8px 8px 0 0;
                padding: 5px;
                transform: translateY(-50px);
                will-change: transform;
                transition: transform .2s;
                border: 1px solid $color-purple;

                &:hover {
                    transform: translateY(0);
                }

                div:not(:last-child) {
                    border-right: 1px solid $color-purple;
                    padding-right: 5px;
                }

                div:not(:first-child) {
                    padding-left: 5px;
                }
            }
        }
    }

</style>
