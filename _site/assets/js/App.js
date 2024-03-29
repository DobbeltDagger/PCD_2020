//////////////////////
function App() {
  // nothing here yet
}

/////////////////////////
App.prototype = {

  //////////////////
  init: function() {

    console.log("App init was run");

    // get the menu burger
    let burgerBtn = document.getElementById('burger');
    burgerBtn.addEventListener('click', (e)=> {
      console.log("burger was clicked!")
      e.preventDefault();

      document.getElementById('mobileNavWrapper').classList.toggle("hide");
      document.getElementById('burgerIcon').classList.toggle('hide');
      document.getElementById('crossIcon').classList.toggle('hide');
    });
    
  },


  //////////////////////////////////////////////////////////////////
  // fit all videos to container, responsively
  fitvids: function(target, cName) {

    // stolen from here: https://github.com/dollarshaveclub/reframe.js
    /*
      takes 2 args:
      => target: targeted <element>
      => cname: optional custom classname
      -------------
      defines the height/width ratio of the targeted <element>
    */
    let frames = (typeof target === 'string') ? document.querySelectorAll(target) : target;
    const c = cName || 'js-reframe';
    if (!('length' in frames)) frames = [frames]
    for (let i = 0; i < frames.length; i += 1) {
      const frame = frames[i]
      // makes sure reframe is not run more than 1x ✔️
      const hasClass = frame.className.split(' ').indexOf(c) !== -1
      if (hasClass) continue

      // get height width attributes
      const hAttr = frame.getAttribute('height')
      const wAttr = frame.getAttribute('width')
      // if has percentage width assume the iframe is responsive
      if (wAttr.indexOf('%') > -1 || frame.style.width.indexOf('%') > -1) continue
      const h = hAttr || frame.offsetHeight
      const w = wAttr || frame.offsetWidth

      // general targeted <element> sizes
      const padding = (h / w) * 100

      // created element <wrapper> of general reframed item
      // => set necessary styles of created element <wrapper>
      const div = document.createElement('div')
      div.className = c
      const divStyles = div.style
      divStyles.position = 'relative'
      divStyles.width = '100%'
      divStyles.paddingTop = `${padding}%`

      // set necessary styles of targeted <element>
      const frameStyle = frame.style
      frameStyle.position = 'absolute'
      frameStyle.width = '100%'
      frameStyle.height = '100%'
      frameStyle.left = '0'
      frameStyle.top = '0'

      // reframe targeted <element>
      frame.parentNode.insertBefore(div, frame)
      frame.parentNode.removeChild(frame)
      div.appendChild(frame)
    }
  }


}