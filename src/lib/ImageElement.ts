export default abstract class ImageElement extends HTMLImageElement{
    newSrc: string
    __scrollListener__: Function
    __scrollEndListener__: Function
}