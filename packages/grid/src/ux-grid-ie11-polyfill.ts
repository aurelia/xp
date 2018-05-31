let w: any = (window as any);
let d: any = (document as any);
// IE detection from: https://stackoverflow.com/questions/21825157/internet-explorer-11-detection
let isIE11 = !!w.MSInputMethodContext && !!d.documentMode;

if (isIE11) {
  window.addEventListener('resize', () => {
    fixUxGrids(true);
  });
}

// DOM observer from: https://stackoverflow.com/a/14570614/437725
let observeDOM = (function(){
  const MutationObserver = w.MutationObserver || w.WebKitMutationObserver;
  const eventListenerSupported = window.addEventListener;

  return function(obj: any, callback: () => void){
      if ( MutationObserver ) {
        // define a new observer
        const obs = new MutationObserver(function(mutations: any){
          if ( mutations[0].addedNodes.length || mutations[0].removedNodes.length ) {
            callback();
          }
        });
        // have the observer observe foo for changes in children
        obs.observe( obj, { childList: true, subtree: true });
      } else if ( eventListenerSupported ) {
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
      }
  };
})();

// Observe a specific DOM element:
observeDOM( document, function() {
  fixUxGrids();
});

function fixUxGrids(force: boolean = false) {
  const grids = document.getElementsByTagName('ux-grid');
  for (let index = 0; index < grids.length; index++) {
    const grid = (grids[index] as HTMLElement);
    if (grid !== null && grid.classList) {
      if (!force && grid.classList.contains('grid-ie-fixed')) {
        continue;
      }
      fixUxGrid(grid);
      grid.classList.add('grid-ie-fixed');
    }
  }
}

function fixUxGrid(grid: HTMLElement) {
  if (!grid.style) {
    return;
  }
  grid.style['display'] = '-ms-grid';
  const gap = '16px';
  // It would be nice here to be able to determine the gap defined
  // by the ux-grid component, but it's difficult because the value
  // of (grid as any).currentStyle['grid-gap'] returns the CSS
  // variable string and not the computed value
  const columns = ['12fr', '12fr', '12fr', '12fr', '12fr', '12fr', '12fr', '12fr', '12fr', '12fr', '12fr', '12fr'];
  const gridStyle: any = grid.style;
  gridStyle['-ms-grid-columns'] = columns.join(` ${gap} `);
  let rows = ['auto'];
  gridStyle['-ms-grid-rows'] = rows.join(` ${gap} `);

  let count = 1;
  let row = 1;
  const cells = grid.getElementsByTagName('ux-grid-cell');
  for (let index = 0; index < cells.length; index++) {
    const cell = (cells[index] as HTMLElement);
    if (!cell) {
      continue;
    }
    const style = (cell as any).currentStyle;
    if (!style) {
      continue;
    }
    const gridColumnStyle = style['grid-column'];
    const originalNbColumns = parseInt(gridColumnStyle.replace('span ', ''), 10);
    const ieNbColumns = originalNbColumns + (originalNbColumns - 1);
    if (count + ieNbColumns > 24) {
      rows.push('auto');
      gridStyle['-ms-grid-rows'] = rows.join(` ${gap} `);
      row += 2;
      count = 1;
    }
    const cellStyle: any = cell.style;
    cellStyle['-ms-grid-row'] = row;
    cellStyle['-ms-grid-column'] = count;
    cellStyle['-ms-grid-column-span'] = ieNbColumns;
    count = count + ieNbColumns + 1;
  }
}
