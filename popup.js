// document.getElementById('copyUrls').addEventListener('click', async () => {
//     try {
//       const queryOptions = { highlighted: true, currentWindow: true };
//       const tabs = await chrome.tabs.query(queryOptions);
//       const tabUrls = tabs.map(tab => tab.url).join('\n');
//       await navigator.clipboard.writeText(tabUrls);
//       scanAnimation();
//     } catch (err) {
//       console.error('Failed to copy URLs: ', err);
//     }
// })

// function scanAnimation() {
//   const scanBar = document.getElementById('bar');
//   scanBar.style.display = 'block';
//   setTimeout(() => {
//     scanBar.style.animation = 'scanAnimation .5s linear';
//   }, 10);

//   scanBar.addEventListener('animationend', () => {
//     scanBar.style.display = 'none';
//     scanBar.style.animation = '';
//   });
// }

document.addEventListener('DOMContentLoaded', function() {
  const selectElement = document.getElementById('divider-select');
  console.log("domContent loaded")

  // Retrieve the stored divider value from chrome.storage.local
  chrome.storage.local.get('divider', function(data) {
    if (chrome.runtime.lastError) {
      console.error('Error retrieving divider:', chrome.runtime.lastError);
    } else {
      const storedDivider = data.divider;
      console.log("Stored divider:", storedDivider);

      if (selectElement && storedDivider !== undefined) {
        const matchingOption = Array
          .from(selectElement.options)
          .find(option => option.value == storedDivider)
        if (matchingOption) {
          matchingOption.selected = true;
        }
      }
    }
  });

  if (selectElement) {
    selectElement.addEventListener('change', function() {
      const selectedOption = selectElement.value;
      console.log("divider selected", selectedOption);
      chrome.runtime.sendMessage({ action: 'dividerSelected', divider: selectedOption });
    });
  }
});






// const randomSlideToggle = document.getElementById("random-slide-toggle-control");

/*
// object that will be passed to the constructor of SvgToggleEffect
  const randomSlide = {
    element: randomSlideToggle,
    handler: svgSlideEffect,
    offset: 8,
    duration: 150,
    random: true,
  };
  
new SvgToggleEffect(randomSlide);

// class that defines a type of effect
class SvgToggleEffect {
  constructor(effect) {

    // in the example above, this gets the next sibling of the elemtn 'randomslidetoggle', 
    // then selects all items with the class 'row'
    // it gets the next element after the effect.element, then querySelectorAll gets all items with ".row"
    this.nodes = [
      ...effect.element.nextElementSibling.querySelectorAll(".row")
    ];

    // it then assigns each nodes
    this.nodes.forEach((node, index) => {
      this.nodes[index] = SVG(node);
    });

    // run randomize array
    if (effect.random) {
      this.randomizeArray(this.nodes);
    }


    // gives the element an eventlistener passing it the items from the constructor
    // and the true/false determines if it's reversing or not
    effect.element.addEventListener("change", () => {
      if (effect.element.checked) {
        effect.handler(this.nodes, false, effect.duration, effect.offset);
      } else {
        effect.handler(this.nodes, true, effect.duration, effect.offset);
      }
    });
  }

  // randomly swaps the position of items within the this.nodes array passed to it 
  // uses the Fischer-Yates/Knuth method
  // 1. Counts from last element to first
  // 2. Iterates through, each time generating a random index between 0 and the index
  // 3. Swaps the element at index i with the element at index J

  randomizeArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
}


const svgSlideEffect = (nodes = [], reverse = false, duration = 100, offset = 10) => {
  nodes.forEach((node, index) => {
    setTimeout(() => {
      if (reverse) {
        node.animate({ duration: duration }).transform({ translate: 0 });
      } else {
        node.animate({ duration: duration }).transform({ translate: 48 });
      }
    }, index * offset);
  });
};
*/