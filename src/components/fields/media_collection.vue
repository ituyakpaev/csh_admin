<template>
    <panelbox title="Медиа" :button="false" button_text="Добавить по URL" >
        <div class="media-collection " ref="droparea">
            <div class="media-collection__inner" >
                <mediafile class="media-collection__first-upload" v-if="value.value.length === 0" :value="{ value: null, preview: null }"
                           @input="addMedia" :multiple="true"/>
                <div class="media-collection__file" v-for="(file, index) in value.value" :key="(file.preview || file.id) + index">
                    <mediafile :value="{ value: file.url || 'NULL', preview: file.preview || null }" :disabled="true"
                               @delete="deleteMedia(file,index)"/>
                </div>
                <div class="media-collection__file" >
                    <mediafile class="" v-if="value.value.length > 0" :multiple="true" :value="{ value: null, preview: null }"
                               @input="addMedia"/>
                </div>
                <div class="media-collection__drop" ref="droparea_inner" v-show="droparea.show" >
                    Дропните сюды {{ droparea.show }}
                </div>
            </div>
        </div>
        <modal :show="modal.show" @close="modal.show = false">
            <input-box label="URL файла" v-model="model.url.value" />
            <input-box label="Описание файла" v-model="model.title.value" />
            <button class="button" >
                Добавить
            </button>
        </modal>
    </panelbox>
</template>

<script>
    import panelbox from "../regular/panelbox";
    import mediafile from "./mediafile";

    export default {
        name: "media",
        components: {panelbox, mediafile},
        props: {
            value: {
                required: true,
                validator: function ( value ) {
                    return value.delete && value.value
                }
            }
        },
        data() {
            return {
                droparea: {
                    show: false
                },
                model: {
                    url: {
                        value: '',
                        error: null
                    },
                    type: {
                        value: ''
                    },
                    sub_type: {
                        value: ''
                    },
                    title: {
                        value: ''
                    }
                },
                modal: {
                    show: false
                }
            }
        },
        computed: {
            valueSetter: {
                get() {
                    return this.value
                },
                set(data) {
                    this.$emit('input', data)
                }
            },
        },
        methods: {
            deleteMedia(media,index) {
                if (!media.value) {
                  let bufer = this.valueSetter
                  bufer.value.splice(index, 1)
                  if (media.id) {
                    bufer.delete.push(media.id)
                  }
                  this.valueSetter = bufer
                }
            },
            addMedia(data = null) {
                console.log(data)
                let add
                if (data) {
                    console.log(data)
                    add = {
                        url: null,
                        type: data.value.type.split('/')[0],
                        sub_type: data.value.type.split('/')[1],
                        file: data.value,
                        preview: data.preview,
                        title: ''
                    }
                } else {
                    let result = {}
                    Object.keys( this.model ).map(key => {
                        result[key] = this.model[key].value
                    })
                    add = result
                }

                let newValue = this.valueSetter
                newValue.value.push(add)

                this.valueSetter = newValue
            }
        },
        mounted() {
            /*
            let dropArea = this.$refs.droparea
            let highlight = () => {
                this.droparea.show = true
            }
            let unhighlight = () => {
                this.droparea.show = false
            }
            console.log(dropArea)
            ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false)
            })
            function preventDefaults (e) {
                e.preventDefault()
                e.stopPropagation()
            }
            void (['dragenter', 'dragover']).forEach(eventName => {
                dropArea.addEventListener(eventName, highlight, false)
            })
            ;(['dragleave', 'drop']).forEach(eventName => {
                dropArea.addEventListener(eventName, unhighlight, false)
            })*/
        }
    }
</script>

<style lang="scss">
    .media-collection {
        position: relative;

        &__drop {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;

            bottom: 0;
        }

        &__first-upload {
            grid-column: 1/span 5;
            grid-row: 1/span 2;
        }

        &__inner {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: 5px;
        }

        &__file {

            &:first-child {
                grid-column: 1/span 2;
                grid-row: 1/span 2;
            }

            .media-file {
                &:after {
                    content: '';
                    width: 100%;
                    padding-bottom: 100%;
                    height: 0;
                }

                &__inner, &__image {
                    max-height: unset;
                    position: absolute;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    top: 0;
                }
            }
        }
    }

    .small {
        &-enter-active, &-leave-active {
            transition: all .1s;
            will-change: transform;
        }

        &-enter, &-leave-to /* .fade-leave-active до версии 2.1.8 */
        {
            opacity: 0;
            transform: scale(0.4);
        }
    }
</style>
