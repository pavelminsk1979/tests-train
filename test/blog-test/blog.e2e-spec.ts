/*import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { applyAppSettings } from '../../src/settings/apply-app-settings';
import { BlogQueryRepository } from '../../src/feature/blogs/repositories/blog-query-repository';
import { blogQueryRepositoryMock } from '../mock/blog-query-repository-mock';
import { BlogManagerForTest } from '../utils/blog-manager-for-test';

describe('tests for andpoint blogs', () => {
  /!* переменная app, которая будет представлять
  экземпляр приложения Nest.js*!/
  let app;

  beforeAll(async () => {
    //Создается экземпляр moduleFixture
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      /!*  //ЗАМОКАЛ-ОТКЛЮЧИЛ ЦЕЛИКОМ РЕПОЗИТОРИЙ
        .overrideProvider(BlogQueryRepository)
        //вместо замоканого подставил фейковый обьект
        .useValue(blogQueryRepositoryMock)*!/
      .compile();

    //Создается экземпляр приложения
    app = moduleFixture.createNestApplication();

    applyAppSettings(app);
    /!* Вызывается метод app.init(), который запускает 
    инициализацию приложения. Это включает в себя 
    инициализацию всех модулей, провайдеров, 
    контроллеров и других компонентов, необходимых
     для работы приложения:*!/
    await app.init();

    //ЭТО ДЛЯ ОЧИСТКИ БАЗЫ ДАННЫХ
    //await request(app.getHttpServer()).delete('/testing/all-data');
  });

  afterAll(async () => {
    await app.close();
  });

  /!* it('get blogs', async () => {
     const res = await request(app.getHttpServer()).get('/blogs').expect(200);

     expect(res.body).toEqual({
       pagesCount: 0,
       page: 1,
       pageSize: 10,
       totalCount: 0,
       items: [],
     });
   });*!/

  /!*  const nameBlog = 'name11111';
    it('should create blog', async () => {
      const res = await request(app.getHttpServer())
        .post('/blogs')
        .send({
          name: nameBlog,
          description: 'description1111',
          websiteUrl: 'https://www.outue1.com/',
        })
        .expect(201);
  
      expect(res.body.name).toEqual(nameBlog);
    });*!/

  /////////////////////////////////////////////

  /!*  СОЗДАТЬ СУЩНОСТЬ ---В ОТДЕЛЬНОМ ФАЙЛЕ   КЛАСС 
   И СЮДА ВОЗВРАЩАЮТСЯ СУЩНОСТИ, И ЕСЛИ СУЩНОСТЕЙ
    НАДО СОЗДАТЬ МНОГО ТО ЧИТАТЬСЯ КОД БУДЕТ ЛУЧШЕ
     
     в файле  test/utils/blog-manager-for-test.ts*!/

  const blogManagerForTest = new BlogManagerForTest(app);

  const blog = blogManagerForTest.createUser(
    'name11111',
    'description1111',
    'https://www.outue1.com/',
  );

  it('get blogs', async () => {
    const res = await request(app.getHttpServer()).get('/blogs').expect(200);
    console.log(res.body);
  });
});*/
//////////////////////////////////////////////
///////////////////////////////////////////

///////////////////////////////////////////////////
//ТУТ ДЛЯ СОЗДАНИЯ СУЩНОСТИ  ИСПОЛЬЗУЮ КЛАСС
///////////////////////////////////////////////
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { applyAppSettings } from '../../src/settings/apply-app-settings';
import { BlogManagerForTest } from '../utils/blog-manager-for-test';

describe('tests for andpoint blogs', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })

      .compile();

    app = moduleFixture.createNestApplication();

    applyAppSettings(app);

    await app.init();

    await request(app.getHttpServer()).delete('/testing/all-data');

    const blogManagerForTest = new BlogManagerForTest(app);

    const blog = await blogManagerForTest.createUser(
      'name1',
      'description1',
      'https://www.outue1.com/',
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('get blogs', async () => {
    const blogManagerForTest2 = new BlogManagerForTest(app);

    const blog4 = await blogManagerForTest2.createUser(
      'name14',
      'description1',
      'https://www.outue1.com/',
    );

    const res = await request(app.getHttpServer()).get('/blogs').expect(200);
    console.log(res.body);
  });
});
