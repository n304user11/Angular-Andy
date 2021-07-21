import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../material-module';

import { MemberSearchComponent } from './member-search.component';

describe('MemberSearchComponent', () => {
  let originalTimeout: number;
  let component: MemberSearchComponent;
  let fixture: ComponentFixture<MemberSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [MemberSearchComponent]
    })
      .compileComponents();

      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
  
    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test form group element count', () => {
    const formEl = fixture.debugElement.nativeElement.querySelector('#memberSearchForm');
    const inputEls = formEl.querySelectorAll('input');
    expect(inputEls.length).toEqual(3);
  });

  it('Test initial value from form group', () => {
    const memberSearchForm = component.memberSearchForm;
    const expectData = {
      serviceDate: '',
      policyNumber: '',
      memberCardNumber: ''
    }
    expect(memberSearchForm.value).toEqual(expectData);
  });

  it('Test policy number input validation required', () => {
    const formEl = fixture.debugElement.nativeElement.querySelector('#memberSearchForm');
    const policyNumberInput: HTMLInputElement = formEl.querySelectorAll('input')[1];
    const policyNumberFormControl = component.memberSearchForm.get('policyNumber');

    expect(policyNumberInput.value).toEqual(policyNumberFormControl?.value);
    expect(policyNumberFormControl?.errors).not.toBeNull();
    expect(policyNumberFormControl?.errors?.required).toBeTruthy();
  });

  it('Test policy number input validation number', () => {
    const formEl = fixture.debugElement.nativeElement.querySelector('#memberSearchForm');
    const policyNumberInput: HTMLInputElement = formEl.querySelectorAll('input')[1];
    const policyNumberFormControl = component.memberSearchForm.get('policyNumber');

    policyNumberInput.value = '456';
    policyNumberInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(policyNumberInput.value).toEqual(policyNumberFormControl?.value);
      expect(policyNumberFormControl?.errors).toBeNull();

      policyNumberInput.value = 'abc456';
      policyNumberInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(policyNumberInput.value).toEqual(policyNumberFormControl?.value);
        expect(policyNumberFormControl?.errors).not.toBeNull();
        expect(policyNumberFormControl?.errors?.pattern).toBeTruthy();
      })
    })
  });
});
