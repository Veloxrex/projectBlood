var AdContents = window.AdContents = {};

// var create = AdContents.create = function(adType, adContents) {
//     var element;
//     var child;

//     switch (adType) {
//         case 'html':
//             element = document.createElement('div');
//             element.style.width = '100%';
//             element.style.height = '100%';
//             element.style.overflow = 'hidden';
//             element.innerHTML = adContents;
//             break;
//         case 'image':
//             element = document.createElement('div');
//             element.style.width = '100%';
//             element.style.height = '100%';
//             element.style.backgroundImage = 'url("' + adContents + '")';
//             element.style.backgroundSize = 'cover';
//             element.style.backgroundPosition = '50%';
//             element.style.overflow = 'hidden';
//             break;
//         case 'web':
//             element = document.createElement('iframe');
//             element.src = adContents;
//             element.allow = 'autoplay; encrypted-media';
//             element.style.width = '100%';
//             element.style.height = '100%';
//             element.style.border = 'none';
//             element.style.overflow = 'hidden';
//             break;
//         case 'slide':
//             element = document.createElement('div');
//             element.style.width = '100%';
//             element.style.height = '100%';
//             element.style.border = 'none';
//             element.style.overflow = 'hidden';

//             var children = [];
//             for (var i = 0; i < adContents.length; i++) {
//                 child = document.createElement('img');
//                 child.src = adContents[i];
//                 child.style.width = '100%';
//                 child.style.height = '100%';
//                 if (i > 0) {
//                     child.style.display = 'none';
//                 }
//                 children.push(child);
//                 element.appendChild(child);

//                 child.onclick = function(evt) {
//                     var targetChild = evt.target;
//                     var index = children.indexOf(targetChild);
//                     var nextIndex = (index + 1) % children.length;

//                     for(var i = 0; i < children.length; i++) {
//                         if (i === nextIndex) {
//                             children[i].style.display = 'block';
//                         } else {
//                             children[i].style.display = 'none';
//                         }
//                     }
//                 };
//             }

//             break;
//         case 'text':
//         default:
//             element = document.createElement('div');
//             element.style.display = 'table';
//             element.style.position = 'relative';
//             element.style.tableLayout = 'fixed';
//             element.style.width = '100%';
//             element.style.height = '100%';

//             child = document.createElement('div');
//             child.style.display = 'table-cell';
//             child.style.textAlign = 'center';
//             child.style.verticalAlign = 'middle';
//             child.innerText = adContents;

//             element.appendChild(child);
//     }

//     return element;
// };

export default AdContents;