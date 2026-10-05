"use strict";

function DynamicAdapt(type) {
    this.type = type;
}

DynamicAdapt.prototype.init = function () {
    const _this = this;
    this.objects = [];
    this.daClassname = "_dynamic_adapt_";
    this.nodes = document.querySelectorAll("[data-da]");

    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",").map(item => item.trim());

        if (dataArray.length < 3) {
            console.error("Недостаточно данных в атрибуте data-da:", node);
            continue;
        }

        let parentSelector = dataArray[0];
        let destinationSelector = dataArray[1];
        let breakpoint = dataArray[2];
        let place = dataArray.length > 3 ? dataArray[3] : "last";

        let parent = parentSelector ? node.closest(parentSelector) : null;
        let destination = parent ? parent.querySelector(destinationSelector) : document.querySelector(destinationSelector);

        if (!destination) {
            console.error("Не найден целевой элемент для:", node);
            continue;
        }

        const object = {
            element: node,
            parent: parent || document.body,
            destination: destination,
            breakpoint: breakpoint,
            place: place,
            index: this.indexInParent(node.parentNode, node),
            originalParent: node.parentNode, // сохраняем исходного родителя
            originalIndex: this.indexInParent(node.parentNode, node) // сохраняем исходную позицию
        };

        this.objects.push(object);
    }

    this.arraySort(this.objects);
    this.mediaQueries = this.objects.map(item => `(${this.type}-width: ${item.breakpoint}px),${item.breakpoint}`)
                                   .filter((item, index, self) => self.indexOf(item) === index);

    this.mediaQueries.forEach(media => {
        const mediaSplit = media.split(',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];
        const objectsFilter = this.objects.filter(item => item.breakpoint === mediaBreakpoint);
        matchMedia.addListener(() => {
            _this.mediaHandler(matchMedia, objectsFilter);
        });
        this.mediaHandler(matchMedia, objectsFilter);
    });
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, objects) {
    objects.forEach(object => {
        if (matchMedia.matches) {
            this.moveTo(object.place, object.element, object.destination);
        } else {
            this.moveBack(object.originalParent, object.element, object.originalIndex);
        }
    });
};

DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.appendChild(element);
    } else if (place === 'first') {
        destination.insertBefore(element, destination.firstChild);
    } else {
        destination.children[place].before(element);
    }
};

DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].before(element);
    } else {
        parent.appendChild(element);
    }
};

DynamicAdapt.prototype.indexInParent = function (parent, element) {
    return Array.from(parent.children).indexOf(element);
};

DynamicAdapt.prototype.arraySort = function (arr) {
    arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) return 0;
            if (a.place === "first" || b.place === "last") return -1;
            if (a.place === "last" || b.place === "first") return 1;
            return a.place - b.place;
        }
        return (this.type === "min" ? a.breakpoint - b.breakpoint : b.breakpoint - a.breakpoint);
    });
};

const da = new DynamicAdapt("max");
da.init();
