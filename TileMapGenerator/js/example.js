/**
 * @author Xavier Champoux
 * @license https://pixistudio.com/
 * @description Custom user-friendly class to help manage a slideshow.
 * @updated October 20, 2021
 */

/*jshint esversion: 8 */

/**
 * GLOBALS
 */

 const TRACK_TYPE_ID = 0x0;
 const TRACK_TYPE_CLASS = 0x1;
 
 /**
  * UTILS
  */
 
 /**
  * CLASSES
  */
 
 /**
  * @description A slide objet responsible of keeping track of HTML elements. Used with SlideshowManager.
  */
 class Slide {
     constructor(name = "slide") {
 
         // settings
         this.name = name;
 
         // tracking
         this.items = [];
 
         // custom events
         this.on_pre_hide = undefined;
         this.on_hide = undefined;
         this.on_post_hide = undefined;
         this.on_pre_show = undefined;
         this.on_show = undefined;
         this.on_post_show = undefined;
 
     }
 
     /**
      * PUBLIC
      */
 
     /**
      * 
      * TRACKING
      * 
      */
 
     /**
      * @description Adds an HTML element to track, thus trigerring the active class from this element.
      * @param {Number} track_type Type of tracking. TRACK_TYPE_ID or TRACK_TYPE_CLASS.
      * @param {String} id_or_class Id or class to look for.
      * @param {String} active_class Class to toggle when slide is active.
      */
     track(track_type = TRACK_TYPE_ID, id_or_class = "element", active_class = "active") {
 
         // add tracking item
         this.items.push({
             track_type: track_type,
             id_or_class: id_or_class,
             active_class: active_class,
         });
 
     }
 
     /**
      * PRIVATE
      */
 
     /**
      * 
      * ACTIONS
      * 
      */
 
     /**
      * @private
      * @description Called before hiding the slide.
      * @param {Function} callback Function to execute when this event is done.
      */
     _pre_hide(callback = function () {}) {
 
         // user on pre hide event
         if (typeof this.on_pre_hide === 'function') {
             this.on_pre_hide(callback);
         } else {
             callback();
         }
 
     }
 
     /**
      * @private
      * @description Called when hiding the slide.
      * @param {Function} callback Function to execute when this event is done.
      */
     _hide(callback = function () {}) {
 
         // make sure array isn't empty
         if (this.items.length !== 0) {
 
             this.items.forEach(e => {
 
                 // tracking type id
                 if (e.track_type == TRACK_TYPE_ID) {
 
                     // get element
                     var element = document.getElementById(e.id_or_class);
 
                     // remove active class
                     if (element.classList.contains(e.active_class)) element.classList.remove(e.active_class);
 
                 }
 
                 // tracking type class
                 else if (e.track_type == TRACK_TYPE_CLASS) {
 
                     // get elements
                     var elements = document.getElementsByClassName(e.id_or_class);
 
                     // remove active class to each
                     for (let i = 0; i < elements.length; i++) {
                         const x = elements[i];
                         if (x.classList.contains(e.active_class)) x.classList.remove(e.active_class);
                     }
 
                 }
 
             });
 
         }
 
         // user on hide event
         if (typeof this.on_hide === 'function') {
             this.on_hide(callback);
         } else {
             callback();
         }
 
     }
 
     /**
      * @private
      * @description Called after hiding the slide.
      * @param {Function} callback Function to execute when this event is done.
      */
     _post_hide(callback = function () {}) {
 
         // user on post hide event
         if (typeof this.on_post_hide === 'function') {
             this.on_post_hide(callback);
         } else {
             callback();
         }
 
     }
 
     /**
      * @private
      * @description Called before showing the slide.
      * @param {Function} callback Function to execute when this event is done.
      */
     _pre_show(callback = function () {}) {
 
         // user on pre show event
         if (typeof this.on_pre_show === 'function') {
             this.on_pre_show(callback);
         } else {
             callback();
         }
 
     }
 
     /**
      * @private
      * @description Called when showing the slide.
      * @param {Function} callback Function to execute when this event is done.
      */
     _show(callback = function () {}) {
 
         // make sure array isn't empty
         if (this.items.length !== 0) {
 
             this.items.forEach(e => {
 
                 // tracking type id
                 if (e.track_type == TRACK_TYPE_ID) {
 
                     // get element
                     var element = document.getElementById(e.id_or_class);
 
                     // add active class
                     if (!element.classList.contains(e.active_class)) element.classList.add(e.active_class);
 
                 }
 
                 // tracking type class
                 else if (e.track_type == TRACK_TYPE_CLASS) {
 
                     // get elements
                     var elements = document.getElementsByClassName(e.id_or_class);
 
                     // add active class to each
                     for (let i = 0; i < elements.length; i++) {
                         const x = elements[i];
                         if (!x.classList.contains(e.active_class)) x.classList.add(e.active_class);
                     }
 
                 }
 
             });
 
         }
 
         // user on show event
         if (typeof this.on_show === 'function') {
             this.on_show(callback);
         } else {
             callback();
         }
 
     }
 
     /**
      * @private
      * @description Called after showing the slide.
      * @param {Function} callback Function to execute when this event is done.
      */
     _post_show(callback = function () {}) {
 
         // user on post show event
         if (typeof this.on_post_show === 'function') {
             this.on_post_show(callback);
         } else {
             callback();
         }
 
     }
 
 
 }
 
 /**
  * @description A manager class for slideshow type configurator.
  */
 class SlideshowManager extends Base {
     constructor({
         starting_index = 0,
         can_loop = false,
         debugging = DEBUGGING_ALL,
     }) {
 
         // call super constructor
         super({
             debugging: debugging,
         });
 
         // slide
         this.current_slide = starting_index;
         this.slides = [];
 
         // states
         this.is_changing_slide = false;
 
         // settings
         this.can_loop = can_loop;
 
     }
 
     /**
      * PUBLIC
      */
 
     /**
      * @description Initializes the slideshow components.
      */
     init() {
 
         // go to stating slide
         this._goToSlide(this.current_slide);
 
     }
 
     /**
      * 
      * SLIDES
      * 
      */
 
     /**
      * @description Adds a new slide object to the slideshow.
      * @param {Slide} slide Slide object to add. 
      */
     addSlide(slide = new Slide("slide")) {
 
         // make sure slides is not already registered
         if (!this.slides.includes(slide)) {
 
             // add slide
             this.slides.push({
                 name: slide.name,
                 slide: slide,
             });
 
             // ouput result
             this._log(LOG_TYPE_DISPLAY, "Slide registered to slideshow :", slide.name);
 
         } else {
 
             // ouput result
             this._log(LOG_TYPE_ERROR, "Slide is already registered in slideshow :", slide.name);
 
         }
 
     }
 
     /**
      * @description Get a slide object with corresponding name.
      * @param {String} slide_name Name of the slide to look for.
      * @return {Slide} A slide object or undefined.
      */
     getSlide(slide_name = "slide") {
         return this.slides.find(e => e.name === slide_name);
     }
 
     /**
      * 
      * CONTROLS
      * 
      */
 
     /**
      * @description Switches to the next slide. If it's the last slide and looping is enabled, will loop to the start.
      */
     nextSlide() {
 
         // only if not already changing slide
         // this way it won't be call multiple times
         if (!this.is_changing_slide) {
             var next_slide = this.current_slide + 1;
 
             // check if next slide available
             if (next_slide <= this.slides.length - 1) {
                 this._goToSlide(next_slide);
             } else {
 
                 // can loop ?
                 if (this.can_loop) {
                     next_slide = 0;
                     this._goToSlide(next_slide);
                 }
 
             }
         } else {
 
             // output result
             this._log(LOG_TYPE_DISPLAY, "Slideshow is already changing slide !");
 
         }
 
     }
 
     /**
      * @description Switches to the previous slide. If it's the first slide and looping is enabled, will loop to the end.
      */
     previousSlide() {
 
         // only if not already changing slide
         // this way it won't be call multiple times
         if (!this.is_changing_slide) {
             var previous_slide = this.current_slide - 1;
 
             // check if previous slide available
             if (previous_slide >= 0) {
                 this._goToSlide(previous_slide);
             } else {
 
                 // can loop ?
                 if (this.can_loop) {
                     previous_slide = this.slides.length - 1;
                     this._goToSlide(previous_slide);
                 }
 
             }
         } else {
 
             // output result
             this._log(LOG_TYPE_DISPLAY, "Slideshow is already changing slide !");
 
         }
 
     }
 
     /**
      * @description Switches directly to the specific slide.
      * @param {String} slide_name Name of the slide to go to.
      */
     goToSlide(slide_name = "slide") {
 
         // only if not already changing slide
         // this way it won't be call multiple times
         if (!this.is_changing_slide) {
 
             // find slide index
             var slide_index = this.slides.findIndex(e => e.name == slide_name);
             if (slide_index !== -1) {
 
                 // can't go to current slide
                 if (slide_index !== this.current_slide) {
                     this._goToSlide(slide_index);
                 } else {
 
                     // output result
                     this._log(LOG_TYPE_WARNING, "Tried changing slide to current slide ! ");
 
                 }
 
 
             } else {
 
                 // output result
                 this._log(LOG_TYPE_ERROR, "Can't find slide with name : ", slide_name);
 
             }
 
         } else {
 
             // output result
             this._log(LOG_TYPE_DISPLAY, "Slideshow is already changing slide !");
 
         }
 
     }
 
     /**
      * PRIVATE
      */
 
     /**
      * 
      * CONTROLS
      * 
      */
 
     /**
      * @private
      * @description Switches to the slide with corresponding index.
      * @param {Number} slide_index Index of the slide to go to.
      */
     _goToSlide(slide_index) {
 
         // set state
         this.is_changing_slide = true;
         console.log('changing slide', this.is_changing_slide);
 
         // get slides
         var last_slide = this.slides[this.current_slide].slide;
         var next_slide = this.slides[slide_index].slide;
 
         // pre hide
         last_slide._pre_hide(() => {
             // hide
             last_slide._hide(() => {
                 // post hide
                 last_slide._post_hide(() => {
                     // pre show
                     next_slide._pre_show(() => {
                         // show
                         next_slide._show(() => {
                             // post show
                             next_slide._post_show(() => {
 
                                 // update current slide
                                 this.current_slide = slide_index;
 
                                 // set state
                                 console.log('finish changing slide');
                                 this.is_changing_slide = false;
                                 console.log('changing slide', this.is_changing_slide);
 
                             });
                         });
                     });
                 });
             });
         });
 
     }
 
 }