import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { TabService } from './services/tab.service';
import { StatusService } from './shared/status.service';
import { ActiveTabEnum } from './Model/enum';

describe('AppComponent', () => {
  let tabService: TabService;
  let statusService: StatusService;
  
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents(); 

    tabService = TestBed.inject(TabService);
    statusService = TestBed.inject(StatusService);
  });

  

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('services should be created', () => {
    expect(tabService).toBeTruthy();

    expect(statusService).toBeTruthy();
  });

  it(`should have as tab name 'Menu'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.tabName).toEqual('Menu');
  });
  
  
});
