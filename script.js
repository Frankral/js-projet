const observer = new IntersectionObserver((entries) =>{
  entries.forEach((entry)=>{
      if(entry.isIntersecting){
            entry.target.classList.add('show');
      } else{
      entry.target.classList.remove('show');
      }
  });
  
});

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach((el) => observer.observe(el));

  const modals = document.querySelectorAll('.modal');
  const equa2btn = document.getElementById("equa2btn");
  const equa2modal = document.getElementById("equa2mod");
  const equa3btn = document.getElementById("equa3btn");
  const equa3modal = document.getElementById("equa3mod");
  const closer = document.querySelectorAll(".close");
  


// modal equation du second degre
  equa2btn.addEventListener("click", ()=>{
    equa2modal.style.setProperty('opacity', '1');
    equa2modal.style.setProperty('z-index', '30');
    hiddenElements.forEach((elmt)=>{
        elmt.style.setProperty('filter', 'blur(3px)')
    });  
    adbox.forEach((elmt)=>{
      elmt.style.setProperty('filter', 'blur(3px)');
    });
    adclosed[0].style.setProperty('filter', 'blur(3px)');
  });

  equa2modal.addEventListener('click', (evt)=>{
    let flyoutEl = document.getElementsByClassName('modalContent'),
    targetEl = evt.target;      
  while(targetEl) {
    if(targetEl == flyoutEl[0]) {
      return;
    }
    targetEl = targetEl.parentNode;
  }
    modals.forEach((element)=>{
        element.style.setProperty('opacity', '0');
        element.style.setProperty('z-index', '0');
    }); 
  hiddenElements.forEach((elmt)=>{
    elmt.style.setProperty('filter', 'blur(0)')   
  });
  adbox.forEach((elmt)=>{
    elmt.style.setProperty('filter', 'blur(0)');
  }); 
  adclosed[0].style.setProperty('filter', 'blur(0)');
  }); 
  
  
// modal sys equation
  equa3btn.addEventListener("click", ()=>{
    equa3modal.style.setProperty('opacity', '1');
    equa3modal.style.setProperty('z-index', '30');
    hiddenElements.forEach((elmt)=>{
        elmt.style.setProperty('filter', 'blur(3px)')
    });  
    adbox.forEach((elmt)=>{
      elmt.style.setProperty('filter', 'blur(3px)');
    });
    adclosed[0].style.setProperty('filter', 'blur(3px)'); 
  });

  equa3modal.addEventListener('click', (evt)=>{
    let flyoutEl = document.getElementsByClassName('modalContent'),
    targetEl = evt.target;      
  while(targetEl) {
    if(targetEl == flyoutEl[1]) {
      return;
    }
    targetEl = targetEl.parentNode;
  }
    modals.forEach((element)=>{
        element.style.setProperty('opacity', '0');
        element.style.setProperty('z-index', '0');
    }); 
  hiddenElements.forEach((elmt)=>{
    elmt.style.setProperty('filter', 'blur(0)')   
  });
  adbox.forEach((elmt)=>{
    elmt.style.setProperty('filter', 'blur(0)');
  });
  adclosed[0].style.setProperty('filter', 'blur(0)'); 
  }); 


// closer 
  closer.forEach((el) =>{
    el.children[0].addEventListener('click', ()=>{
        modals.forEach((element)=>{
            element.style.setProperty('opacity', '0');
            element.style.setProperty('z-index', '0');
        }); 
    hiddenElements.forEach((elmt)=>{
        elmt.style.setProperty('filter', 'blur(0)')
    });
    adbox.forEach((elmt)=>{
        elmt.style.setProperty('filter', 'blur(0)');
    });
    adclosed[0].style.setProperty('filter', 'blur(0)'); 
    });
  });


