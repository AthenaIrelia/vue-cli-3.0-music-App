export function addClass(el, className) {
    if (hasClass(el, className)) {
      return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}
export function getDate(el,name,val){
     const prefix = 'data-'
     let sum=prefix+name
     if(val){
        return el.setAttribute(sum,val)
     }else{
       return el.getAttribute(sum)
     }
}