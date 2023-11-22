import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignUpService } from './sign-up.service';
import { User } from '../models/user';

describe('SignUpService', () => {
    let signUpService: SignUpService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SignUpService],
        });

        signUpService = TestBed.inject(SignUpService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(signUpService).toBeTruthy();
    });

    describe('signUp', () => {
        it('should send a POST request to the server', () => {
            // given
            const user: User = { firstName: 'testUser', lastName: 'lastName', email: 'test@example.com', password: 'testPassword' };

            // when
            signUpService.signUp(user).subscribe();

            // then
            const req = httpTestingController.expectOne({ url: signUpService.url, method: 'POST' });
            expect(req.request.body).toEqual(user);
            req.flush([]);
        });

        it('should return an Observable<User[]>', () => {
            // given
            const user: User = { firstName: 'testUser', lastName: 'lastName', email: 'test@example.com', password: 'testPassword' };

            // when
            signUpService.signUp(user).subscribe((response) => {
                expect(response).toEqual([]);
            });

            // then
            const req = httpTestingController.expectOne({ url: signUpService.url, method: 'POST' });
            req.flush([]);
        });
    });
});
