import {
  HttpClient,
  HttpClientModule,
  HttpResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToastService } from '@common/services/toast.service';
import { MessageService } from 'primeng/api';
import { catchError, tap, throwError } from 'rxjs';

describe('ToastInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [MessageService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add success toast for successful non-GET requests', () => {
    const response = new HttpResponse({ status: 200 });

    const postRequest = httpClient.post('/api/resource', {});
    jest.spyOn(toastService, 'showMessage');

    postRequest
      .pipe(tap(() => toastService.showMessage({ severity: 'success' })))
      .subscribe();

    const req = httpTestingController.expectOne('/api/resource');

    req.flush(response);

    expect(req.request.method).not.toEqual('GET');

    expect(toastService.showMessage).toHaveBeenCalled();
  });

  it('should not add success toast for GET requests', () => {
    const response = new HttpResponse({ status: 200 });
    const getRequest = httpClient.get('/api/resource');

    jest.spyOn(toastService, 'showMessage');

    getRequest.subscribe();

    const req = httpTestingController.expectOne('/api/resource');

    req.flush(response);

    expect(req.request.method).toEqual('GET');

    expect(toastService.showMessage).not.toHaveBeenCalled();
  });

  it('should add error toast for unsuccessful requests', () => {
    const response = { error: { message: 'Error message' }, status: 500 };

    const getRequest = httpClient.get('/api/error').pipe(
      catchError((error) => {
        toastService.showMessage({ severity: 'error' });
        return throwError(() => error);
      })
    );

    jest.spyOn(toastService, 'showMessage');

    getRequest.subscribe();

    const req = httpTestingController.expectOne('/api/error');

    req.flush(response, {
      status: 500,
      statusText: 'Server Error',
    });

    expect(toastService.showMessage).toHaveBeenCalled();
  });
});
