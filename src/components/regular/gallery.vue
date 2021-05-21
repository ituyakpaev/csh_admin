<template>
    <div v-show="opened" class="gallery">
        <div class="gallery__header">
            <div class="gallery__header-title">
                Галлерея картинок <br>
                1 из {{ gallery.length }}
            </div>
            <div class="gallery__header-close" />
        </div>
        <div class="gallery-body">
            <div class="gallery-body__gallery">
                <div class="gallery__swiper">
                    <swiper class="" ref="gallery">
                        <swiper-slide v-for="picture in gallery" :key="picture.src" class="gallery__slide">
                            <img :src="picture.src" class="gallery__slide-image">
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="gallery-body__navigation">
                    <swiper class="gallery-body__bullets" ref="bullets" :options="bullets_options">
                        <swiper-slide v-for="picture in gallery" :key="picture.src" class="gallery-body__bullets-item" style="width: 200px;">
                            <img :src="picture.src" class="gallery-body__bullets-img">
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="gallery-body__sidebar">
                <textarea-box label="Описание" style="color: white;" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "gallery",
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            gallery: {
                type: Array,
                default: () => [{ src: 'https://vsthemes.ru/uploads/posts/2018-08/1581997163_4k-ultra-hd-galaxy_vsthemes_ru-27.jpg', description: ''}]
            }
        },
        data() {
            return {
                gallery_options: {

                },
                bullets_options: {
                    slidesPerView: 8,
                    spaceBetween: 10,
                }
            }
        },
        computed: {
            gallery_swiper() {
                return this.$refs.gallery.$swiper
            },
            bullets_swiper() {
                return this.$refs.bullets.$swiper
            }
        }
    }
</script>

<style scoped lang="scss">
    .gallery {
        position: fixed;
        top: 0; right: 0;
        left: 0; bottom: 0;
        z-index: 120;
        background: rgba(0,0,0,.3);
        backdrop-filter: blur(5px);
        display: flex;
        flex-direction: column;
        align-items: center;

        &__header {
            background: rgb(27,27,27);
            padding: 0 25px;
            height: 54px;
            display: flex;
            box-sizing: border-box;
            flex-direction: row;
            justify-content: space-between;
            color: white;
            width: 100%;
            border-bottom: 1px solid black;
            flex-grow: 0;

            &-close {
                height: 54px;
                width: 54px;
                padding: 7px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                cursor: pointer;

                &:hover::after,
                &:hover::before {
                    background-color: #222c95;
                }

                &::after, &::before {
                    transition: background-color .1s;
                    content: '';
                    display: block;
                    background-color: #c4cdd5;
                    position: absolute;
                    margin: auto 0;
                    top: 25px;
                }

                &::after {
                    height: 2px;
                    width: 20px;
                    transform: rotate(45deg);
                }

                &::before {
                    height: 2px;
                    width: 20px;
                    transform: rotate(-45deg);
                }
            }
            &-title {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: left;
            }
        }

        &-body {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            flex-grow: 1;

            &__gallery {
                background: black;
                width: 70%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                flex-grow: 1;
                padding-bottom: 100px;
                position: relative;
            }

            &__navigation {
                flex-grow: 0;
                height: 100px;
                position: absolute;
                bottom: 0;
                background: rgb(27,27,27);
                width: 100%;
                display: flex;
                align-items: center;
            }

            &__bullets {
                height: 80px;
                width: 100%;
                box-sizing: border-box;
                padding: 0 25px;

                &-item {
                    transform: translateY(0);
                    transition: transform .2s ease-in-out;
                    will-change: transform;

                    &:hover {
                        transform: translateY(-20px);
                    }
                }
            }



            &__sidebar {
                width: 30%;
                background-color: rgba(0,0,0,.85);
                backdrop-filter: blur(5px);
                box-sizing: border-box;
                padding: 25px;
            }
        }

        &__swiper {
            width: 70%;
        }

        &__footer {
            height: 100px;
            position: absolute;
            bottom: 0;
            background: rgb(27,27,27);
            width: 100%;
        }
    }

</style>
