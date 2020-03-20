export default {
  init: (x,y) => {
    // 获取body
    let el = document.body
    // 创建动画元素父级
    let aniParent = document.createElement('div')
    aniParent.classList.add
    aniParent.style.position = 'fixed'
    aniParent.style.left = '0'
    aniParent.style.top = '0'
    aniParent.style.width = '.48rem'
    aniParent.style.height = '.48rem'
    aniParent.style.backgroundColor = 'red'
    aniParent.style.zIndex= '999999999'
    el.appendChild(aniParent)


    console.log(el)
  }
}