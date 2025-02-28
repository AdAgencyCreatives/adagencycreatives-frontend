export const PaginationStyle = `
      :host{
        --swiper-navigation-sides-offset: -5px;
        --swiper-navigation-color:black;
      }

      .swiper-button-prev,.swiper-button-next{
        padding: 0;
        text-align: center;
        width: 50px;
        height: 50px;
        background: none;
        -webkit-transition: all .5s ease-in-out 0s;
        -o-transition: all .5s ease-in-out 0s;
        transition: all .5s ease-in-out 0s;
        border: none;
        border-radius: 8px;
        -webkit-border-radius: 8px;
        opacity: 1;
        -moz-border-radius: 8px;
        -ms-border-radius: 8px;
        -o-border-radius: 8px;
      }
      .swiper-button-prev svg,.swiper-button-next svg{
        height: 20px;
        overflow: visible;
      }
      .swiper-button-prev svg path,.swiper-button-next svg path{
        stroke-width: 2px;
        stroke: #000;
      }

      .swiper-button-next:hover,.swiper-button-prev:hover {
        background:black;
        opacity:1;
        --swiper-navigation-color:white;
      }
      .swiper-button-next:hover svg path,.swiper-button-prev:hover svg path {
        stroke: white;
      }
`;

export const ResourcePaginationStyle = `
      :host{
        --swiper-navigation-sides-offset: -5px;
        --swiper-navigation-color:black;
      }

      .swiper-button-prev,.swiper-button-next{
        padding: 0;
        text-align: center;
        width: 50px;
        height: 50px;
        background: #d9d9d9;
        -webkit-transition: all .5s ease-in-out 0s;
        -o-transition: all .5s ease-in-out 0s;
        transition: all .5s ease-in-out 0s;
        border: none;
        border-radius: 8px;
        -webkit-border-radius: 8px;
        opacity: 1;
        -moz-border-radius: 8px;
        -ms-border-radius: 8px;
        -o-border-radius: 8px;
      }

      .swiper-button-prev svg,.swiper-button-next svg{
        // color: #fff;
        height: 20px;
      }

      .swiper-button-next:hover,.swiper-button-prev:hover {
        background:black;
        opacity:1;
        --swiper-navigation-color:white;
      }
`;

export const BulletStyle = `
:host{
    --swiper-pagination-bullet-border-radius: 8px;
    --swiper-pagination-bottom:-50px;
  }

  .swiper{
    overflow-y:visible;
  }

  .swiper-pagination{
    position:absolute;
    height:40px;
  }

  .swiper-pagination .swiper-pagination-bullet {
    background: #bfc8cb;
    opacity: 1;
    transition:width 0.5s ease;
  }

.swiper-pagination .swiper-pagination-bullet-active {
    background-color: #fff;
    width: 20px;
}`;
