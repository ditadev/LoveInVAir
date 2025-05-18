import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import {ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from 'src/app/models/form';
import * as mailjet from 'node-mailjet';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateY(0%)',
        opacity: '1'
      })),
      state('out', style({
        transform: 'translateY(-100%)',
        opacity: '0'
      })),
      transition('in => out', animate('500ms ease-in-out')),
      transition('out => in', animate('500ms ease-in-out'))
    ])
  ]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('section') section: ElementRef | undefined;

  isCollapsed = false;
  showContactButton = false;
  showHeading = false;
  showTyping = false;
  showNav = false;
  public isVisible: boolean[] = [false, false, false];
  interval = 15; 
  private subscription: Subscription = new Subscription();
  typedMessage = '';
  slideIndex = 0;
  showScrollTop = false;
  message = "Welcome to our wedding hub! We're so happy you're here! Browse through our info section for all the essential details, follow our simple guidelines, and most importantly—come ready to celebrate and have fun with us! Made with love to make your experience awesome. #everydayisdayone #loveInVAir25"

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private elementRef: ElementRef, 
    private renderer: Renderer2, 
    private formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showContactButton = true;
    }, 5500);
    setTimeout(() => {
      this.showHeading = true;
    }, 1000);
    setTimeout(() => {
      this.showTyping = true;
    }, 1500);
    const messageLength = this.message.length;
    let i = 0;
    this.subscription = interval(this.interval).subscribe(() => {
      if (i <= messageLength) {
        this.typedMessage = this.message.slice(0, i);
        i++;
      } else {
        this.subscription.unsubscribe();
      }
    });
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'fade-in');
        }
      });
    }, { rootMargin: '0px', threshold: 0.25 });
  
    const targets = this.elementRef.nativeElement.querySelectorAll('.section');

    targets.forEach((target: Element) => {
      observer.observe(target);
    });
  }

  ngAfterViewInit(): void {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    sectionObserver.observe(this.section!.nativeElement);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  scrollTo(id: string): void {
    const element = this.document.getElementById(id)!;
    const topOffset = 55; 
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - topOffset;
    const duration = 300; 
    const startTime = performance.now();
    const easing = (t: number) => t * t;
    const animation = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const scrollTop = easeInOut(easing, timeElapsed, window.pageYOffset, elementPosition - window.pageYOffset, duration);
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    requestAnimationFrame(animation);
    const easeInOut = (easing: (t: number) => number, t: number, b: number, c: number, duration: number): number => {
      t /= duration / 2;
      if (t < 1) return (c / 2) * easing(t) + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    this.isCollapsed = !this.isCollapsed;
  }

  scrollTo2(id: string): void {
    const element = this.document.getElementById(id)!;
    const topOffset = 55; 
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - topOffset;
    const duration = 300; 
    const startTime = performance.now();
    const easing = (t: number) => t * t;
    const animation = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const scrollTop = easeInOut(easing, timeElapsed, window.pageYOffset, elementPosition - window.pageYOffset, duration);
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    requestAnimationFrame(animation);
    const easeInOut = (easing: (t: number) => number, t: number, b: number, c: number, duration: number): number => {
      t /= duration / 2;
      if (t < 1) return (c / 2) * easing(t) + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
  }

toggleMenu() {
  this.isCollapsed = !this.isCollapsed;
}

@HostListener('window:scroll', ['$event'])
checkScroll() {
  const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  this.showScrollTop = scrollPos > 0;
}
}
